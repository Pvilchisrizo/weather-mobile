import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../theme";

export default function StatusMessage({ isLoading, error }) {
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.text} />
        <Text style={styles.loadingText}>Loading weather...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={StyleSheet.error} accessibilityRole="alert">
        <Text style={StyleSheet.errorText}>⚠️{error}</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  loading: {
    alignItems: "center",
    paaddingVertical: spacing.xl,
  },
  loadingText: {
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontSize: 15,
  },
  error: {
    margingTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.errorBg,
  },
  errorText: {
    color: colors.error,
    fontSize: 15,
    lineHeight: 21,
  },
});
