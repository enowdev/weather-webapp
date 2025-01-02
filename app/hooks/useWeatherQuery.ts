import { useQuery } from '@tanstack/react-query';
import type { WeatherData, Coordinates, ForecastData } from '../types/weather';

export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: ['weather', coordinates],
    queryFn: async () => {
      if (!coordinates) throw new Error('No coordinates provided');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      return response.json() as Promise<WeatherData>;
    },
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: ['forecast', coordinates],
    queryFn: async () => {
      if (!coordinates) throw new Error('No coordinates provided');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch forecast data');
      return response.json() as Promise<ForecastData>;
    },
    enabled: !!coordinates,
  });
}; 