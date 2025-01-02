'use client';

import { useState, useEffect } from 'react';
import { useWeatherStore } from '../store/weather';
import type { Coordinates } from '../types/weather';

export const useGeolocation = () => {
  const [error, setError] = useState<string | null>(null);
  const { setCoordinates, setError: setStoreError } = useWeatherStore();

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung oleh browser Anda');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setCoordinates(coords);
        setError(null);
        setStoreError(null);
      },
      (error) => {
        setError('Tidak dapat mengakses lokasi Anda');
        setStoreError('Tidak dapat mengakses lokasi Anda');
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { error, getLocation };
}; 