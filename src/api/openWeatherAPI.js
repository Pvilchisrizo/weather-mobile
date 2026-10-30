const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

//Search part of the URL.

function buildLocationQuery(location) {
  if (location.coords) {
    const { latitude, longitude } = location.coords;
    return `lat=${latitude}&lon${longitude}`;
  }
  return `q=${encodeURIComponent(location.city.trim())}`;
}

async function request(endpoint, location) {
  if (!API_KEY) {
    throw new Error("Missing API key.");
  }
  const url = `${BASE_URL}/${endpoint}?${buildLocationQuery(
    location
  )}&units=metric&appid=${API_KEY}`;
  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error("City not found. check the spelling again.");
  }
  if (response.status === 401) {
    throw new Error("Invalid API key.");
  }
  if (!response.ok) {
    throw new Error("Weather service is unavailable. Please try again later.");
  }
  return response.json();
}

//current weather and 5-day forecast
export async function fetchWeather(location) {
  const [current, forecast] = await Promise.all([
    request("weather", location),
    request("forecast", location),
  ]);
  return { current, forecast };
}

export function getIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}
