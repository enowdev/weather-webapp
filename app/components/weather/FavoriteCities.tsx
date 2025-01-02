'use client';

import { motion } from 'framer-motion';
import { useFavorites } from '@/app/hooks/useFavorites';
import { useWeatherStore } from '@/app/store/weather';

export const FavoriteCities = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { setCoordinates } = useWeatherStore();

  const handleCityClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
  };

  if (favorites.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Kota Favorit
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {favorites.map((city) => (
          <motion.div
            key={`${city.name}-${city.country}`}
            whileHover={{ scale: 1.02 }}
            className="weather-card p-4 cursor-pointer"
            onClick={() => handleCityClick(city.lat, city.lon)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {city.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {city.country}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromFavorites(city.name);
                }}
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                ❌
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 