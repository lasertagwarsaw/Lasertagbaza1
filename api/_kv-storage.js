const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const hasKvStorage = () => Boolean(kvUrl && kvToken);

const kvRequest = async (...command) => {
  const response = await fetch(kvUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    throw new Error(data.error || `KV command ${command[0]} failed`);
  }

  return data.result;
};

const readJson = async (key, fallback) => {
  const value = await kvRequest("GET", key);
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string") return JSON.parse(value);
  return value;
};

const writeJson = async (key, value) => {
  await kvRequest("SET", key, JSON.stringify(value));
};

module.exports = { hasKvStorage, kvRequest, readJson, writeJson };
