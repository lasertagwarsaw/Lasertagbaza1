const { hasKvStorage, kvRequest } = require("./_kv-storage");
const { enforceRateLimit } = require("./_request-guard");

const allowedEvents = new Set([
  "page_view",
  "tournament_open",
  "signup_open",
  "signup_submit",
  "signup_success",
  "signup_error",
  "news_open",
  "player_search",
]);

const cleanPart = (value, maxLength = 60) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, "-")
    .slice(0, maxLength);

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
    enforceRateLimit(request, "analytics", 80, 60 * 1000);
  } catch (error) {
    response.status(error.statusCode || 400).json({ error: error.message || "Invalid analytics body" });
    return;
  }

  const event = cleanPart(body.event, 40);
  if (!allowedEvents.has(event)) {
    response.status(400).json({ error: "Unknown analytics event" });
    return;
  }

  if (!hasKvStorage()) {
    response.status(202).json({ ok: true, stored: false });
    return;
  }

  const day = new Date().toISOString().slice(0, 10);
  const path = cleanPart(body.path || "/", 80);
  const language = cleanPart(body.language || "pl", 5);
  const field = `${event}:${path}:${language}`;

  try {
    await kvRequest("HINCRBY", `baza:analytics:${day}`, field, 1);
    await kvRequest("EXPIRE", `baza:analytics:${day}`, 90 * 24 * 60 * 60);
    response.status(202).json({ ok: true, stored: true });
  } catch (error) {
    response.status(202).json({ ok: true, stored: false });
  }
};
