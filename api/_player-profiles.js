const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const profilesPath = path.join(dataDir, "player-profiles.json");
const profilesStorageKey = "baza:player-profiles:v1";

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const normalizeProfiles = (profiles) => ({
  schemaVersion: 1,
  profiles: profiles?.profiles && typeof profiles.profiles === "object" ? profiles.profiles : {},
  updatedAt: new Date().toISOString(),
});

const readLocalProfiles = () => {
  try {
    return normalizeProfiles(JSON.parse(fs.readFileSync(profilesPath, "utf8")));
  } catch {
    return normalizeProfiles({ profiles: {} });
  }
};

const writeLocalProfiles = (profiles) => {
  ensureDataDir();
  fs.writeFileSync(profilesPath, `${JSON.stringify(normalizeProfiles(profiles), null, 2)}\n`);
};

const readPlayerProfiles = async () => {
  const fallback = readLocalProfiles();
  if (!hasKvStorage()) return fallback;

  try {
    return normalizeProfiles(await readJson(profilesStorageKey, fallback));
  } catch {
    return fallback;
  }
};

const writePlayerProfiles = async (profiles) => {
  const normalizedProfiles = normalizeProfiles(profiles);
  if (hasKvStorage()) {
    await writeJson(profilesStorageKey, normalizedProfiles);
    return normalizedProfiles;
  }
  writeLocalProfiles(normalizedProfiles);
  return normalizedProfiles;
};

module.exports = { readPlayerProfiles, writePlayerProfiles };
