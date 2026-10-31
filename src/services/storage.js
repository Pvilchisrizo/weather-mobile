import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  UNIT: "@weather/unit",
  LAST_CITY: "@weather/lastCity",
  ALERTS_ENABLED: "@weather/alertsEnabled", // used in Step 7
  LAST_RAIN_ALERT: "@weather/lastRainAlert", // used in Step 7
};

async function getItem(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, String(value)); // AsyncStorage only stores strings
  } catch {
    // ignore: preferences are a convenience, not critical
  }
}

export const storage = {
  getUnit: () => getItem(KEYS.UNIT),
  setUnit: (unit) => setItem(KEYS.UNIT, unit),

  getLastCity: () => getItem(KEYS.LAST_CITY),
  setLastCity: (city) => setItem(KEYS.LAST_CITY, city),

  getAlertsEnabled: async () => (await getItem(KEYS.ALERTS_ENABLED)) === "true",
  setAlertsEnabled: (enabled) => setItem(KEYS.ALERTS_ENABLED, enabled),

  getLastRainAlert: () => getItem(KEYS.LAST_RAIN_ALERT),
  setLastRainAlert: (value) => setItem(KEYS.LAST_RAIN_ALERT, value),
};
