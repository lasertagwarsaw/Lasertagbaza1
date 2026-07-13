const { playerId } = require("./_player-ranking");
const { readPlayerProfiles } = require("./_player-profiles");

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const id = playerId(String(request.query?.id || ""));
  const profiles = await readPlayerProfiles();
  const profile = profiles.profiles?.[id];
  if (!profile?.avatarData || !profile?.avatarMime) {
    response.status(404).json({ error: "Avatar not found" });
    return;
  }

  let image;
  try {
    image = Buffer.from(profile.avatarData, "base64");
  } catch {
    response.status(404).json({ error: "Avatar not found" });
    return;
  }
  if (!image.length || image.length > 100000) {
    response.status(404).json({ error: "Avatar not found" });
    return;
  }

  response.setHeader("Content-Type", profile.avatarMime);
  response.setHeader("Content-Length", String(image.length));
  response.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  response.status(200).send(image);
};
