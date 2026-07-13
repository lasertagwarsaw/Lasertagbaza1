const { readSiteSignups } = require("./_site-signups");
const { readPlayerRanking } = require("./_player-ranking");
const signupHandler = require("./telegram-signup");
const { readAdminGames } = require("./_admin-games");

const timeZone = "Europe/Warsaw";
const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&hourly=temperature_2m,weather_code&timezone=Europe%2FWarsaw&forecast_days=8";
const gameDefinitions = {
  wednesday: {
    id: "wednesday",
    weekday: 3,
    time: "18:30",
    title: "Środa 18:30",
    gameLabel: "Środa 18:30 / Counter-Strike 6v6",
    scenario: "Counter-Strike 6v6",
    minimumAge: 14,
    durationMinutes: 120,
    capacity: 12,
  },
  sunday: {
    id: "sunday",
    weekday: 0,
    time: "18:00",
    title: "Niedziela 18:00",
    gameLabel: "Niedziela 18:00 / otwarta gra",
    scenario: "Dla wszystkich chętnych",
    minimumAge: 10,
    durationMinutes: 120,
    capacity: 60,
  },
};

const normalizeNickname = (value) =>
  String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

const getWarsawParts = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  return Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
};

const formatDateKey = (date) =>
  `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;

const getWarsawOffset = (dateKey) => {
  const probe = new Date(`${dateKey}T12:00:00Z`);
  const offsetName = new Intl.DateTimeFormat("en", {
    timeZone,
    timeZoneName: "longOffset",
  }).formatToParts(probe).find((part) => part.type === "timeZoneName")?.value || "GMT+00:00";
  const match = offsetName.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
  if (!match) return "+00:00";
  return `${match[1]}${match[2].padStart(2, "0")}:${match[3] || "00"}`;
};

const getNextGameStart = (game, now = new Date()) => {
  const parts = getWarsawParts(now);
  const localDate = new Date(Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day)));
  const [gameHour, gameMinute] = game.time.split(":").map(Number);
  const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
  let daysUntilGame = (game.weekday - localDate.getUTCDay() + 7) % 7;

  if (daysUntilGame === 0 && currentMinutes >= gameHour * 60 + gameMinute) daysUntilGame = 7;
  localDate.setUTCDate(localDate.getUTCDate() + daysUntilGame);

  const dateKey = formatDateKey(localDate);
  return {
    date: dateKey,
    startsAt: `${dateKey}T${game.time}:00${getWarsawOffset(dateKey)}`,
  };
};

const enrichSignup = (signup, playersByNickname) => {
  const rankedPlayer = playersByNickname.get(normalizeNickname(signup.nickname));
  return {
    id: signup.id,
    game: signup.game,
    nickname: signup.nickname,
    note: signup.note || "",
    createdAt: signup.createdAt,
    playerId: rankedPlayer?.id || null,
    avatar: rankedPlayer?.avatar || null,
    rankingUrl: rankedPlayer ? `https://www.lasertagbaza.pl/#top-punkty` : null,
  };
};

const buildGamesFeed = async () => {
  const [state, ranking, adminGamesState] = await Promise.all([readSiteSignups(), readPlayerRanking(), readAdminGames()]);
  const playersByNickname = new Map(
    ranking.players.map((player) => [normalizeNickname(player.nickname || player.name), player]),
  );
  const signups = state.signups.map((signup) => enrichSignup(signup, playersByNickname));
  const scheduledGames = Object.values(gameDefinitions)
    .map((game) => {
      const schedule = getNextGameStart(game);
      const players = signups.filter((signup) => signup.game === game.id);
      return {
        ...game,
        ...schedule,
        timeZone,
        signupCount: players.length,
        availableSpots: Math.max(0, game.capacity - players.length),
        players,
      };
    });
  const customGames = adminGamesState.games
    .filter((game) => new Date(game.startsAt).getTime() > Date.now())
    .map((game) => {
      const players = signups.filter((signup) => signup.game === game.id);
      return {
        ...game,
        date: game.startsAt.slice(0, 10),
        timeZone,
        minimumAge: 10,
        durationMinutes: 120,
        signupCount: players.length,
        availableSpots: Math.max(0, game.capacity - players.length),
        players,
      };
    });
  const games = [...scheduledGames, ...customGames]
    .sort((left, right) => left.startsAt.localeCompare(right.startsAt));

  return {
    schemaVersion: 1,
    feedId: "baza-open-games-v1",
    updatedAt: new Date().toISOString(),
    cycleStart: state.cycleStart,
    defaultLocale: "pl",
    timeZone,
    webSection: {
      id: "join",
      selector: "[data-games-source='baza-open-games-v1']",
      feedAttribute: "data-games-feed",
      signupEndpointAttribute: "data-game-signup-endpoint",
      gameAttribute: "data-game-signups",
      listAttribute: "data-signup-list",
    },
    signup: {
      endpoint: "https://www.lasertagbaza.pl/api/games-feed",
      method: "POST",
      contentType: "application/json",
      requiredFields: ["game", "gameLabel", "nickname", "phone"],
      optionalFields: ["id", "note", "createdAt", "formStartedAt", "website"],
      allowedGames: [...Object.keys(gameDefinitions), ...customGames.map((game) => game.id)],
    },
    games,
    signups,
  };
};

const sendWeatherFeed = async (response) => {
  try {
    const weatherResponse = await fetch(WEATHER_URL, {
      headers: { Accept: "application/json" },
    });

    if (!weatherResponse.ok) {
      throw new Error(`Weather API responded with ${weatherResponse.status}`);
    }

    response.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=3600");
    response.status(200).json(await weatherResponse.json());
  } catch (error) {
    response.status(502).json({
      error: "Weather forecast is unavailable",
      reason: error.message,
    });
  }
};

module.exports = async function handler(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (["POST", "DELETE"].includes(request.method)) {
    await signupHandler(request, response);
    return;
  }

  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    if (request.query?.service === "weather") {
      await sendWeatherFeed(response);
      return;
    }

    const feed = await buildGamesFeed();
    response.setHeader("Cache-Control", "no-store, max-age=0");
    response.status(200).json(feed);
  } catch (error) {
    response.status(503).json({ error: "Game signup storage unavailable" });
  }
};

module.exports.buildGamesFeed = buildGamesFeed;
module.exports.getNextGameStart = getNextGameStart;
