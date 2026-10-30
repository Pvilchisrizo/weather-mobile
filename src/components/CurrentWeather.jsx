import { Image, StyleSheet, Text, View } from "react-native";
import { getIconUrl } from "../api/openWeatherAPI";
import { formatTemp, formatWind } from "../utils/tempUnit";
import { colors, radius, spacing } from "../theme";

export default function CurrentWeather({ data, unit }) {
  const { name, sys, main, weather, wind } = data;
  const condition = weather[0];

  const details = [
    { label: "Feels like", value: formatTemp(main.feels_like, unit) },
    { label: "Humidity", value: `${main.humidity}%` },
    { label: "Wind", value: formatWind(wind.speed, unit) },
  ];

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={`${name}: ${formatTemp(main.temp, unit)}, ${
        condition.description
      }`}
    >
      <Text style={styles.city}>
        {name}
        {sys?.country ? `${sys.country}` : ""}
      </Text>

      <View style={styles.tempRow}>
        <Image
          source={{ uri: getIconUrl(condition.icon) }}
          style={styles.icon}
        />
        <Text style={styles.temp}>{formatTemp(main.temp, unit)}</Text>
      </View>

      <Text style={styles.description}>{condition.description}</Text>
      <Text style={styles.range}>
        H {formatTemp(main.temp_max, unit)} · L{" "}
        {formatTemp(main.temp_min, unit)}{" "}
      </Text>

      <View style={styles.details}>
        {details.map((item) => (
          <View key={item.label} style={styles.detail}>
            <Text style={styles.detailValue}>{item.value}</Text>
            <Text style={styles.detailLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  city: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "600",
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 110,
    height: 110,
  },
  temp: {
    color: colors.text,
    fontSize: 84,
    fontWeight: "200",
  },
  description: {
    color: colors.text,
    fontSize: 20,
    textTransform: "capitalize",
  },
  range: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.xs,
  },
  details: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  detail: {
    flex: 1,
    alignItems: "center",
  },
  detailValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
  detailLabel: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 2,
  },
});
