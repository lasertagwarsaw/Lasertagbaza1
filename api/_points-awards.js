const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");
const { cleanText, playerId, readPlayerRanking, writePlayerRanking } = require("./_player-ranking");
const { readPlayerProfiles, writePlayerProfiles } = require("./_player-profiles");

const dataDir = path.join(__dirname, "..", "data");
const awardsPath = path.join(dataDir, "points-awards.json");
const awardsStorageKey = "baza:points-awards:v1";

const normalizeName = (value) => cleanText(value, 40).toLowerCase();

const emptyState = () => ({ schemaVersion: 1, events: {}, updatedAt: new Date().toISOString() });

const normalizeState = (state) => ({
  ...emptyState(),
  ...(state && typeof state === "object" ? state : {}),
  events: state?.events && typeof state.events === "object" ? state.events : {},
  updatedAt: new Date().toISOString(),
});

const readLocalState = () => {
  try {
    return normalizeState(JSON.parse(fs.readFileSync(awardsPath, "utf8")));
  } catch {
    return emptyState();
  }
};

const writeLocalState = (state) => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(awardsPath, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
};

const readAwardState = async () => {
  const fallback = readLocalState();
  if (!hasKvStorage()) return fallback;
  try {
    return normalizeState(await readJson(awardsStorageKey, fallback));
  } catch {
    return fallback;
  }
};

const writeAwardState = async (state) => {
  const normalized = normalizeState(state);
  if (hasKvStorage()) {
    await writeJson(awardsStorageKey, normalized);
    return normalized;
  }
  writeLocalState(normalized);
  return normalized;
};

const setPointAward = async ({ eventId, nickname, points, active = true, reason = "" }) => {
  const cleanEventId = cleanText(eventId, 120);
  const cleanNickname = cleanText(nickname, 40);
  const awardPoints = Math.max(0, Math.min(1000, Number(points || 0)));
  if (!cleanEventId || !cleanNickname || !awardPoints) throw new Error("Invalid point award");

  const state = await readAwardState();
  const previous = state.events[cleanEventId];
  const previousValue = previous?.active ? Number(previous.points || 0) : 0;
  const nextValue = active ? awardPoints : 0;
  const delta = nextValue - previousValue;

  if (!delta) {
    return { changed: false, delta: 0, ranking: await readPlayerRanking(), event: previous || null };
  }

  const ranking = await readPlayerRanking();
  const playerIndex = ranking.players.findIndex(
    (player) => normalizeName(player.nickname || player.name) === normalizeName(cleanNickname),
  );
  const existing = playerIndex >= 0 ? ranking.players[playerIndex] : null;
  const nextPlayer = {
    ...(existing || {}),
    id: existing?.id || playerId(cleanNickname),
    nickname: existing?.nickname || cleanNickname,
    points: Math.max(0, Math.min(10000, Number(existing?.points || 0) + delta)),
  };

  if (playerIndex >= 0) ranking.players[playerIndex] = nextPlayer;
  else ranking.players.push(nextPlayer);

  const nextRanking = await writePlayerRanking(ranking);
  const profiles = await readPlayerProfiles();
  const profileEntry = Object.entries(profiles.profiles || {}).find(
    ([, profile]) => normalizeName(profile.nickname) === normalizeName(cleanNickname),
  );
  if (profileEntry) {
    profiles.profiles[profileEntry[0]] = {
      ...profileEntry[1],
      points: nextPlayer.points,
      updatedAt: new Date().toISOString(),
    };
    await writePlayerProfiles(profiles);
  }
  state.events[cleanEventId] = {
    id: cleanEventId,
    nickname: cleanNickname,
    points: awardPoints,
    active: Boolean(active),
    reason: cleanText(reason, 120),
    updatedAt: new Date().toISOString(),
  };
  await writeAwardState(state);

  return { changed: true, delta, ranking: nextRanking, event: state.events[cleanEventId] };
};

module.exports = { setPointAward };
