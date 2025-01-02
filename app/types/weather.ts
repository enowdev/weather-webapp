export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure?: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg?: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    coord?: {
      lat: number;
      lon: number;
    };
  };
}

export interface WeatherStore {
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