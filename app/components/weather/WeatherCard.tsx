'use client';

import { motion } from 'framer-motion';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useTheme } from '../providers/theme-provider';
import { weatherCardVariants } from '../animations/variants';
import { useWeatherQuery, useForecastQuery } from '../../hooks/useWeatherQuery';
import { useWeatherStore } from '../../store/weather';
import { useFavorites } from '@/app/hooks/useFavorites';
import { ShareButton } from './ShareButton';
import { useWeatherNotification } from '@/app/hooks/useWeatherNotification';
import { WeatherMap } from './WeatherMap';
import { UnitConverter } from './UnitConverter';
import { useLanguage } from '@/app/hooks/useLanguage';
import { TemperatureChart } from './TemperatureChart';

export const WeatherCard = () => {
  const { coordinates } = useWeatherStore();
  const { error: locationError } = useGeolocation();
  const { theme, toggleTheme } = useTheme();
  const { data: weather, isLoading, error } = useWeatherQuery(coordinates);
  const { data: forecast } = useForecastQuery(coordinates);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { t } = useLanguage();

  useWeatherNotification(weather);

  if (locationError || error) {
    return (
      <motion.div
        variants={weatherCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 bg-red-50 dark:bg-red-900 rounded-lg"
      >
        <p className="text-red-600 dark:text-red-200">
          {locationError || (error instanceof Error ? error.message : t('error.general'))}
        </p>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        variants={weatherCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="animate-pulse p-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </motion.div>
    );
  }

  if (!weather?.sys || !weather?.weather?.[0]) {
    return (
      <motion.div
        variants={weatherCardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <p className="text-gray-600 dark:text-gray-400">
          {t('error.weather')}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={weatherCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="p-8 weather-card shadow-lg transition-all space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isFavorite(weather.name)) {
                removeFromFavorites(weather.name);
              } else {
                addToFavorites({
                  name: weather.name,
                  country: weather.sys.country,
                  lat: coordinates!.lat,
                  lon: coordinates!.lon,
                });
              }
            }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isFavorite(weather.name) ? '❤️' : '🤍'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <UnitConverter celsius={weather.main.temp} />
          <p className="text-gray-600 dark:text-gray-300">
            {t('weather.feelsLike')} {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
        <div className="text-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="mx-auto"
          />
          <p className="text-gray-600 dark:text-gray-300 capitalize">
            {weather.weather[0].description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300">{t('weather.humidity')}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {weather.main.humidity}%
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
          <p className="text-gray-500 dark:text-gray-300">{t('weather.windSpeed')}</p>
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {weather.wind.speed} m/s
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeatherMap weather={weather} coordinates={coordinates!} />
        {forecast && <TemperatureChart forecast={forecast} />}
      </div>

      <ShareButton weather={weather} />
    </motion.div>
  );
}; 