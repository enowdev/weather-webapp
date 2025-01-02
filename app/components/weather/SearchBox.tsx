'use client';

import { useState } from 'react';
import { useWeatherStore } from '../../store/weather';
import type { Coordinates } from '../../types/weather';
import { motion } from 'framer-motion';
import { slideIn } from '../animations/variants';
import { useLanguage } from '@/app/hooks/useLanguage';

export const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { setCoordinates, setError } = useWeatherStore();
  const { t } = useLanguage();

  const searchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();

      if (!data.length) {
        throw new Error(t('search.cityNotFound'));
      }

      const { lat, lon } = data[0];
      setCoordinates({ lat, lon });
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : t('error.general'));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.form
      variants={slideIn}
      initial="initial"
      animate="animate"
      onSubmit={searchCity}
      className="relative mb-6"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search.placeholder')}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSearching}
            className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md
                     disabled:bg-blue-300 disabled:cursor-not-allowed
                     transition-colors duration-200 min-w-[80px] text-center"
          >
            {isSearching ? t('search.searching') : t('search.button')}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}; 