import { useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, MIN_TOUCH, radius, spacing } from "../theme";

export default function SearchBar({ onSearch }) {
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
        style={StyleSheet.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        placeholder="Search a city..."
        placeholderTextColor={colors.textMuted}
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
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: MIN_TOUCH,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: colors.glass,
    borderColor: colors.glassBorder,
    color: colors.text,
    fontSize: 16,
  },
  button: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: radius.pill,
    backgroundColor: colors.glassStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  icon: {
    fontSize: 20,
  },
});
