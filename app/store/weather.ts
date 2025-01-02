import { create } from 'zustand';
import { WeatherData, ForecastData, Coordinates } from '../types/weather';

interface WeatherStore {
  weather: WeatherData | null;
  forecast: ForecastData | null;
  coordinates: Coordinates | null;
  isLoading: boolean;
  error: string | null;
  setWeather: (data: WeatherData) => void;
  setForecast: (data: ForecastData) => void;
  setCoordinates: (coords: Coordinates) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  weather: null,
  forecast: null,
  coordinates: null,
  isLoading: false,
  error: null,
  setWeather: (data) => set({ weather: data }),
  setForecast: (data) => set({ forecast: data }),
  setCoordinates: (coords) => set({ coordinates: coords }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
})); 