const { readNewsComments, addNewsComment } = require("./_news-comments");

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
    response.status(200).json({
      ok: true,
      ...(await addNewsComment({
        articleId: body.articleId,
        name: body.name,
        text: body.text,
        createdAt: body.createdAt,
      })),
    });
  } catch (error) {
    response.status(error.statusCode || 500).json({ error: error.message || "Comment error" });
  }
};
