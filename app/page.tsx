'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from './components/animations/variants';
import { WeatherCard } from './components/weather/WeatherCard';
import { SearchBox } from './components/weather/SearchBox';
import { ForecastCard } from './components/weather/ForecastCard';
import { FavoriteCities } from './components/weather/FavoriteCities';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './hooks/useLanguage';

export default function Home() {
  const { t } = useLanguage();

  return (
    <motion.main
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          {t('weather.title')}
        </motion.h1>
        <SearchBox />
        <WeatherCard />
        <ForecastCard />
        <FavoriteCities />
        <LanguageSwitcher />
      </div>
    </motion.main>
  );
} 