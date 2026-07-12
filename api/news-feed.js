const fs = require("node:fs");
const path = require("node:path");
const newsFeed = require("../data/news-feed.json");

const pagePath = path.join(__dirname, "..", "index.html");

const decodeHtml = (value) =>
  String(value || "")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\s+/g, " ")
    .trim();

const extractArticleContent = (html, id) => {
  const markerIndex = html.indexOf(`data-news-id="${id}"`);
  if (markerIndex < 0) return "";
  const articleStart = html.lastIndexOf("<article", markerIndex);
  const articleEnd = html.indexOf("</article>", markerIndex);
  const bodyStart = html.indexOf("update-article-body", markerIndex);
  if (articleStart < 0 || articleEnd < 0 || bodyStart < 0 || bodyStart > articleEnd) return "";

  const bodyHtml = html.slice(bodyStart, articleEnd);
  return [...bodyHtml.matchAll(/<(h4|p|blockquote|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => {
      const tag = match[1].toLowerCase();
      const text = tag === "pre"
        ? String(match[2]).split(/\r?\n/).map(decodeHtml).filter(Boolean).join("\n\n")
        : decodeHtml(match[2]);
      if (!text) return "";
      if (tag === "h4") return `## ${text}`;
      if (tag === "blockquote") return `> ${text}`;
      return text;
    })
    .filter(Boolean)
    .join("\n\n");
};

const withFullArticles = (sections) => {
  let html = "";
  try {
    html = fs.readFileSync(pagePath, "utf8");
  } catch {
    return sections;
  }
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      content: extractArticleContent(html, item.id),
    })),
  }));
};

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
  response.status(200).json({ ...newsFeed, schemaVersion: 2, sections: withFullArticles(sections) });
};
