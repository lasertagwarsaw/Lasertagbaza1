const newsFeed = require("../data/news-feed.json");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sectionId = String(request.query?.section || "").trim();
  const sections = sectionId
    ? newsFeed.sections.filter((section) => section.id === sectionId)
    : newsFeed.sections;

  if (sectionId && !sections.length) {
    response.status(404).json({
      error: "Unknown news section",
      availableSections: newsFeed.sections.map((section) => section.id),
    });
    return;
  }

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400");
  response.status(200).json({ ...newsFeed, sections });
};
