const { appendTelegramFeed } = require("./_telegram-feed");
const { readSiteSignups, addSiteSignup } = require("./_site-signups");

module.exports = async function handler(request, response) {
  if (request.method === "GET") {
    response.status(200).json({ ok: true, ...readSiteSignups() });
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

  const { id, game, gameLabel, nickname, phone, note, createdAt } = body;

  if (!["wednesday", "sunday"].includes(game) || !gameLabel || !nickname || !phone) {
    response.status(400).json({ error: "Missing signup fields" });
    return;
  }

  const siteState = addSiteSignup({ id, game, nickname, note, createdAt });
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
    telegram: telegramResult,
    signups: siteState.signups,
    cycleStart: siteState.cycleStart,
  });
};
