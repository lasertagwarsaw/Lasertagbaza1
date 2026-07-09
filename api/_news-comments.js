const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

const root = path.join(__dirname, "..");
const dataDir = path.join(root, "data");
const commentsPath = path.join(dataDir, "news-comments.json");
const commentsStorageKey = "baza:news-comments:v1";

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
};

const emptyState = () => ({ comments: {} });

const cleanText = (value, maxLength = 400) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeArticleId = (value) =>
  cleanText(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

const normalizeState = (state) => {
  if (!state || typeof state !== "object" || !state.comments || typeof state.comments !== "object") {
    return emptyState();
  }

  return {
    comments: Object.fromEntries(
      Object.entries(state.comments).map(([articleId, comments]) => [
        normalizeArticleId(articleId),
        Array.isArray(comments) ? comments.slice(-80) : [],
      ]),
    ),
  };
};

const readLocalComments = () => {
  try {
    return JSON.parse(fs.readFileSync(commentsPath, "utf8"));
  } catch (error) {
    return emptyState();
  }
};

const writeLocalComments = (state) => {
  ensureDataDir();
  fs.writeFileSync(commentsPath, JSON.stringify(state, null, 2));
};

const readNewsComments = async () => {
  let state;
  let storage = { ok: true, type: "file" };

  if (hasKvStorage()) {
    try {
      state = await readJson(commentsStorageKey, emptyState());
      storage = { ok: true, type: "kv" };
    } catch (error) {
      storage = { ok: false, type: "kv", reason: error.message };
      state = readLocalComments();
    }
  } else {
    state = readLocalComments();
  }

  return { ...normalizeState(state), storage };
};

const writeNewsComments = async (state) => {
  const cleanState = normalizeState(state);

  if (hasKvStorage()) {
    await writeJson(commentsStorageKey, cleanState);
    return { ok: true, type: "kv" };
  }

  writeLocalComments(cleanState);
  return { ok: true, type: "file" };
};

const addNewsComment = async ({ articleId, name, text, createdAt }) => {
  const cleanArticleId = normalizeArticleId(articleId);
  const cleanName = cleanText(name, 40);
  const cleanComment = cleanText(text, 500);

  if (!cleanArticleId || !cleanName || cleanComment.length < 2) {
    const error = new Error("Missing comment fields");
    error.statusCode = 400;
    throw error;
  }

  const state = await readNewsComments();
  const comments = state.comments[cleanArticleId] || [];
  const nextComment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: cleanName,
    text: cleanComment,
    createdAt: createdAt || new Date().toISOString(),
  };

  state.comments[cleanArticleId] = [...comments, nextComment].slice(-80);
  const storage = await writeNewsComments(state);
  return {
    ...state,
    storage,
    articleId: cleanArticleId,
    articleComments: state.comments[cleanArticleId],
  };
};

module.exports = { readNewsComments, addNewsComment };
