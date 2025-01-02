'use client';

import { create } from 'zustand';

type Language = 'id' | 'en';

interface LanguageStore {
  language: Language;
  translations: Record<string, Record<Language, string>>;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const useLanguage = create<LanguageStore>((set, get) => ({
  language: 'id',
  translations: {
    'weather.title': {
      id: 'Cuaca Hari Ini',
      en: 'Today\'s Weather',
    },
    'weather.feelsLike': {
      id: 'Terasa seperti',
      en: 'Feels like',
    },
    'weather.humidity': {
      id: 'Kelembaban',
      en: 'Humidity',
    },
    'weather.windSpeed': {
      id: 'Kecepatan Angin',
      en: 'Wind Speed',
    },
    'weather.forecast': {
      id: 'Prakiraan 5 Hari Kedepan',
      en: '5-Day Forecast',
    },
    'weather.favorites': {
      id: 'Kota Favorit',
      en: 'Favorite Cities',
    },
    'weather.share': {
      id: 'Bagikan',
      en: 'Share',
    },
    'weather.temperature': {
      id: 'Suhu',
      en: 'Temperature',
    },
    'weather.weather': {
      id: 'Cuaca',
      en: 'Weather',
    },
    'search.placeholder': {
      id: 'Cari kota...',
      en: 'Search city...',
    },
    'search.button': {
      id: 'Cari',
      en: 'Search',
    },
    'search.searching': {
      id: 'Mencari...',
      en: 'Searching...',
    },
    'search.cityNotFound': {
      id: 'Kota tidak ditemukan',
      en: 'City not found',
    },
    'error.general': {
      id: 'Terjadi kesalahan',
      en: 'An error occurred',
    },
    'error.location': {
      id: 'Tidak dapat mengakses lokasi',
      en: 'Cannot access location',
    },
    'error.weather': {
      id: 'Data cuaca tidak tersedia',
      en: 'Weather data not available',
    },
    'weather.overcastClouds': {
      id: 'Berawan',
      en: 'Overcast Clouds',
    },
    'weather.temperatureChart': {
      id: 'Perubahan Suhu 24 Jam Kedepan',
      en: '24-Hour Temperature Change',
    },
    'weather.celsius': {
      id: 'Celcius',
      en: 'Celsius',
    },
    'weather.fahrenheit': {
      id: 'Fahrenheit',
      en: 'Fahrenheit',
    },
    'weather.today': {
      id: 'Hari Ini',
      en: 'Today',
    },
    'weather.loading': {
      id: 'Memuat...',
      en: 'Loading...',
    },
    'weather.noData': {
      id: 'Tidak ada data',
      en: 'No data available',
    },
  },
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => get().translations[key]?.[get().language] || key,
})); 