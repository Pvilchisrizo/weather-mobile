import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import SearchBar from "./src/components/SearchBar";
import StatusMessage from "./src/components/StatusMessage";
import CurrentWeather from "./src/components/CurrentWeather";
import Forecast from "./src/components/Forecast";
import TempToggle from "./src/components/TempToggle";
import { useWeather } from "./src/hooks/useWeather";
import { useDeviceLocation } from "./src/hooks/useDeviceLocation";
import { buildDailyForecast } from "./src/utils/weekForecast";
import { UNITS } from "./src/utils/tempUnit";
import { storage } from "./src/services/storage";
import { colors, spacing } from "./src/theme";

const DEFAULT_CITY = "Vancouver";

export default function App() {
  const { current, forecast, isLoading, error, loadWeather } = useWeather();
  const { getCoords, isLocating } = useDeviceLocation();
  const [unit, setUnit] = useState(UNITS.CELSIUS);
  const [notice, setNotice] = useState("");

  const dailyForecast = useMemo(() => buildDailyForecast(forecast), [forecast]);

  const loadFromLocation = useCallback(
    async (fallbackCity) => {
      const { coords, reason } = await getCoords();
      if (coords) {
        setNotice("");
        const data = await loadWeather({ coords });
        if (data) storage.setLastCity(data.current.name);
        return;
      }
      setNotice(reason);
      if (fallbackCity) loadWeather({ city: fallbackCity });
    },
    [getCoords, loadWeather]
  );

  useEffect(() => {
    const start = async () => {
      const [savedUnit, savedCity] = await Promise.all([
        storage.getUnit(),
        storage.getLastCity(),
      ]);
      if (savedUnit) setUnit(savedUnit);
      loadFromLocation(savedCity || DEFAULT_CITY);
      ({ city: savedCity || DEFAULT_CITY });
    };

    start();
  }, [loadFromLocation]);

  const handleSearch = async (city) => {
    setNotice("");
    const data = await loadWeather({ city });
    if (data) storage.setLastCity(data.current.name);
  };
  const handleLocate = () => {
    loadFromLocation(null);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    storage.setUnit(newUnit);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.appTitle}>Weather Now</Text>
            <TempToggle unit={unit} onChange={handleUnitChange} />
          </View>
          <SearchBar
            onSearch={handleSearch}
            onLocate={handleLocate}
            isLocating={isLocating}
          />
          {!!notice && <Text style={styles.notice}>{notice}</Text>}
          <StatusMessage isLoading={isLoading} error={error} />
          {current && <CurrentWeather data={current} unit={unit} />}
          <Forecast days={dailyForecast} unit={unit} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  appTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
  },
  notice: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
  },
});
