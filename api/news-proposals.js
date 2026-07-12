const { readPlayerProfiles } = require("./_player-profiles");
const { enforceRateLimit } = require("./_request-guard");
const { setPointAward } = require("./_points-awards");
const { deleteNewsProposal, normalizeProposal, readNewsProposals, upsertNewsProposal } = require("./_news-proposals");

const adminPassword = process.env.BAZA_ADMIN_PASSWORD || "Ruslan2026";
const normalizeName = (value) => String(value || "").trim().toLowerCase();
const makeId = () => `proposal-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const isAdminRequest = (request, body = {}) =>
  String(body.adminPassword || request.headers?.["x-baza-admin"] || "") === adminPassword;

const setCorsHeaders = (response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-BAZA-Admin");
  response.setHeader("Cache-Control", "no-store");
};

const registeredPlayerMatches = async (author, playerProof) => {
  const profiles = await readPlayerProfiles();
  return Object.values(profiles.profiles || {}).some(
    (profile) =>
      normalizeName(profile.nickname) === normalizeName(author) &&
      Boolean(profile.passwordHash) &&
      String(profile.passwordHash) === String(playerProof || ""),
  );
};

module.exports = async function handler(request, response) {
  setCorsHeaders(response);
  if (request.method === "OPTIONS") {
    response.status(204).json({});
    return;
  }

  if (request.method === "GET") {
    const admin = isAdminRequest(request);
    const state = await readNewsProposals({ includeMedia: true });
    response.status(200).json({
      ok: true,
      proposals: admin ? state.proposals : state.proposals.filter((item) => item.status === "published"),
      updatedAt: state.updatedAt,
    });
    return;
  }

  if (request.method !== "POST" && request.method !== "DELETE") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = request.body || {};
  const action = request.method === "DELETE" ? "delete" : String(body.action || "create");

  if (action === "create") {
    try {
      enforceRateLimit(request, "news-proposal", 5, 60 * 60 * 1000);
    } catch (error) {
      response.status(error.statusCode || 429).json({ error: error.message });
      return;
    }
    const author = String(body.author || "").trim();
    if (!(await registeredPlayerMatches(author, body.playerProof))) {
      response.status(403).json({ error: "Registered player account required" });
      return;
    }
    const proposal = normalizeProposal({
      id: makeId(),
      title: body.title,
      body: body.body,
      author,
      media: body.media,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    if (!proposal.title || !proposal.body || (body.media && !proposal.media)) {
      response.status(400).json({ error: "Invalid news proposal or media" });
      return;
    }
    await upsertNewsProposal(proposal);
    response.status(201).json({ ok: true, proposal });
    return;
  }

  if (!isAdminRequest(request, body)) {
    response.status(403).json({ error: "Admin access required" });
    return;
  }

  const state = await readNewsProposals({ includeMedia: true });
  const current = state.proposals.find((item) => item.id === String(body.id || ""));
  if (!current) {
    response.status(404).json({ error: "Proposal not found" });
    return;
  }

  if (action === "delete") {
    await deleteNewsProposal(current.id);
    response.status(200).json({ ok: true, deleted: current.id });
    return;
  }

  const proposal = normalizeProposal({
    ...current,
    title: body.title || current.title,
    body: body.body || current.body,
    media: current.media,
    updatedAt: new Date().toISOString(),
    status: action === "approve" ? "published" : current.status,
    publishedAt: action === "approve" ? current.publishedAt || new Date().toISOString() : current.publishedAt,
    approvedBy: action === "approve" ? "Ruslan" : current.approvedBy,
  });

  let ranking = null;
  if (action === "approve") {
    const award = await setPointAward({
      eventId: `news:${proposal.id}`,
      nickname: proposal.author,
      points: 30,
      active: true,
      reason: "approved player news",
    });
    ranking = award.ranking;
    proposal.rewardedAt = current.rewardedAt || new Date().toISOString();
  }

  await upsertNewsProposal(proposal);
  response.status(200).json({ ok: true, proposal, ranking });
};
