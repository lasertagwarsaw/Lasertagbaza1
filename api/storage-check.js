const { hasKvStorage, readJson, writeJson } = require("./_kv-storage");

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const result = {
    ok: false,
    kvConfigured: hasKvStorage(),
  };

  if (!hasKvStorage()) {
    response.status(200).json({
      ...result,
      reason: "KV_REST_API_URL and KV_REST_API_TOKEN are missing",
    });
    return;
  }

  try {
    const checkedAt = new Date().toISOString();
    await writeJson("baza:storage-check:v1", { checkedAt });
    const saved = await readJson("baza:storage-check:v1", null);

    response.status(200).json({
      ...result,
      ok: saved?.checkedAt === checkedAt,
      checkedAt: saved?.checkedAt || null,
    });
  } catch (error) {
    response.status(200).json({
      ...result,
      reason: error.message,
    });
  }
};
