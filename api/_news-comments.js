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

const emptyState = () => ({ comments: {}, reactions: {} });

const cleanText = (value, maxLength = 400) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const normalizeArticleId = (value) =>
  cleanText(value, 80)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

const normalizeVoter = (value) =>
  cleanText(value, 40)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

const normalizeState = (state) => {
  if (!state || typeof state !== "object") {
    return emptyState();
  }

  return {
    comments: Object.fromEntries(
      Object.entries(state.comments && typeof state.comments === "object" ? state.comments : {}).map(([articleId, comments]) => [
        normalizeArticleId(articleId),
        Array.isArray(comments) ? comments.slice(-80) : [],
      ]),
    ),
    reactions: Object.fromEntries(
      Object.entries(state.reactions && typeof state.reactions === "object" ? state.reactions : {}).map(([articleId, reactionState]) => [
        normalizeArticleId(articleId),
        {
          votes: Object.fromEntries(
            Object.entries(reactionState?.votes && typeof reactionState.votes === "object" ? reactionState.votes : {})
              .map(([voter, reaction]) => [normalizeVoter(voter), reaction === "like" || reaction === "dislike" ? reaction : ""])
              .filter(([voter, reaction]) => voter && reaction),
          ),
        },
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

const readNewsState = async () => {
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

const reactionSummaries = (state, voter = "") => {
  const voterId = normalizeVoter(voter);
  return Object.fromEntries(
    Object.entries(state.reactions || {}).map(([articleId, reactionState]) => {
      const votes = Object.values(reactionState?.votes || {});
      return [
        articleId,
        {
          likes: votes.filter((reaction) => reaction === "like").length,
          dislikes: votes.filter((reaction) => reaction === "dislike").length,
          viewerReaction: voterId ? reactionState?.votes?.[voterId] || "" : "",
        },
      ];
    }),
  );
};

const readNewsComments = async ({ voter = "" } = {}) => {
  const state = await readNewsState();
  return {
    comments: state.comments,
    reactions: reactionSummaries(state, voter),
    storage: state.storage,
  };
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

  const state = await readNewsState();
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
    comments: state.comments,
    reactions: reactionSummaries(state, cleanName),
    storage,
    articleId: cleanArticleId,
    articleComments: state.comments[cleanArticleId],
  };
};

const addNewsReaction = async ({ articleId, name, reaction }) => {
  const cleanArticleId = normalizeArticleId(articleId);
  const voterId = normalizeVoter(name);
  const cleanReaction = reaction === "like" || reaction === "dislike" ? reaction : "";
  if (!cleanArticleId || !voterId || !cleanReaction) {
    const error = new Error("Missing reaction fields");
    error.statusCode = 400;
    throw error;
  }

  const state = await readNewsState();
  const current = state.reactions[cleanArticleId] || { votes: {} };
  current.votes = current.votes || {};
  if (current.votes[voterId] === cleanReaction) {
    delete current.votes[voterId];
  } else {
    current.votes[voterId] = cleanReaction;
  }
  state.reactions[cleanArticleId] = current;
  const storage = await writeNewsComments(state);
  return {
    comments: state.comments,
    reactions: reactionSummaries(state, name),
    storage,
    articleId: cleanArticleId,
  };
};

module.exports = { readNewsComments, addNewsComment, addNewsReaction };
