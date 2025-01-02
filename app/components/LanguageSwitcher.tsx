'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
      className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full
               hover:bg-blue-600 transition-colors duration-200 shadow-lg"
    >
      {language === 'id' ? '🇬🇧 EN' : '🇮🇩 ID'}
    </motion.button>
  );
}; 