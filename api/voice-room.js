const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const voicePath = path.join(dataDir, "voice-room.json");
const voiceStorageKey = "baza:voice-room:v1";
const AUDIO_CHUNK_LIMIT = 48;
const MAX_AUDIO_CHUNK_SIZE = 120_000;

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const cleanText = (value, maxLength = 80) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeName = (value) => cleanText(value, 40).toLowerCase();

const makeId = (prefix) =>
  crypto.randomUUID ? crypto.randomUUID() : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const base64Url = (value) => Buffer.from(value).toString("base64url");

const createLiveKitJoinToken = ({ apiKey, apiSecret, roomId, player }) => {
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

const emptyState = () => ({
  schemaVersion: 1,
  rooms: [],
  signals: [],
  audioChunks: [],
  clients: {},
  updatedAt: new Date().toISOString(),
});

const normalizeRoom = (room) => {
  const owner = cleanText(room?.owner, 40);
  const participants = new Map();
  (Array.isArray(room?.participants) ? room.participants : []).slice(0, 6).forEach((participant) => {
    const name = cleanText(participant?.name, 40);
    if (!name) return;
    participants.set(normalizeName(name), {
      name,
      micEnabled: Boolean(participant?.micEnabled),
      joinedAt: participant?.joinedAt || new Date().toISOString(),
    });
  });
  if (owner && !participants.has(normalizeName(owner))) {
    participants.set(normalizeName(owner), { name: owner, micEnabled: false, joinedAt: new Date().toISOString() });
  }

  const participantNames = new Set(participants.keys());
  const invitations = new Map();
  (Array.isArray(room?.invitations) ? room.invitations : []).slice(0, 5).forEach((invite) => {
    const name = cleanText(invite?.name, 40);
    const key = normalizeName(name);
    if (!name || participantNames.has(key)) return;
    invitations.set(key, {
      name,
      status: "pending",
      createdAt: invite?.createdAt || new Date().toISOString(),
    });
  });

  return {
    id: cleanText(room?.id, 90) || makeId("voice"),
    name: cleanText(room?.name, 40) || "BAZA Voice",
    owner,
    participants: [...participants.values()].slice(0, 6),
    invitations: [...invitations.values()].slice(0, Math.max(0, 6 - participants.size)),
    createdAt: room?.createdAt || new Date().toISOString(),
  };
};

const normalizeState = (state) => ({
  ...emptyState(),
  ...(state && typeof state === "object" ? state : {}),
  rooms: Array.isArray(state?.rooms) ? state.rooms.map(normalizeRoom).filter((room) => room.owner) : [],
  signals: Array.isArray(state?.signals) ? state.signals.slice(-240) : [],
  audioChunks: Array.isArray(state?.audioChunks) ? state.audioChunks.slice(-AUDIO_CHUNK_LIMIT) : [],
  clients: state?.clients && typeof state.clients === "object" ? state.clients : {},
  updatedAt: new Date().toISOString(),
});

const readLocalState = () => {
  try {
    return normalizeState(JSON.parse(fs.readFileSync(voicePath, "utf8")));
  } catch {
    return emptyState();
  }
};

const writeLocalState = (state) => {
  ensureDataDir();
  fs.writeFileSync(voicePath, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
};

const readVoiceState = async () => {
  const fallback = readLocalState();
  if (!hasKvStorage()) return fallback;
  try {
    return normalizeState(await readJson(voiceStorageKey, fallback));
  } catch {
    return fallback;
  }
};

const writeVoiceState = async (state) => {
  const normalized = normalizeState(state);
  if (hasKvStorage()) {
    await writeJson(voiceStorageKey, normalized);
    return normalized;
  }
  writeLocalState(normalized);
  return normalized;
};

const markClient = (state, player) => {
  const name = cleanText(player, 40);
  if (!name) return;
  state.clients[normalizeName(name)] = {
    name,
    seenAt: new Date().toISOString(),
  };
};

const removeStaleClients = (state) => {
  const cutoff = Date.now() - 25_000;
  Object.entries(state.clients || {}).forEach(([key, client]) => {
    if (new Date(client?.seenAt || 0).getTime() < cutoff) delete state.clients[key];
  });
};

const roomsWithOnlineState = (state) => {
  removeStaleClients(state);
  const online = new Set(Object.keys(state.clients || {}));
  return (state.rooms || []).map((room) => ({
    ...room,
    participants: (room.participants || []).map((participant) => ({
      ...participant,
      online: online.has(normalizeName(participant.name)),
    })),
  }));
};

const mergeRoom = (state, inputRoom) => {
  const room = normalizeRoom(inputRoom);
  if (!room.owner) return;
  const owner = normalizeName(room.owner);
  const participantNames = new Set((room.participants || []).map((participant) => normalizeName(participant.name)));
  state.rooms = (state.rooms || [])
    .filter((item) => item.id !== room.id && normalizeName(item.owner) !== owner)
    .filter((item) => !participantNames.has(normalizeName(item.owner)))
    .map((item) => ({
      ...item,
      participants: (item.participants || []).filter((participant) => !participantNames.has(normalizeName(participant.name))),
    }));
  state.rooms.unshift(room);
};

const deleteRoom = (state, roomId, player) => {
  const id = cleanText(roomId, 90);
  const name = normalizeName(player);
  state.rooms = (state.rooms || []).filter((room) => room.id !== id || normalizeName(room.owner) !== name);
};

const leaveRoom = (state, roomId, player) => {
  const id = cleanText(roomId, 90);
  const name = normalizeName(player);
  state.rooms = (state.rooms || []).filter((room) => {
    if (room.id !== id) return true;
    if (normalizeName(room.owner) === name) return false;
    room.participants = (room.participants || []).filter((participant) => normalizeName(participant.name) !== name);
    return true;
  });
};

const declineInvite = (state, roomId, player) => {
  const id = cleanText(roomId, 90);
  const name = normalizeName(player);
  const room = (state.rooms || []).find((item) => item.id === id);
  if (!room || !name) return;
  room.invitations = (room.invitations || []).filter((invite) => normalizeName(invite.name) !== name);
};

const updateMic = (state, roomId, player, micEnabled) => {
  const room = (state.rooms || []).find((item) => item.id === cleanText(roomId, 90));
  const participant = room?.participants?.find((item) => normalizeName(item.name) === normalizeName(player));
  if (participant) participant.micEnabled = Boolean(micEnabled);
};

const addSignal = (state, message) => {
  const source = cleanText(message.source, 40);
  const target = cleanText(message.target, 40);
  if (!source || !target || !message.signal) return;
  state.signals = [
    ...(state.signals || []),
    {
      id: makeId("signal"),
      roomId: cleanText(message.roomId, 90),
      source,
      target,
      signal: message.signal,
      createdAt: new Date().toISOString(),
    },
  ].slice(-240);
};

const addAudioChunk = (state, message) => {
  const roomId = cleanText(message.roomId, 90);
  const source = cleanText(message.source, 40);
  const mimeType = cleanText(message.mimeType, 80) || "audio/mp4";
  const data = cleanText(message.data, MAX_AUDIO_CHUNK_SIZE);
  if (!roomId || !source || !data) return;
  state.audioChunks = [
    ...(state.audioChunks || []),
    {
      id: makeId("audio"),
      roomId,
      source,
      mimeType,
      data,
      createdAt: new Date().toISOString(),
    },
  ].slice(-AUDIO_CHUNK_LIMIT);
};

const participantRoomIds = (state, player) => {
  if (!player) return new Set();
  return new Set(
    (state.rooms || [])
      .filter((room) => (room.participants || []).some((participant) => normalizeName(participant.name) === player))
      .map((room) => room.id),
  );
};

const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "86400");
};

module.exports = async function handler(request, response) {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  const state = await readVoiceState();
  const query = request.query || {};
  const body = request.body || {};

  if (request.method === "GET") {
    markClient(state, query.player);
    const player = normalizeName(query.player);
    const after = cleanText(query.after, 90);
    const afterAudio = cleanText(query.afterAudio, 90);
    const signals = (state.signals || []).filter((signal) => {
      if (player && normalizeName(signal.target) !== player) return false;
      if (!after) return true;
      return new Date(signal.createdAt).getTime() > new Date(after).getTime();
    });
    const roomIds = participantRoomIds(state, player);
    const audioChunks = (state.audioChunks || []).filter((chunk) => {
      if (!roomIds.has(chunk.roomId)) return false;
      if (normalizeName(chunk.source) === player) return false;
      if (!afterAudio) return true;
      return new Date(chunk.createdAt).getTime() > new Date(afterAudio).getTime();
    });
    response.status(200).json({
      ok: true,
      rooms: roomsWithOnlineState(state),
      signals,
      audioChunks,
      serverTime: new Date().toISOString(),
    });
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (body.type === "livekit-token") {
    response.setHeader("Cache-Control", "no-store, private");
    const liveKitUrl = cleanText(process.env.LIVEKIT_URL, 240);
    const apiKey = cleanText(process.env.LIVEKIT_API_KEY, 160);
    const apiSecret = String(process.env.LIVEKIT_API_SECRET || "").trim();
    if (!liveKitUrl || !apiKey || !apiSecret) {
      response.status(503).json({ ok: false, error: "Voice service is not configured" });
      return;
    }

    const roomId = cleanText(body.roomId, 90);
    const player = cleanText(body.player, 40);
    const room = (state.rooms || []).find((item) => item.id === roomId);
    const participant = room?.participants?.some((item) => normalizeName(item.name) === normalizeName(player));
    if (!roomId || !player || !room || !participant) {
      response.status(403).json({ ok: false, error: "Player is not a member of this room" });
      return;
    }

    response.status(200).json({
      ok: true,
      serverUrl: liveKitUrl,
      token: createLiveKitJoinToken({ apiKey, apiSecret, roomId, player }),
      expiresIn: 900,
    });
    return;
  }

  if (body.type === "hello") {
    markClient(state, body.player);
    response.status(200).json({
      ok: true,
      rooms: roomsWithOnlineState(state),
      serverTime: new Date().toISOString(),
    });
    return;
  }

  markClient(state, body.player || body.source || body.room?.owner);

  if (body.type === "sync-room") {
    mergeRoom(state, body.room);
  } else if (body.type === "delete-room") {
    deleteRoom(state, body.roomId, body.player);
  } else if (body.type === "leave-room") {
    leaveRoom(state, body.roomId, body.player);
  } else if (body.type === "decline-invite") {
    declineInvite(state, body.roomId, body.player);
  } else if (body.type === "mic") {
    updateMic(state, body.roomId, body.player, body.micEnabled);
  } else if (body.type === "signal") {
    addSignal(state, body);
  } else if (body.type === "audio-chunk") {
    addAudioChunk(state, body);
  }

  const nextState = await writeVoiceState(state);
  response.status(200).json({
    ok: true,
    rooms: roomsWithOnlineState(nextState),
    serverTime: new Date().toISOString(),
  });
};
