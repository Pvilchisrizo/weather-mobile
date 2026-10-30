import { useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import SearchBar from "./src/components/SearchBar";
import StatusMessage from "./src/components/StatusMessage";
import CurrentWeather from "./src/components/CurrentWeather";
import { useWeather } from "./src/hooks/useWeather";
import { colors, spacing } from "./src/theme";

const DEFAULT_CITY = "Vancouver";

export default function App() {
  const { current, isLoading, error, loadWeather } = useWeather();

  const unit = "C";

  useEffect(() => {
    loadWeather({ city: DEFAULT_CITY });
  }, [loadWeather]);

  const handleSearch = (city) => {
    loadWeather({ city });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.appTitle}>Weather Now</Text>
          <SearchBar onSearch={handleSearch}></SearchBar>
          <StatusMessage isLoading={isLoading} error={error} />
          {current && <CurrentWeather data={current} unit={unit} />}
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
  },
  appTitle: {
    fontSize: 22,
    color: colors.text,
    fontWeight: "700",
    marginBottom: spacing.md,
  },
});
