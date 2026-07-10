const rankingFeed = require("../data/ranking-feed.json");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const requestedLimit = Number.parseInt(String(request.query?.limit || ""), 10);
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, rankingFeed.players.length)
    : rankingFeed.players.length;

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).json({
    ...rankingFeed,
    totalPlayers: rankingFeed.players.length,
    players: rankingFeed.players.slice(0, limit),
  });
};
