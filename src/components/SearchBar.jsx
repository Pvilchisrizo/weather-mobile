import { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, radius, spacing } from "../theme";

export default function SearchBar({ onSearch, onLocate, isLocating }) {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    const city = query.trim();
    if (!city) return;
    Keyboard.dismiss();
    onSearch(city);
    setQuery("");
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        placeholder="Search a city..."
        placeholderTextColor="#6b7c8f"
        returnKeyType="search"
        autoCapitalized="words"
        autoCorrect={false}
        accessibilityLabel="City name"
      />
      <Pressable
        onPress={handleSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Search"
      >
        <Text style={styles.icon}>🔍</Text>
      </Pressable>
      <Pressable
        onPress={onLocate}
        disabled={isLocating}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Use my current location"
      >
        {isLocating ? (
          <ActivityIndicator color="#1d3557" />
        ) : (
          <Text style={styles.icon}>📍</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.glassBorder,
    color: "#1d3557",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    fontSize: 17,
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: "#ffb703",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 22,
  },
});
