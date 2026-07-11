const { readPlayerRanking } = require("./_player-ranking");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const rankingFeed = await readPlayerRanking();
  const players = Array.isArray(rankingFeed.players) ? rankingFeed.players : [];
  const requestedLimit = Number.parseInt(String(request.query?.limit || ""), 10);
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0 ? Math.min(requestedLimit, players.length) : players.length;

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "no-store");
  response.status(200).json({
    ...rankingFeed,
    totalPlayers: players.length,
    players: players.slice(0, limit),
  });
};
