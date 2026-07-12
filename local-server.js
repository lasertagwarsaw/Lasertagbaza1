const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 3000);

const loadEnvLocal = () => {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^['\"]|['\"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
};

const readBody = (request) =>
  new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 3_200_000) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });

const sendJson = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(payload));
};

const callApi = async (request, response, handlerPath) => {
  const rawBody = await readBody(request);
  let parsedBody = rawBody;
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  if ((request.headers["content-type"] || "").includes("application/json")) {
    try {
      parsedBody = rawBody ? JSON.parse(rawBody) : {};
    } catch (error) {
      sendJson(response, 400, { error: "Invalid JSON body" });
      return;
    }
  }

  const handler = require(handlerPath);
  await handler(
    {
      method: request.method,
      headers: request.headers,
      body: parsedBody,
      query: Object.fromEntries(requestUrl.searchParams),
    },
    {
      setHeader(name, value) {
        response.setHeader(name, value);
      },
      writeHead(statusCode, headers) {
        response.writeHead(statusCode, headers);
      },
      end(payload) {
        response.end(payload);
      },
      status(statusCode) {
        return {
          json(payload) {
            sendJson(response, statusCode, payload);
          },
        };
      },
    },
  );
};

const serveStatic = (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.normalize(path.join(root, pathname));
  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
};

loadEnvLocal();

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") {
      response.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      });
      response.end();
      return;
    }

    if (request.url.startsWith("/api/telegram-signup")) {
      await callApi(request, response, path.join(root, "api", "telegram-signup.js"));
      return;
    }

    if (request.url.startsWith("/api/telegram-message")) {
      await callApi(request, response, path.join(root, "api", "telegram-message.js"));
      return;
    }

    if (request.url.startsWith("/api/news-comments")) {
      await callApi(request, response, path.join(root, "api", "news-comments.js"));
      return;
    }

    if (request.url.startsWith("/api/news-feed")) {
      await callApi(request, response, path.join(root, "api", "news-feed.js"));
      return;
    }

    if (request.url.startsWith("/api/news-proposals")) {
      await callApi(request, response, path.join(root, "api", "news-proposals.js"));
      return;
    }

    if (request.url.startsWith("/api/games-feed")) {
      await callApi(request, response, path.join(root, "api", "games-feed.js"));
      return;
    }

    if (request.url.startsWith("/api/ranking-feed")) {
      await callApi(request, response, path.join(root, "api", "ranking-feed.js"));
      return;
    }

    if (request.url.startsWith("/api/weather")) {
      await callApi(request, response, path.join(root, "api", "weather.js"));
      return;
    }

    if (request.url.startsWith("/api/analytics")) {
      await callApi(request, response, path.join(root, "api", "analytics.js"));
      return;
    }

    serveStatic(request, response);
  } catch (error) {
    console.error(error);
    sendJson(response, 500, { error: "Local server error" });
  }
});

server.listen(port, () => {
  console.log(`BAZA site: http://localhost:${port}`);
  console.log("Telegram env:", process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? "configured" : "missing .env.local");
});
