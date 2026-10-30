import { useCallback, useState } from "react";
import { fetchWeather } from "../api/openWeatherAPI";

export function useWeather() {
  const [current, setCurrent] = useState(null); //today's weather
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadWeather = useCallback(async (location) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchWeather(location);
      setCurrent(data.current);
      setForecast(data.forecast);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false); //
    }
  }, []);
  return { current, forecast, isLoading, error, loadWeather };
}
