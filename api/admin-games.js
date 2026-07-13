const { cleanText, normalizeGame, readAdminGames, writeAdminGames } = require("./_admin-games");

const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type,X-BAZA-Admin");
};

const parseBody = (request) => {
  if (typeof request.body === "string") return JSON.parse(request.body || "{}");
  return request.body || {};
};

module.exports = async function handler(request, response) {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method === "GET") {
    const state = await readAdminGames();
    response.setHeader("Cache-Control", "no-store, max-age=0");
    response.status(200).json({ ok: true, ...state });
    return;
  }

  if (!["POST", "DELETE"].includes(request.method)) {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const expectedAdminPassword = process.env.BAZA_ADMIN_PASSWORD || "Ruslan2026";
  if (String(request.headers?.["x-baza-admin"] || "") !== expectedAdminPassword) {
    response.status(401).json({ error: "Admin authorization required" });
    return;
  }

  let body;
  try {
    body = parseBody(request);
  } catch {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  const state = await readAdminGames();
  if (request.method === "DELETE") {
    const id = cleanText(body.id, 80);
    if (!id) {
      response.status(400).json({ error: "Missing game id" });
      return;
    }
    const before = state.games.length;
    state.games = state.games.filter((game) => game.id !== id);
    const nextState = before === state.games.length ? state : await writeAdminGames(state);
    response.status(200).json({ ok: true, removed: before !== state.games.length, ...nextState });
    return;
  }

  const startsAt = new Date(body.startsAt || "");
  if (!cleanText(body.title, 64) || Number.isNaN(startsAt.getTime())) {
    response.status(400).json({ error: "Missing game title or start time" });
    return;
  }
  if (startsAt.getTime() < Date.now() - 5 * 60 * 1000) {
    response.status(400).json({ error: "Game start time must be in the future" });
    return;
  }

  const id = cleanText(body.id, 80) || `admin-game-${Date.now()}`;
  const existing = state.games.find((game) => game.id === id);
  const game = normalizeGame({
    ...existing,
    id,
    title: body.title,
    startsAt: startsAt.toISOString(),
    time: body.time,
    scenario: body.scenario,
    capacity: body.capacity,
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  state.games = [...state.games.filter((item) => item.id !== id), game].sort((left, right) =>
    left.startsAt.localeCompare(right.startsAt),
  );
  const nextState = await writeAdminGames(state);
  response.status(200).json({ ok: true, game, ...nextState });
};
