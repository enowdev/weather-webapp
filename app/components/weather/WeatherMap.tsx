'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { WeatherData } from '@/app/types/weather';
import { useLanguage } from '@/app/hooks/useLanguage';

const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
      <p className="text-gray-500 dark:text-gray-400">Loading map...</p>
    </div>
  ),
});

interface WeatherMapProps {
  weather: WeatherData;
  coordinates: { lat: number; lon: number };
}

export const WeatherMap = ({ weather, coordinates }: WeatherMapProps) => {
  return <MapComponent weather={weather} coordinates={coordinates} />;
}; 