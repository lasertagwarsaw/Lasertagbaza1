const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { hasKvStorage, readJson } = require("./_kv-storage");

const voiceStorageKey = "baza:voice-room:v1";
const voicePath = path.join(__dirname, "..", "data", "voice-room.json");

const cleanText = (value, maxLength = 90) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeName = (value) => cleanText(value, 40).toLowerCase();

const readLocalVoiceState = () => {
  try {
    return JSON.parse(fs.readFileSync(voicePath, "utf8"));
  } catch {
    return { rooms: [] };
  }
};

const readVoiceState = async () => {
  const fallback = readLocalVoiceState();
  if (!hasKvStorage()) return fallback;
  try {
    return await readJson(voiceStorageKey, fallback);
  } catch {
    return fallback;
  }
};

const base64Url = (value) => Buffer.from(value).toString("base64url");

const createJoinToken = ({ apiKey, apiSecret, roomId, player }) => {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(
    JSON.stringify({
      iss: apiKey,
      sub: normalizeName(player),
      name: player,
      nbf: now - 5,
      exp: now + 15 * 60,
      video: {
        room: roomId,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
        canPublishData: false,
        canPublishSources: ["microphone"],
      },
      metadata: JSON.stringify({ app: "baza-club", player }),
    }),
  );
  const unsigned = `${header}.${payload}`;
  const signature = crypto.createHmac("sha256", apiSecret).update(unsigned).digest("base64url");
  return `${unsigned}.${signature}`;
};

const setHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "https://www.lasertagbaza.pl");
  response.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Cache-Control", "no-store, private");
};

module.exports = async function handler(request, response) {
  setHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  const liveKitUrl = cleanText(process.env.LIVEKIT_URL, 240);
  const apiKey = cleanText(process.env.LIVEKIT_API_KEY, 160);
  const apiSecret = String(process.env.LIVEKIT_API_SECRET || "").trim();
  if (!liveKitUrl || !apiKey || !apiSecret) {
    response.status(503).json({ ok: false, error: "Voice service is not configured" });
    return;
  }

  const roomId = cleanText(request.body?.roomId, 90);
  const player = cleanText(request.body?.player, 40);
  if (!roomId || !player) {
    response.status(400).json({ ok: false, error: "Room and player are required" });
    return;
  }

  const state = await readVoiceState();
  const room = (Array.isArray(state?.rooms) ? state.rooms : []).find((item) => cleanText(item?.id, 90) === roomId);
  const participant = room?.participants?.some((item) => normalizeName(item?.name) === normalizeName(player));
  if (!room || !participant) {
    response.status(403).json({ ok: false, error: "Player is not a member of this room" });
    return;
  }

  response.status(200).json({
    ok: true,
    serverUrl: liveKitUrl,
    token: createJoinToken({ apiKey, apiSecret, roomId, player }),
    expiresIn: 900,
  });
};
