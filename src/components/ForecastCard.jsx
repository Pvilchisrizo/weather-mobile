import { Image, StyleSheet, Text, View } from "react-native";
import { getIconUrl } from "../api/openWeatherAPI";
import { formatTemp } from "../utils/tempUnit";
import { colors, spacing } from "../theme";

export default function ForecastCard({ day, unit, isLast }) {
  const rainChance = Math.round(day.pop * 100);

  return (
    <View
      style={[styles.row, !isLast && styles.divider]}
      accessible
      accessibilityLabel={`${day.dayName}: ${day.description}, low ${formatTemp(
        day.min,
        unit
      )}, high ${formatTemp(day.max, unit)}`}
    >
      <Text style={styles.day}>{day.dayName}</Text>
      <View styles={styles.iconBox}>
        <Image source={{ uri: getIconUrl(day.icon) }} style={styles.icon} />
        {rainChance >= 20 && <Text style={styles.pop}>{rainChance}%</Text>}
      </View>

      <Text style={styles.min}>{formatTemp(day.min, unit)}</Text>
      <Text style={styles.max}>{formatTemp(day.max, unit)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 56,
    paddingHorizontal: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.glassBorder,
  },
  day: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: "500",
  },
  iconBox: {
    width: 90,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 44,
    height: 44,
  },
  pop: {
    color: "#bfe3ff",
    fontSize: 1,
    fontWeight: "600",
  },
  min: {
    width: 48,
    textAlign: "right",
    color: colors.textMuted,
    fontSize: 17,
  },
  max: {
    width: 48,
    textAlign: "right",
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
});
