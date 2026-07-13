const { readNewsComments, addNewsComment, addNewsReaction } = require("./_news-comments");
const { assertHumanSubmission, enforceRateLimit } = require("./_request-guard");

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).end();
    return;
  }

  if (request.method === "GET") {
    try {
      response.status(200).json({ ok: true, ...(await readNewsComments({ voter: request.query?.voter })) });
    } catch (error) {
      response.status(200).json({
        ok: true,
        storage: { ok: false, reason: error.message },
        comments: {},
      });
    }
    return;
  }

  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  } catch (error) {
    response.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  try {
    assertHumanSubmission(body);
    enforceRateLimit(request, body.action === "reaction" ? "reaction" : "comment", body.action === "reaction" ? 40 : 6, 10 * 60 * 1000);
  } catch (error) {
    response.status(error.statusCode || 400).json({ error: error.message });
    return;
  }

  try {
    if (body.action === "reaction") {
      response.status(200).json({
        ok: true,
        ...(await addNewsReaction({
          articleId: body.articleId,
          name: body.name,
          reaction: body.reaction,
        })),
      });
      return;
    }
    response.status(200).json({
      ok: true,
      ...(await addNewsComment({
        articleId: body.articleId,
        name: body.name,
        text: body.text,
        website: body.website,
        createdAt: body.createdAt,
      })),
    });
  } catch (error) {
    response.status(error.statusCode || 500).json({ error: error.message || "Comment error" });
  }
};
