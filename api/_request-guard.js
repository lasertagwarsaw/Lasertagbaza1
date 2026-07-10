const rateBuckets = globalThis.__bazaRateBuckets || new Map();
globalThis.__bazaRateBuckets = rateBuckets;

const getClientIp = (request) => {
  const forwarded = request.headers?.["x-forwarded-for"];
  const firstForwarded = Array.isArray(forwarded) ? forwarded[0] : String(forwarded || "").split(",")[0];
  return firstForwarded.trim() || request.headers?.["x-real-ip"] || "unknown";
};

const createRequestError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const assertHumanSubmission = (body = {}) => {
  if (String(body.website || "").trim()) {
    throw createRequestError("Invalid submission", 400);
  }

  const startedAt = Number(body.formStartedAt);
  if (startedAt && Date.now() - startedAt < 800) {
    throw createRequestError("Submission was too fast", 400);
  }
};

const enforceRateLimit = (request, scope, limit, windowMs) => {
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const recent = (rateBuckets.get(key) || []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    throw createRequestError("Too many requests", 429);
  }

  recent.push(now);
  rateBuckets.set(key, recent);

  if (rateBuckets.size > 500) {
    for (const [bucketKey, timestamps] of rateBuckets) {
      if (!timestamps.some((timestamp) => now - timestamp < windowMs)) rateBuckets.delete(bucketKey);
    }
  }
};

module.exports = { assertHumanSubmission, enforceRateLimit };
