const fs = require("node:fs");
const path = require("node:path");
const { hasKvStorage, kvRequest, readJson, writeJson } = require("./_kv-storage");

const dataDir = path.join(__dirname, "..", "data");
const proposalsPath = path.join(dataDir, "news-proposals.json");
const proposalsStorageKey = "baza:news-proposals:v1";
const mediaStorageKey = (id) => `baza:news-proposal-media:${id}:v1`;
const MAX_PROPOSALS = 60;
const MAX_MEDIA_DATA_LENGTH = 2_200_000;

const cleanText = (value, maxLength = 240) =>
  String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);

const cleanBody = (value) => String(value || "").trim().replace(/\r\n/g, "\n").slice(0, 3000);

const normalizeMedia = (media) => {
  if (!media || typeof media !== "object") return null;
  const type = media.type === "video" ? "video" : media.type === "image" ? "image" : "";
  const mime = cleanText(media.mime, 60).toLowerCase();
  const data = String(media.data || "");
  const duration = Math.max(0, Number(media.duration || 0));
  const imagePattern = /^data:image\/(?:jpeg|jpg|png|webp);base64,[a-z0-9+/=]+$/i;
  const videoPattern = /^data:video\/(?:mp4|webm|quicktime);base64,[a-z0-9+/=]+$/i;
  const validData = !data || (data.length <= MAX_MEDIA_DATA_LENGTH && (type === "image" ? imagePattern.test(data) : videoPattern.test(data)));
  if (!type || !validData || (type === "video" && (!duration || duration > 15.5))) return null;
  return {
    type,
    mime,
    fileName: cleanText(media.fileName, 120),
    duration: type === "video" ? Math.round(duration * 10) / 10 : 0,
    data,
    hasData: Boolean(data || media.hasData),
  };
};

const normalizeProposal = (proposal) => ({
  id: cleanText(proposal?.id, 100),
  title: cleanText(proposal?.title, 80),
  body: cleanBody(proposal?.body),
  author: cleanText(proposal?.author, 40),
  status: proposal?.status === "published" ? "published" : "pending",
  media: normalizeMedia(proposal?.media),
  createdAt: proposal?.createdAt || new Date().toISOString(),
  updatedAt: proposal?.updatedAt || new Date().toISOString(),
  publishedAt: proposal?.publishedAt || "",
  approvedBy: cleanText(proposal?.approvedBy, 40),
  rewardedAt: proposal?.rewardedAt || "",
});

const emptyState = () => ({ schemaVersion: 1, proposals: [], updatedAt: new Date().toISOString() });

const normalizeState = (state) => ({
  schemaVersion: 1,
  proposals: (Array.isArray(state?.proposals) ? state.proposals : [])
    .map(normalizeProposal)
    .filter((item) => item.id && item.title && item.body && item.author)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, MAX_PROPOSALS),
  updatedAt: new Date().toISOString(),
});

const readLocalState = () => {
  try {
    return normalizeState(JSON.parse(fs.readFileSync(proposalsPath, "utf8")));
  } catch {
    return emptyState();
  }
};

const writeLocalState = (state) => {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(proposalsPath, `${JSON.stringify(normalizeState(state), null, 2)}\n`);
};

const proposalMetadata = (proposal) => ({
  ...proposal,
  media: proposal.media ? { ...proposal.media, data: "", hasData: Boolean(proposal.media.hasData || proposal.media.data) } : null,
});

const readNewsProposals = async ({ includeMedia = true } = {}) => {
  if (!hasKvStorage()) return readLocalState();
  let state;
  try {
    state = normalizeState(await readJson(proposalsStorageKey, emptyState()));
  } catch {
    return readLocalState();
  }
  if (!includeMedia) return state;

  state.proposals = await Promise.all(
    state.proposals.map(async (proposal) => {
      if (!proposal.media?.hasData) return proposal;
      try {
        const media = normalizeMedia(await readJson(mediaStorageKey(proposal.id), null));
        return { ...proposal, media: media || proposal.media };
      } catch {
        return proposal;
      }
    }),
  );
  return state;
};

const upsertNewsProposal = async (incoming) => {
  const proposal = normalizeProposal(incoming);
  if (!proposal.id || !proposal.title || !proposal.body || !proposal.author) throw new Error("Invalid news proposal");

  if (!hasKvStorage()) {
    const state = readLocalState();
    const index = state.proposals.findIndex((item) => item.id === proposal.id);
    if (index >= 0) state.proposals[index] = proposal;
    else state.proposals.unshift(proposal);
    writeLocalState(state);
    return proposal;
  }

  const state = await readNewsProposals({ includeMedia: false });
  const metadata = proposalMetadata(proposal);
  const index = state.proposals.findIndex((item) => item.id === proposal.id);
  if (index >= 0) state.proposals[index] = metadata;
  else state.proposals.unshift(metadata);
  state.proposals = state.proposals.slice(0, MAX_PROPOSALS);
  await writeJson(proposalsStorageKey, normalizeState(state));
  if (proposal.media?.data) await writeJson(mediaStorageKey(proposal.id), proposal.media);
  return proposal;
};

const deleteNewsProposal = async (id) => {
  const cleanId = cleanText(id, 100);
  if (!cleanId) return;
  if (!hasKvStorage()) {
    const state = readLocalState();
    state.proposals = state.proposals.filter((item) => item.id !== cleanId);
    writeLocalState(state);
    return;
  }
  const state = await readNewsProposals({ includeMedia: false });
  state.proposals = state.proposals.filter((item) => item.id !== cleanId);
  await writeJson(proposalsStorageKey, normalizeState(state));
  await kvRequest("DEL", mediaStorageKey(cleanId)).catch(() => {});
};

module.exports = { deleteNewsProposal, normalizeProposal, readNewsProposals, upsertNewsProposal };
