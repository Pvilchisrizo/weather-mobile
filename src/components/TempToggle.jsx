import { Pressable, StyleSheet, Text, View } from "react-native";
import { UNITS } from "../utils/tempUnit";
import { colors, radius } from "../theme";

export default function TempToggle({ unit, onChange }) {
  return (
    <View style={styles.container} accessibilityRole="radiogroip">
      {[UNITS.CELSIUS, UNITS.FAHRENHEIT].map((option) => {
        const isActive = unit === option;
        return (
          <Pressable
            key={option}
            onPress={() => !isActive && onChange(option)}
            style={[styles.option, isActive && styles.active]}
            accessibilityRole="radio"
            accessibilityState={{ check: isActive }}
            accessibilityLabel={
              option === UNITS.CELSIUS ? "Celsius" : "Fahrenheit"
            }
          >
            <Text styles={[styles.label, isActive && styles.activeLabel]}>
              °{option}{" "}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.glass,
    borderRadius: radius.pill,
    padding: 3,
  },
  option: {
    minWidth: 52,
    height: 40,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },

  active: {
    backgroundColor: colors.text, // element with a white background behind the selected option
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  activeLabel: {
    color: "#1d3557", // dark text on a white background
  },
});
