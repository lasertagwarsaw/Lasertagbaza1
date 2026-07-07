const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const feedPath = path.join(dataDir, "telegram-feed.json");
const maxItems = 25;

const feedMeta = {
  "signup-wednesday": {
    title: "▛ BAZA / ZAPISY ŚRODA 18:30 ▜",
    empty: "Brak zapisów na środę.",
    footer: "Lista środowa aktualizuje się po każdej wysyłce.",
  },
  "signup-sunday": {
    title: "▛ BAZA / ZAPISY NIEDZIELA 18:00 ▜",
    empty: "Brak zapisów na niedzielę.",
    footer: "Lista niedzielna aktualizuje się po każdej wysyłce.",
  },
  messages: {
    title: "▛ BAZA / WIADOMOŚCI ZE STRONY ▜",
    empty: "Brak wiadomości.",
    footer: "Lista wiadomości aktualizuje się po każdej wysyłce.",
  },
};

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const normalizeFeed = (feed) => {
  if (feed?.feeds) return feed;

  const legacyItems = Array.isArray(feed?.items) ? feed.items : [];
  const normalized = { feeds: {} };

  for (const [key] of Object.entries(feedMeta)) {
    normalized.feeds[key] = { messageId: null, items: [] };
  }

  legacyItems.forEach((item) => {
    const key = getFeedKey(item);
    normalized.feeds[key].items.push(item);
  });

  return normalized;
};

const readFeed = () => {
  try {
    return normalizeFeed(JSON.parse(fs.readFileSync(feedPath, "utf8")));
  } catch (error) {
    return normalizeFeed({ feeds: {} });
  }
};

const writeFeed = (feed) => {
  ensureDataDir();
  fs.writeFileSync(feedPath, JSON.stringify(feed, null, 2));
};

const escapeHtml = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatTime = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "teraz";
  return new Intl.DateTimeFormat("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Warsaw",
  }).format(date);
};

const getFeedKey = (item) => {
  if (item?.type !== "signup") return "messages";
  return item.game === "sunday" || /niedziel/i.test(item.gameLabel || "")
    ? "signup-sunday"
    : "signup-wednesday";
};

const buildFeedText = (feedKey, items) => {
  const meta = feedMeta[feedKey] || feedMeta.messages;
  const rows = items
    .slice(-maxItems)
    .map((item, index) => {
      const number = String(index + 1).padStart(2, "0");
      const time = formatTime(item.createdAt);

      if (item.type === "signup") {
        return [
          `<b>${number} / ${feedKey === "signup-sunday" ? "NIEDZIELA" : "ŚRODA"}</b>  <code>${escapeHtml(time)}</code>`,
          `<b>${escapeHtml(item.nickname)}</b>`,
          `tel: <code>${escapeHtml(item.phone)}</code>`,
          `info: ${escapeHtml(item.note || "brak")}`,
        ].join("\n");
      }

      return [
        `<b>${number} / CHAT</b>   <code>${escapeHtml(time)}</code>`,
        `${escapeHtml(item.message)}`,
      ].join("\n");
    })
    .join("\n\n");

  return [
    `<b>${meta.title}</b>`,
    `<code>${"─".repeat(34)}</code>`,
    rows || meta.empty,
    `<code>${"─".repeat(34)}</code>`,
    `<i>Ostatnie ${Math.min(items.length, maxItems)} z ${items.length}. ${meta.footer}</i>`,
  ].join("\n");
};

const telegramRequest = async (token, method, payload) => {
  const response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(result.description || `Telegram ${method} failed`);
  }

  return result.result;
};

async function appendTelegramFeed({ token, chatId, item }) {
  const feed = readFeed();
  const feedKey = getFeedKey(item);
  feed.feeds[feedKey] ||= { messageId: null, items: [] };

  const currentFeed = feed.feeds[feedKey];
  currentFeed.items.push({ ...item, createdAt: item.createdAt || new Date().toISOString() });
  currentFeed.items = currentFeed.items.slice(-maxItems);

  const text = buildFeedText(feedKey, currentFeed.items);
  let result;

  if (currentFeed.messageId) {
    try {
      result = await telegramRequest(token, "editMessageText", {
        chat_id: chatId,
        message_id: currentFeed.messageId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
    } catch (error) {
      result = await telegramRequest(token, "sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
      currentFeed.messageId = result.message_id;
    }
  } else {
    result = await telegramRequest(token, "sendMessage", {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });
    currentFeed.messageId = result.message_id;
  }

  writeFeed(feed);
  return {
    feedKey,
    messageId: result.message_id,
    chatId: result.chat?.id,
    chatTitle: result.chat?.title,
    chatType: result.chat?.type,
    items: currentFeed.items.length,
  };
}

async function clearSignupFeeds({ token, chatId }) {
  const feed = readFeed();
  const cleared = [];

  for (const feedKey of ["signup-wednesday", "signup-sunday"]) {
    feed.feeds[feedKey] ||= { messageId: null, items: [] };
    const currentFeed = feed.feeds[feedKey];
    currentFeed.items = [];

    if (!currentFeed.messageId) continue;

    const result = await telegramRequest(token, "editMessageText", {
      chat_id: chatId,
      message_id: currentFeed.messageId,
      text: buildFeedText(feedKey, currentFeed.items),
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });

    cleared.push({
      feedKey,
      messageId: result.message_id,
      chatId: result.chat?.id,
      chatTitle: result.chat?.title,
    });
  }

  writeFeed(feed);
  return cleared;
}

module.exports = { appendTelegramFeed, clearSignupFeeds };
