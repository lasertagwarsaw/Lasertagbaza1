const fs = require("node:fs");
const path = require("node:path");
const { cleanText, playerId, readPlayerRanking, writePlayerRanking } = require("./_player-ranking");
const { readPlayerProfiles, writePlayerProfiles } = require("./_player-profiles");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const updateRankingHtml = (ranking) => {
  if (!fs.existsSync(indexPath)) return;
  let html = fs.readFileSync(indexPath, "utf8");

  ranking.players.forEach((player) => {
    const id = cleanText(player.id || playerId(player.nickname), 60);
    const nickname = cleanText(player.nickname || player.name, 40);
    const rank = Number(player.rank || 0);
    const points = Math.max(0, Math.min(10000, Number(player.points || 0)));
    if (!id || !nickname || !rank) return;

    const cardPattern = new RegExp(`(<article\\b[^>]*data-player-id="${escapeRegExp(id)}"[^>]*>)([\\s\\S]*?)(\\n\\s*</article>)`);
    html = html.replace(cardPattern, (fullMatch, openingTag, body, closingTag) => {
      const nextOpeningTag = openingTag
        .replace(/data-player-rank="[^"]*"/, `data-player-rank="${rank}"`)
        .replace(/data-player-points="[^"]*"/, `data-player-points="${points}"`);
      const nextBody = body
        .replace(/<b>\d+<\/b>/, `<b>${String(rank).padStart(2, "0")}</b>`)
        .replace(/(<strong\b[^>]*>)([\s\S]*?)(<\/strong>)/, `$1${nickname}$3`)
        .replace(/(<strong\b[^>]*>[\s\S]*?<\/strong>[\s\S]*?<span\b[^>]*>)(\d+\s*pkt)(<\/span>)/, `$1${points} pkt$3`);
      return `${nextOpeningTag}${nextBody}${closingTag}`;
    });
  });

  fs.writeFileSync(indexPath, html);
};

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  const ranking = await readPlayerRanking();
  const profiles = await readPlayerProfiles();

  if (request.method === "GET") {
    response.status(200).json({ ranking, profiles: profiles.profiles || {} });
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = request.body || {};
  const nickname = cleanText(body.nickname, 40);
  const points = Math.max(0, Math.min(10000, Number(body.points || 0)));

  if (!nickname) {
    response.status(400).json({ error: "Missing nickname" });
    return;
  }

  const id = playerId(nickname);
  const existingIndex = ranking.players.findIndex((player) => String(player.nickname || "").toLowerCase() === nickname.toLowerCase());
  const nextPlayer = {
    ...(existingIndex >= 0 ? ranking.players[existingIndex] : {}),
    id,
    nickname,
    points,
  };

  if (existingIndex >= 0) {
    ranking.players[existingIndex] = nextPlayer;
  } else {
    ranking.players.push(nextPlayer);
  }

  profiles.profiles = profiles.profiles || {};
  const existingProfile = profiles.profiles[id];
  if (body.passwordHash || existingProfile) {
    profiles.profiles = profiles.profiles || {};
    profiles.profiles[id] = {
      ...(existingProfile || {}),
      id,
      nickname,
      passwordHash: body.passwordHash ? cleanText(body.passwordHash, 120) : existingProfile?.passwordHash || "",
      contact: cleanText(body.contact, 80) || existingProfile?.contact || "admin-created",
      points,
      createdAt: existingProfile?.createdAt || body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await writePlayerProfiles(profiles);
  }

  const normalizedRanking = await writePlayerRanking(ranking);
  try {
    updateRankingHtml(normalizedRanking);
  } catch {
    // Vercel serverless files are read-only; the live page refreshes from /api/ranking-feed.
  }

  response.status(200).json({
    ok: true,
    player: nextPlayer,
    players: normalizedRanking.players,
    profiles: profiles.profiles || {},
  });
};
