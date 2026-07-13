const fs = require("node:fs");
const path = require("node:path");
const { cleanText, playerId, readPlayerRanking, writePlayerRanking } = require("./_player-ranking");
const { readPlayerProfiles, writePlayerProfiles } = require("./_player-profiles");
const playerAvatarHandler = require("./_player-avatar-handler");

const root = path.join(__dirname, "..");
const indexPath = path.join(root, "index.html");
const publicAppOrigin = "https://www.lasertagbaza.pl";
const avatarMaxBytes = 100000;
const adminPassword = process.env.BAZA_ADMIN_PASSWORD || "Ruslan2026";
const protectedNicknames = new Set(["ruslan"]);

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseAvatarDataUrl = (value) => {
  const match = String(value || "").match(/^data:(image\/(?:jpeg|png|webp));base64,([a-z0-9+/=]+)$/i);
  if (!match) return null;
  let buffer;
  try {
    buffer = Buffer.from(match[2], "base64");
  } catch {
    return null;
  }
  if (!buffer.length || buffer.length > avatarMaxBytes) return null;
  return { data: `${match[2]}`, mime: match[1].toLowerCase(), bytes: buffer.length };
};

const avatarUrlFor = (id, updatedAt) =>
  `${publicAppOrigin}/api/player-avatar?id=${encodeURIComponent(id)}&v=${encodeURIComponent(updatedAt || "1")}`;

const publicProfiles = (profiles) =>
  Object.fromEntries(
    Object.entries(profiles || {})
      .filter(([id, profile]) => !protectedNicknames.has(cleanText(profile?.nickname || id, 40).toLowerCase()))
      .map(([id, profile]) => {
        const { avatarData, avatarMime, ...publicProfile } = profile || {};
        return [
          id,
          {
            ...publicProfile,
            avatar: avatarData ? avatarUrlFor(id, profile.avatarUpdatedAt || profile.updatedAt) : publicProfile.avatar || "",
          },
        ];
      }),
  );

const requestHeader = (request, name) =>
  request.headers?.get?.(name) || request.headers?.[name.toLowerCase()] || request.headers?.[name] || "";

const removeRankingHtmlPlayer = (id) => {
  if (!fs.existsSync(indexPath)) return;
  const html = fs.readFileSync(indexPath, "utf8");
  const cardPattern = new RegExp(
    `\\s*<article\\b[^>]*data-player-id="${escapeRegExp(id)}"[^>]*>[\\s\\S]*?</article>`,
    "i",
  );
  fs.writeFileSync(indexPath, html.replace(cardPattern, ""));
};

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
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-BAZA-Admin");

  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  if (request.query?.service === "avatar") {
    await playerAvatarHandler(request, response);
    return;
  }

  const ranking = await readPlayerRanking();
  const profiles = await readPlayerProfiles();

  if (request.method === "GET") {
    response.status(200).json({ ranking, profiles: publicProfiles(profiles.profiles) });
    return;
  }

  if (request.method === "DELETE") {
    const body = request.body || {};
    const nickname = cleanText(body.nickname, 40);
    const normalizedNickname = nickname.toLowerCase();

    if (requestHeader(request, "x-baza-admin") !== adminPassword) {
      response.status(403).json({ error: "Admin authorization required" });
      return;
    }
    if (!nickname) {
      response.status(400).json({ error: "Missing nickname" });
      return;
    }
    if (protectedNicknames.has(normalizedNickname)) {
      response.status(403).json({ error: "Administrator account is protected" });
      return;
    }

    const id = playerId(nickname);
    const previousPlayerCount = ranking.players.length;
    ranking.players = ranking.players.filter((player) => {
      const playerNickname = cleanText(player.nickname || player.name, 40);
      return playerId(playerNickname) !== id && playerNickname.toLowerCase() !== normalizedNickname;
    });

    profiles.profiles = profiles.profiles || {};
    let profileDeleted = false;
    Object.entries(profiles.profiles).forEach(([profileId, profile]) => {
      const profileNickname = cleanText(profile?.nickname, 40);
      if (profileId === id || profileNickname.toLowerCase() === normalizedNickname) {
        delete profiles.profiles[profileId];
        profileDeleted = true;
      }
    });

    if (ranking.players.length === previousPlayerCount && !profileDeleted) {
      response.status(404).json({ error: "Player not found" });
      return;
    }

    const normalizedRanking = await writePlayerRanking(ranking);
    await writePlayerProfiles(profiles);
    try {
      removeRankingHtmlPlayer(id);
      updateRankingHtml(normalizedRanking);
    } catch {
      // Vercel serverless files are read-only; the live page refreshes from /api/ranking-feed.
    }

    response.status(200).json({
      ok: true,
      deleted: nickname,
      players: normalizedRanking.players,
      profiles: publicProfiles(profiles.profiles),
    });
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
  profiles.profiles = profiles.profiles || {};
  const existingProfile = profiles.profiles[id];
  const avatar = body.avatar ? parseAvatarDataUrl(body.avatar) : null;
  if (body.avatar && !avatar) {
    response.status(400).json({ error: "Invalid avatar image" });
    return;
  }
  if (avatar && existingProfile?.passwordHash && String(body.passwordHash || "") !== String(existingProfile.passwordHash)) {
    response.status(403).json({ error: "Avatar authorization failed" });
    return;
  }
  const avatarUpdatedAt = avatar ? new Date().toISOString() : existingProfile?.avatarUpdatedAt || "";
  const nextPlayer = {
    ...(existingIndex >= 0 ? ranking.players[existingIndex] : {}),
    id,
    nickname,
    points,
    avatar: avatar ? avatarUrlFor(id, avatarUpdatedAt) : ranking.players[existingIndex]?.avatar || "",
  };

  if (existingIndex >= 0) {
    ranking.players[existingIndex] = nextPlayer;
  } else {
    ranking.players.push(nextPlayer);
  }

  if (body.passwordHash || existingProfile) {
    profiles.profiles[id] = {
      ...(existingProfile || {}),
      id,
      nickname,
      passwordHash: body.passwordHash ? cleanText(body.passwordHash, 120) : existingProfile?.passwordHash || "",
      contact: cleanText(body.contact, 80) || existingProfile?.contact || "admin-created",
      points,
      avatarData: avatar?.data || existingProfile?.avatarData || "",
      avatarMime: avatar?.mime || existingProfile?.avatarMime || "",
      avatarUpdatedAt,
      avatar: avatar ? avatarUrlFor(id, avatarUpdatedAt) : existingProfile?.avatar || nextPlayer.avatar || "",
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
    profiles: publicProfiles(profiles.profiles),
  });
};

module.exports.parseAvatarDataUrl = parseAvatarDataUrl;
module.exports.avatarUrlFor = avatarUrlFor;
