const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const signupsPath = path.join(dataDir, "site-signups.json");
const signupsStorageKey = "baza:site-signups:v1";
const gameCapacities = { wednesday: 12, sunday: 60 };

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const getCurrentSignupCycleStart = (now = new Date()) => {
  const cycleStart = new Date(now);
  const daysSinceMonday = (cycleStart.getDay() + 6) % 7;
  cycleStart.setDate(cycleStart.getDate() - daysSinceMonday);
  cycleStart.setHours(10, 0, 0, 0);

  if (now < cycleStart) {
    cycleStart.setDate(cycleStart.getDate() - 7);
  }

  return cycleStart.toISOString();
};

const emptyState = () => ({ cycleStart: getCurrentSignupCycleStart(), signups: [] });

const normalizeState = (state) => {
  const currentCycle = getCurrentSignupCycleStart();
  if (!state || state.cycleStart !== currentCycle || !Array.isArray(state.signups)) {
    return { cycleStart: currentCycle, signups: [] };
  }
  return state;
};

const readLocalSignups = () => {
  try {
    return JSON.parse(fs.readFileSync(signupsPath, "utf8"));
  } catch (error) {
    return emptyState();
  }
};

const writeLocalSignups = (state) => {
  ensureDataDir();
  fs.writeFileSync(signupsPath, JSON.stringify(state, null, 2));
};

const readSiteSignups = async () => {
  let state;
  let storage = { ok: true, type: "file" };

  if (hasKvStorage()) {
    try {
      state = await readJson(signupsStorageKey, emptyState());
      storage = { ok: true, type: "kv" };
    } catch (error) {
      storage = { ok: false, type: "kv", reason: error.message };
      state = readLocalSignups();
    }
  } else {
    state = readLocalSignups();
  }

  const normalized = normalizeState(state);
  if (JSON.stringify(normalized) !== JSON.stringify(state)) await writeSiteSignups(normalized);
  return { ...normalized, storage };
};

const writeSiteSignups = async (state) => {
  const cleanState = {
    cycleStart: state.cycleStart,
    signups: Array.isArray(state.signups) ? state.signups : [],
  };

  if (hasKvStorage()) {
    await writeJson(signupsStorageKey, cleanState);
    return { ok: true, type: "kv" };
  }

  writeLocalSignups(cleanState);
  return { ok: true, type: "file" };
};

const cleanText = (value, maxLength = 80) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const addSiteSignup = async (signup) => {
  const state = await readSiteSignups();
  const id = cleanText(signup.id || String(Date.now()), 80);

  if (state.signups.some((item) => item.id === id)) return { ...state, added: false };

  const capacity = gameCapacities[signup.game];
  const gameSignups = state.signups.filter((item) => item.game === signup.game);
  if (!capacity || gameSignups.length >= capacity) {
    const error = new Error("Game capacity reached");
    error.statusCode = 409;
    throw error;
  }

  state.signups.push({
    id,
    game: signup.game,
    nickname: cleanText(signup.nickname, 40),
    note: cleanText(signup.note, 120),
    createdAt: signup.createdAt || new Date().toISOString(),
  });
  const storage = await writeSiteSignups(state);
  return { ...state, storage, added: true };
};

const removeSiteSignup = async ({ id, game, nickname }) => {
  const state = await readSiteSignups();
  const cleanId = cleanText(id, 80);
  const cleanGame = cleanText(game, 20);
  const cleanNickname = cleanText(nickname, 40).toLowerCase();
  const before = state.signups.length;

  state.signups = state.signups.filter((signup) => {
    if (cleanId && signup.id === cleanId) return false;
    if (
      String(signup.id || "").startsWith("app-") &&
      signup.game === cleanGame &&
      String(signup.nickname || "").trim().toLowerCase() === cleanNickname
    ) {
      return false;
    }
    return true;
  });

  const storage = before === state.signups.length ? state.storage || { ok: true } : await writeSiteSignups(state);
  return { ...state, storage, removed: before !== state.signups.length };
};

module.exports = { readSiteSignups, addSiteSignup, removeSiteSignup, getCurrentSignupCycleStart };
