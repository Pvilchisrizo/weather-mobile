const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MIDDAY_HOUR = 12;

function toCityDate(unixSeconds, timezones) {
  return new Date((unixSeconds + timezones) * 1000);
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

export function buildDailyForecast(forecast, maxDays = 5) {
  if (!forecast?.list?.length) return [];

  const offset = forecast.city?.timezone ?? 0;
  const todayKey = dateKey(toCityDate(Date.now() / 1000, offset));
  const days = new Map();

  forecast.list.forEach((entry) => {
    const date = toCityDate(entry.dt, offset);
    const key = dateKey(date);
    const hour = date.getUTCHours();

    if (!days.has(key)) {
      days.set(key, {
        key,
        dayName: key === todayKey ? "Today" : DAY_NAMES[date.getUTCDay()],
        min: entry.main.temp_min,
        max: entry.main.temp_max,
        pop: entry.pop ?? 0,
        representative: entry,
        distanceFromMidday: Math.abs(hour - MIDDAY_HOUR),
      });
      return;
    }
    const day = days.get(key);
    day.min = Math.min(day.min, entry.main.temp_min);
    day.max = Math.max(day.max, entry.main.temp_max);
    day.pop = Math.max(day.pop, entry.pop ?? 0);

    const distance = Math.abs(hour - MIDDAY_HOUR);
    if (distance < day.distanceFromMidday) {
      day.representative = entry;
      day.distanceFromMidday = distance;
    }
  });
  return Array.from(days.values())
    .slice(0, maxDays)
    .map(({ key, dayName, min, max, pop, representative }) => ({
      key,
      dayName,
      min,
      max,
      pop,
      icon: representative.weather[0].icon,
      description: representative.weather[0].description,
    }));
}
