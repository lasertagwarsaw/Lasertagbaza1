const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const newsFeed = require("../data/news-feed.json");
const { readNewsProposals } = require("./_news-proposals");
const proposalsHandler = require("./_news-proposals-handler");

const pagePath = path.join(__dirname, "..", "index.html");
const scriptPath = path.join(__dirname, "..", "script.js");
const externalTranslationPaths = [
  path.join(__dirname, "..", "data", "tort-review-translations.json"),
  path.join(__dirname, "..", "data", "noka-review-translations.json"),
  path.join(__dirname, "..", "data", "networking-news-translations.json"),
];
const supportedLanguages = ["pl", "uk", "be", "en", "ru"];

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

const mergeTranslationCatalog = (catalog, incoming = {}) => {
  Object.entries(incoming.copyById || {}).forEach(([copyId, translations]) => {
    catalog.copyById[copyId] = { ...(catalog.copyById[copyId] || {}), ...translations };
  });
  Object.entries(incoming.siteCopy || {}).forEach(([language, translations]) => {
    catalog.siteCopy[language] = { ...(catalog.siteCopy[language] || {}), ...translations };
  });
};

const loadTranslationCatalog = () => {
  const catalog = { copyById: {}, siteCopy: {} };
  try {
    const source = fs.readFileSync(scriptPath, "utf8");
    const start = source.indexOf("const siteCopy =");
    const end = source.indexOf("const mergeCopyById");
    if (start >= 0 && end > start) {
      mergeTranslationCatalog(
        catalog,
        vm.runInNewContext(`${source.slice(start, end)}\n({ siteCopy, copyById })`, {}, { timeout: 1000 }),
      );
    }
  } catch {
    // The original Polish article remains available if a translation catalog cannot be loaded.
  }
  externalTranslationPaths.forEach((translationPath) => {
    try {
      mergeTranslationCatalog(catalog, JSON.parse(fs.readFileSync(translationPath, "utf8")));
    } catch {
      // Keep the translations already loaded from the main site script.
    }
  });
  return catalog;
};

const extractArticleBlocks = (html, id) => {
  const markerIndex = html.indexOf(`data-news-id="${id}"`);
  if (markerIndex < 0) return [];
  const articleStart = html.lastIndexOf("<article", markerIndex);
  const articleEnd = html.indexOf("</article>", markerIndex);
  const bodyStart = html.indexOf("update-article-body", markerIndex);
  if (articleStart < 0 || articleEnd < 0 || bodyStart < 0 || bodyStart > articleEnd) return [];

  const bodyHtml = html.slice(bodyStart, articleEnd);
  return [...bodyHtml.matchAll(/<(h4|p|blockquote|pre)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => {
      const tag = match[1].toLowerCase();
      const text = tag === "pre"
        ? String(match[2]).split(/\r?\n/).map(decodeHtml).filter(Boolean).join("\n")
        : decodeHtml(match[2]);
      const copyId = match[0].match(/data-copy-id=["']([^"']+)["']/i)?.[1] || "";
      return text ? { tag, text, copyId } : null;
    })
    .filter(Boolean);
};

const formatBlock = (block, text) => {
  if (block.tag === "h4") return `## ${text}`;
  if (block.tag === "blockquote") return `> ${text}`;
  if (block.tag === "pre") {
    return String(text)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (/^\d+\.\s/.test(line) ? `## ${line}` : line))
      .join("\n\n");
  }
  return text;
};

const translatedArticleContent = (blocks, language, catalog) => blocks
  .map((block) => {
    const normalized = block.text.replace(/\s+/g, " ").trim();
    const translated = catalog.copyById[block.copyId]?.[language]
      || (language === "pl" ? block.text : catalog.siteCopy[language]?.[normalized] || block.text);
    return formatBlock(block, translated);
  })
  .filter(Boolean)
  .join("\n\n");

const withFullArticles = (sections) => {
  let html = "";
  try {
    html = fs.readFileSync(pagePath, "utf8");
  } catch {
    return sections;
  }
  const catalog = loadTranslationCatalog();
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const blocks = extractArticleBlocks(html, item.id);
      const contentByLanguage = Object.fromEntries(
        supportedLanguages.map((language) => [language, translatedArticleContent(blocks, language, catalog)]),
      );
      return {
        ...item,
        content: contentByLanguage.pl || "",
        contentByLanguage,
      };
    }),
  }));
};

const approvedPlayerNewsSection = async () => {
  const state = await readNewsProposals({ includeMedia: true });
  const items = state.proposals
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: item.id,
      articleKey: item.id,
      title: item.title,
      summary: item.body.slice(0, 220),
      author: item.author,
      publishedAt: String(item.publishedAt || item.createdAt).slice(0, 10),
      createdAt: item.publishedAt || item.createdAt,
      image: item.media?.type === "image" ? item.media.data : "assets/card-news-trophy.jpg",
      media: item.media || null,
      content: item.body,
      contentByLanguage: {},
      playerSubmitted: true,
    }));

  return {
    id: "player-news",
    labels: { pl: "Wiadomości graczy", en: "Player news", ru: "Новости игроков", uk: "Новини гравців", be: "Навіны гульцоў" },
    items,
  };
};

module.exports = async function handler(request, response) {
  if (request.query?.mode === "proposals") {
    await proposalsHandler(request, response);
    return;
  }
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const sectionId = String(request.query?.section || "").trim();
  const wantsPlayerNews = sectionId === "player-news";
  const sections = sectionId
    ? newsFeed.sections.filter((section) => section.id === sectionId)
    : newsFeed.sections;

  if (sectionId && !sections.length && !wantsPlayerNews) {
    response.status(404).json({
      error: "Unknown news section",
      availableSections: ["player-news", ...newsFeed.sections.map((section) => section.id)],
    });
    return;
  }

  const playerNews = await approvedPlayerNewsSection();
  const fullSections = withFullArticles(sections);
  const responseSections = wantsPlayerNews
    ? [playerNews]
    : !sectionId && playerNews.items.length
      ? [playerNews, ...fullSections]
      : fullSections;

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.status(200).json({ ...newsFeed, schemaVersion: 4, sections: responseSections });
};
