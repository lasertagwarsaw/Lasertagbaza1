module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const result = {
    ok: false,
    tokenConfigured: Boolean(token),
    chatConfigured: Boolean(chatId),
    chatId: chatId ? String(chatId) : null,
  };

  if (!token || !chatId) {
    response.status(200).json({
      ...result,
      reason: "Telegram env vars are missing",
    });
    return;
  }

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/getMe`);
    const telegramResult = await telegramResponse.json().catch(() => ({}));
    const chatResponse = await fetch(`https://api.telegram.org/bot${token}/getChat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId }),
    });
    const chatResult = await chatResponse.json().catch(() => ({}));

    response.status(200).json({
      ...result,
      ok: telegramResponse.ok && telegramResult.ok === true && chatResponse.ok && chatResult.ok === true,
      bot: telegramResult.result
        ? {
            id: telegramResult.result.id,
            username: telegramResult.result.username,
            firstName: telegramResult.result.first_name,
          }
        : null,
      telegramOk: telegramResult.ok === true,
      telegramError: telegramResult.description || null,
      chatOk: chatResult.ok === true,
      chat: chatResult.result
        ? {
            id: chatResult.result.id,
            title: chatResult.result.title,
            type: chatResult.result.type,
          }
        : null,
      chatError: chatResult.description || null,
    });
  } catch (error) {
    response.status(200).json({
      ...result,
      reason: error.message,
    });
  }
};
