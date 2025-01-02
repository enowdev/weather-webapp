'use client';

import { useEffect } from 'react';
import type { WeatherData } from '../types/weather';

const isExtremeWeather = (weather: WeatherData) => {
  const temp = weather.main.temp;
  const windSpeed = weather.wind.speed;
  const humidity = weather.main.humidity;

  return (
    temp >= 35 ||
    temp <= 10 ||
    windSpeed >= 10 ||
    humidity >= 85
  );
};

export const useWeatherNotification = (weather: WeatherData | null | undefined) => {
  useEffect(() => {
    const checkAndNotify = async () => {
      if (!weather) return;

      if (isExtremeWeather(weather)) {
        if (!('Notification' in window)) {
          console.log('Browser tidak mendukung notifikasi');
          return;
        }

        if (Notification.permission === 'granted') {
          new Notification('Peringatan Cuaca', {
            body: `Kondisi cuaca ekstrem di ${weather.name}:
${weather.main.temp >= 35 ? '🌡️ Suhu tinggi' : ''}
${weather.main.temp <= 10 ? '❄️ Suhu rendah' : ''}
${weather.wind.speed >= 10 ? '💨 Angin kencang' : ''}
${weather.main.humidity >= 85 ? '💧 Kelembaban tinggi' : ''}`,
            icon: '/weather-icon.png'
          });
        } else if (Notification.permission !== 'denied') {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            checkAndNotify();
          }
        }
      }
    };

    checkAndNotify();
  }, [weather]);
}; 