import { StyleSheet, Text, View } from "react-native";
import ForecastCard from "./ForecastCard";
import { colors, radius, redius, spacing } from "../theme";

export default function Forecast({ days, unit }) {
  if (!days.length) return null;

  return (
    <View style={StyleSheet.panel}>
      <Text style={StyleSheet.heading}>📅{days.length}-Day Forecast </Text>
      {days.map((day, index) => (
        <ForecastCard
          key={day.key}
          day={day}
          unit={unit}
          isLast={index === days.length - 1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingVertical: spacing.sm,
  },
  heading: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
