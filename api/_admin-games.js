const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const gamesPath = path.join(dataDir, "admin-games.json");
const gamesStorageKey = "baza:admin-games:v1";

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const cleanText = (value, maxLength = 80) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeGame = (game) => {
  const startsAt = new Date(game?.startsAt || "");
  if (!game?.id || Number.isNaN(startsAt.getTime())) return null;
  return {
    id: cleanText(game.id, 80),
    title: cleanText(game.title || "BAZA game", 64),
    startsAt: startsAt.toISOString(),
    time: cleanText(game.time || startsAt.toISOString().slice(11, 16), 5),
    scenario: cleanText(game.scenario || "BAZA admin game", 120),
    capacity: Math.max(2, Math.min(80, Number(game.capacity || 20))),
    createdAt: game.createdAt || new Date().toISOString(),
    updatedAt: game.updatedAt || new Date().toISOString(),
  };
};

const normalizeState = (state) => ({
  schemaVersion: 1,
  games: (Array.isArray(state?.games) ? state.games : []).map(normalizeGame).filter(Boolean),
  updatedAt: state?.updatedAt || new Date().toISOString(),
});

const readLocalGames = () => {
  try {
    return normalizeState(JSON.parse(fs.readFileSync(gamesPath, "utf8")));
  } catch {
    return normalizeState({ games: [] });
  }
};

const writeLocalGames = (state) => {
  ensureDataDir();
  fs.writeFileSync(gamesPath, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
};

const readAdminGames = async () => {
  const fallback = readLocalGames();
  if (!hasKvStorage()) return { ...fallback, storage: { ok: true, type: "file" } };

  try {
    return {
      ...normalizeState(await readJson(gamesStorageKey, fallback)),
      storage: { ok: true, type: "kv" },
    };
  } catch (error) {
    return { ...fallback, storage: { ok: false, type: "kv", reason: error.message } };
  }
};

const writeAdminGames = async (state) => {
  const normalized = normalizeState({ ...state, updatedAt: new Date().toISOString() });
  if (hasKvStorage()) {
    await writeJson(gamesStorageKey, normalized);
    return { ...normalized, storage: { ok: true, type: "kv" } };
  }
  writeLocalGames(normalized);
  return { ...normalized, storage: { ok: true, type: "file" } };
};

module.exports = { cleanText, normalizeGame, readAdminGames, writeAdminGames };
