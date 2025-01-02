'use client';

import { useState, useEffect } from 'react';

interface FavoriteCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoritesCities');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addToFavorites = (city: FavoriteCity) => {
    const newFavorites = [...favorites, city];
    setFavorites(newFavorites);
    localStorage.setItem('favoritesCities', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (cityName: string) => {
    const newFavorites = favorites.filter((city) => city.name !== cityName);
    setFavorites(newFavorites);
    localStorage.setItem('favoritesCities', JSON.stringify(newFavorites));
  };

  const isFavorite = (cityName: string) => {
    return favorites.some((city) => city.name === cityName);
  };

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
}; 