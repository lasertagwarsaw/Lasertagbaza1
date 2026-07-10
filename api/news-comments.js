const { readNewsComments, addNewsComment } = require("./_news-comments");
const { assertHumanSubmission, enforceRateLimit } = require("./_request-guard");

module.exports = async function handler(request, response) {
  if (request.method === "GET") {
    try {
      response.status(200).json({ ok: true, ...(await readNewsComments()) });
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
    enforceRateLimit(request, "comment", 6, 10 * 60 * 1000);
  } catch (error) {
    response.status(error.statusCode || 400).json({ error: error.message });
    return;
  }

  try {
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
