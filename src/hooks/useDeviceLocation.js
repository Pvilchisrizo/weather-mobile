import { useCallback, useState } from "react";
import * as Location from "expo-location";

/**
 * Asks for location permission and returns the phone's coordinates.
 * Returns { coords, reason }: coords is null if it failed, and reason explains why.
 */
export function useDeviceLocation() {
  const [isLocating, setIsLocating] = useState(false);

  const getCoords = useCallback(async () => {
    setIsLocating(true);
    try {
      // 1. Ask permission (only shows a popup the first time)
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        return {
          coords: null,
          reason: "Location permission denied. Search for a city instead.",
        };
      }

      // 2. Use a recent saved position (instant), or get a fresh one (takes a second)
      const position =
        (await Location.getLastKnownPositionAsync({
          maxAge: 10 * 60 * 1000,
        })) ??
        (await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }));

      const { latitude, longitude } = position.coords;
      return { coords: { latitude, longitude }, reason: null };
    } catch {
      return {
        coords: null,
        reason: "Could not get your location. Is location turned on?",
      };
    } finally {
      setIsLocating(false);
    }
  }, []);

  return { getCoords, isLocating };
}
