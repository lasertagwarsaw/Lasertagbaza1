const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const rankingPath = path.join(dataDir, "ranking-feed.json");
const rankingStorageKey = "baza:player-ranking:v1";

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const cleanText = (value, maxLength = 80) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const playerId = (nickname) =>
  cleanText(nickname, 40)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || `player-${Date.now()}`;

const readLocalRanking = () => {
  try {
    return JSON.parse(fs.readFileSync(rankingPath, "utf8"));
  } catch {
    return { schemaVersion: 1, players: [] };
  }
};

const writeLocalRanking = (ranking) => {
  ensureDataDir();
  fs.writeFileSync(rankingPath, `${JSON.stringify(ranking, null, 2)}\n`);
};

const normalizeRanking = (ranking) => {
  const players = Array.isArray(ranking.players) ? ranking.players : [];
  const normalizedPlayers = players
    .filter((player) => String(player.nickname || player.name || "").trim())
    .map((player) => ({ ...player, points: Math.max(0, Math.min(10000, Number(player.points || 0))) }))
    .sort((a, b) => Number(b.points || 0) - Number(a.points || 0) || String(a.nickname || a.name || "").localeCompare(String(b.nickname || b.name || "")))
    .map((player, index) => ({ ...player, rank: index + 1 }));

  return {
    ...ranking,
    players: normalizedPlayers,
    totalPlayers: normalizedPlayers.length,
    updatedAt: new Date().toISOString(),
  };
};

const readPlayerRanking = async () => {
  const fallback = readLocalRanking();
  if (!hasKvStorage()) return normalizeRanking(fallback);

  try {
    return normalizeRanking(await readJson(rankingStorageKey, fallback));
  } catch {
    return normalizeRanking(fallback);
  }
};

const writePlayerRanking = async (ranking) => {
  const normalizedRanking = normalizeRanking(ranking);
  if (hasKvStorage()) {
    await writeJson(rankingStorageKey, normalizedRanking);
    return normalizedRanking;
  }
  writeLocalRanking(normalizedRanking);
  return normalizedRanking;
};

module.exports = { cleanText, playerId, readPlayerRanking, writePlayerRanking };
