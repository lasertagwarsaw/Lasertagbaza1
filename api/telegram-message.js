const { appendTelegramFeed } = require("./_telegram-feed");

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    response.status(500).json({ error: "Telegram env vars are missing" });
    return;
  }

  let body = {};
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  } catch (error) {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  const message = String(body.message || "").trim();
  const createdAt = body.createdAt || new Date().toISOString();

  if (!message) {
    response.status(400).json({ error: "Missing message" });
    return;
  }

  const telegramResult = await appendTelegramFeed({
    token,
    chatId,
    item: {
      type: "message",
      message,
      createdAt,
    },
  });

  console.log("[telegram-message] feed updated", telegramResult);

  response.status(200).json({
    ok: true,
    telegram: telegramResult,
  });
};
