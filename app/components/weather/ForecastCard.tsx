'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../animations/variants';
import { useForecastQuery } from '../../hooks/useWeatherQuery';
import { useWeatherStore } from '../../store/weather';
import { TemperatureChart } from './TemperatureChart';
import { useLanguage } from '../../hooks/useLanguage';

export const ForecastCard = () => {
  const { coordinates } = useWeatherStore();
  const { data: forecast, isError, error, isLoading } = useForecastQuery(coordinates);
  const { t, language } = useLanguage();

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-8 text-red-600 dark:text-red-400">
        {error instanceof Error ? error.message : t('error.general')}
      </div>
    );
  }

  if (!forecast?.list || forecast.list.length === 0) {
    return (
      <div className="mt-8 text-gray-600 dark:text-gray-400">
        {t('error.weather')}
      </div>
    );
  }

  // Group forecast by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {} as Record<string, typeof forecast.list[0]>);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mt-8 space-y-6"
    >
      <motion.h2
        variants={fadeIn}
        className="text-xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        {t('weather.forecast')}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(dailyForecasts).slice(1, 6).map(([date, data], index) => (
          <motion.div
            key={date}
            variants={fadeIn}
            custom={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md
                     hover:shadow-lg transition-shadow duration-200"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {new Date(date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
              })}
            </p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(data.main.temp)}°C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {data.weather[0].description}
                </p>
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className="w-16 h-16"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 