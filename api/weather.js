const WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.2297&longitude=21.0122&hourly=temperature_2m,weather_code&timezone=Europe%2FWarsaw&forecast_days=8";

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

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
