const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const signupsPath = path.join(dataDir, "site-signups.json");

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

const readSiteSignups = () => {
  let state;
  try {
    state = JSON.parse(fs.readFileSync(signupsPath, "utf8"));
  } catch (error) {
    state = emptyState();
  }

  const normalized = normalizeState(state);
  if (JSON.stringify(normalized) !== JSON.stringify(state)) writeSiteSignups(normalized);
  return normalized;
};

const writeSiteSignups = (state) => {
  ensureDataDir();
  fs.writeFileSync(signupsPath, JSON.stringify(state, null, 2));
};

const cleanText = (value, maxLength = 80) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const addSiteSignup = (signup) => {
  const state = readSiteSignups();
  const id = cleanText(signup.id || String(Date.now()), 80);

  if (state.signups.some((item) => item.id === id)) return state;

  state.signups.push({
    id,
    game: signup.game,
    nickname: cleanText(signup.nickname, 40),
    note: cleanText(signup.note, 120),
    createdAt: signup.createdAt || new Date().toISOString(),
  });
  writeSiteSignups(state);
  return state;
};

module.exports = { readSiteSignups, addSiteSignup, getCurrentSignupCycleStart };
