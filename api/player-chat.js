const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const chatPath = path.join(dataDir, "player-chat.json");
const chatStorageKey = "baza:player-chat:v1";

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const cleanText = (value, maxLength = 240) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeName = (value) => cleanText(value, 40).toLowerCase();

const cleanImage = (value) => {
  const image = String(value || "");
  if (!/^data:image\/(?:jpeg|jpg|png|webp);base64,[a-z0-9+/=]+$/i.test(image)) return "";
  return image.length <= 135000 ? image : "";
};

const makeId = () => `chat-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const emptyState = () => ({
  schemaVersion: 1,
  messages: [],
  updatedAt: new Date().toISOString(),
});

const normalizeMessage = (message) => {
  const author = cleanText(message?.author, 40);
  const body = cleanText(message?.body, 160);
  const image = cleanImage(message?.image);
  if (!author || (!body && !image)) return null;
  return {
    id: cleanText(message?.id, 90) || makeId(),
    author,
    body,
    image,
    registered: true,
    createdAt: message?.createdAt || new Date().toISOString(),
  };
};

const normalizeState = (state) => {
  const messages = (Array.isArray(state?.messages) ? state.messages : []).map(normalizeMessage).filter(Boolean).slice(-120);
  let imageCount = 0;
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (!messages[index].image) continue;
    imageCount += 1;
    if (imageCount > 20) messages[index] = { ...messages[index], image: "" };
  }
  return {
    ...emptyState(),
    ...(state && typeof state === "object" ? state : {}),
    messages,
    updatedAt: new Date().toISOString(),
  };
};

const readLocalState = () => {
  try {
    return normalizeState(JSON.parse(fs.readFileSync(chatPath, "utf8")));
  } catch {
    return emptyState();
  }
};

const writeLocalState = (state) => {
  ensureDataDir();
  fs.writeFileSync(chatPath, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
};

const readChatState = async () => {
  const fallback = readLocalState();
  if (!hasKvStorage()) return fallback;
  try {
    return normalizeState(await readJson(chatStorageKey, fallback));
  } catch {
    return fallback;
  }
};

const writeChatState = async (state) => {
  const normalized = normalizeState(state);
  if (hasKvStorage()) {
    await writeJson(chatStorageKey, normalized);
    return normalized;
  }
  writeLocalState(normalized);
  return normalized;
};

const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "86400");
  response.setHeader("Cache-Control", "no-store");
};

module.exports = async function handler(request, response) {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  const state = await readChatState();

  if (request.method === "GET") {
    response.status(200).json({ ok: true, messages: state.messages || [] });
    return;
  }

  if (request.method === "POST") {
    const message = normalizeMessage(request.body || {});
    if (!message) {
      response.status(400).json({ error: "Missing chat message" });
      return;
    }
    if (!state.messages.some((item) => item.id === message.id)) {
      state.messages.push(message);
      state.messages = state.messages.slice(-120);
    }
    const nextState = await writeChatState(state);
    response.status(200).json({ ok: true, messages: nextState.messages || [] });
    return;
  }

  if (request.method === "DELETE") {
    const body = request.body || {};
    const id = cleanText(body.id, 90);
    const author = normalizeName(body.author);
    const isAdmin = Boolean(body.admin);
    state.messages = (state.messages || []).filter((message) => {
      if (message.id !== id) return true;
      return !isAdmin && normalizeName(message.author) !== author;
    });
    const nextState = await writeChatState(state);
    response.status(200).json({ ok: true, messages: nextState.messages || [] });
    return;
  }

  response.status(405).json({ error: "Method not allowed" });
};
