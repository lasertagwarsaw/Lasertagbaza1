const { appendTelegramFeed } = require("./_telegram-feed");
const { readSiteSignups, addSiteSignup, removeSiteSignup } = require("./_site-signups");
const { assertHumanSubmission, enforceRateLimit } = require("./_request-guard");
const { setPointAward } = require("./_points-awards");
const { readPlayerProfiles } = require("./_player-profiles");
const { readAdminGames } = require("./_admin-games");

const standardGameCapacities = { wednesday: 12, sunday: 60 };
const resolveGameCapacity = async (game) => {
  if (standardGameCapacities[game]) return standardGameCapacities[game];
  const adminGames = await readAdminGames();
  return Number(adminGames.games.find((item) => item.id === game)?.capacity || 0);
};

const normalizeName = (value) => String(value || "").trim().toLowerCase();
const registeredPlayerMatches = async (nickname, playerProof) => {
  if (!playerProof) return false;
  const profiles = await readPlayerProfiles();
  return Object.values(profiles.profiles || {}).some(
    (profile) =>
      normalizeName(profile.nickname) === normalizeName(nickname) &&
      Boolean(profile.passwordHash) &&
      String(profile.passwordHash) === String(playerProof),
  );
};

const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Max-Age", "86400");
};

module.exports = async function handler(request, response) {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method === "GET") {
    try {
      response.status(200).json({ ok: true, ...(await readSiteSignups()) });
    } catch (error) {
      response.status(200).json({
        ok: true,
        storage: { ok: false, reason: error.message },
        cycleStart: null,
        signups: [],
      });
    }
    return;
  }

  if (request.method === "DELETE") {
    let body;
    try {
      body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    } catch (error) {
      response.status(400).json({ error: "Invalid JSON body" });
      return;
    }

    const { id, game, nickname } = body;
    if (!id || !String(game || "").trim() || !nickname) {
      response.status(400).json({ error: "Missing cancellation fields" });
      return;
    }

    try {
      const siteState = await removeSiteSignup({ id, game, nickname });
      const award = siteState.removed
        ? await setPointAward({
            eventId: `game:${id}`,
            nickname,
            points: 25,
            active: false,
            reason: `game booking cancelled: ${game}`,
          })
        : null;
      response.status(200).json({
        ok: true,
        storage: siteState.storage,
        signups: siteState.signups,
        cycleStart: siteState.cycleStart,
        ranking: award?.ranking || null,
      });
    } catch (error) {
      response.status(500).json({ error: "Cancellation failed", reason: error.message });
    }
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  } catch (error) {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  try {
    assertHumanSubmission(body);
    enforceRateLimit(request, "signup", 4, 10 * 60 * 1000);
  } catch (error) {
    response.status(error.statusCode || 400).json({ error: error.message });
    return;
  }

  const { id, game, gameLabel, nickname, phone, note, createdAt, playerProof } = body;

  const gameCapacity = await resolveGameCapacity(game);
  if (!gameCapacity || !gameLabel || !nickname || !phone) {
    response.status(400).json({ error: "Missing signup fields" });
    return;
  }

  let siteState = { signups: [], cycleStart: null };
  let storageResult = { ok: true };
  try {
    siteState = await addSiteSignup({ id, game, nickname, note, createdAt }, { capacity: gameCapacity });
    storageResult = siteState.storage || storageResult;
  } catch (error) {
    console.warn("[telegram-signup] site signup storage failed:", error.message);
    response.status(error.statusCode || 503).json({
      error: error.statusCode === 409 ? "Game capacity reached" : "Signup storage unavailable",
    });
    return;
  }
  let ranking = null;
  if (siteState.added && (await registeredPlayerMatches(nickname, playerProof))) {
    try {
      ranking = (
        await setPointAward({
          eventId: `game:${id}`,
          nickname,
          points: 25,
          active: true,
          reason: `game booking: ${game}`,
        })
      ).ranking;
    } catch (error) {
      console.warn("[telegram-signup] point award failed:", error.message);
    }
  }
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  let telegramResult = { ok: false, skipped: true, reason: "Telegram env vars are missing" };

  if (token && chatId) {
    try {
      telegramResult = {
        ok: true,
        ...(await appendTelegramFeed({
          token,
          chatId,
          item: {
            type: "signup",
            game,
            gameLabel,
            nickname,
            phone,
            note,
            createdAt,
          },
        })),
      };
      console.log("[telegram-signup] feed updated", telegramResult);
    } catch (error) {
      telegramResult = { ok: false, skipped: false, reason: error.message };
      console.warn("[telegram-signup] site signup saved, Telegram failed:", error.message);
    }
  }

  response.status(200).json({
    ok: true,
    storage: storageResult,
    telegram: telegramResult,
    signups: siteState.signups,
    cycleStart: siteState.cycleStart,
    ranking,
  });
};
