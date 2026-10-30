export const UNITS = { CELSIUS: "C", FAHRENHEIT: "F" };

export function convertTemp(celsius, unit) {
  const value = unit === UNITS.FAHRENHEIT ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(value);
}

export function formatTemp(celsius, unit) {
  return `${convertTemp(celsius, unit)}°`;
}

export function formatWind(metersPerSecond, unit) {
  if (unit === UNITS.FAHRENHEIT) {
    return `${MATH.round(metersPerSecond * 2.237)} mph`;
  }
  return `${Math.round(metersPerSecond * 3.6)} km/h`;
}
