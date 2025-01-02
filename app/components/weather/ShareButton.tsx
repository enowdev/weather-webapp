'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { WeatherData } from '@/app/types/weather';

interface ShareButtonProps {
  weather: WeatherData;
}

export const ShareButton = ({ weather }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const shareText = `Cuaca di ${weather.name}, ${weather.sys.country}:
🌡️ ${Math.round(weather.main.temp)}°C
💨 ${weather.wind.speed} m/s
💧 ${weather.main.humidity}%
${weather.weather[0].description}

Cek cuaca di daerahmu di Weather App!`;

  const shareData = {
    title: 'Weather App',
    text: shareText,
    url: window.location.href,
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('Teks telah disalin ke clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className="mt-4 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 
                 text-white rounded-lg transition-colors duration-200
                 disabled:bg-blue-300 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
    >
      {isSharing ? (
        'Membagikan...'
      ) : (
        <>
          <span>Bagikan</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </>
      )}
    </motion.button>
  );
}; 