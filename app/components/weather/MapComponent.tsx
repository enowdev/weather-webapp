'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { WeatherData } from '@/app/types/weather';
import { useLanguage } from '@/app/hooks/useLanguage';

const createCustomIcon = () => {
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24" height="24">
      <path fill="#ef4444" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker-icon',
    iconSize: [24, 36],
    iconAnchor: [12, 36],
    popupAnchor: [1, -34],
  });
};

interface MapComponentProps {
  weather: WeatherData;
  coordinates: { lat: number; lon: number };
}

const MapComponent = ({ weather, coordinates }: MapComponentProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && coordinates) {
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView([coordinates.lat, coordinates.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapRef.current);
      } else {
        mapRef.current.setView([coordinates.lat, coordinates.lon]);
      }

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = L.marker([coordinates.lat, coordinates.lon], {
        icon: createCustomIcon()
      })
        .addTo(mapRef.current)
        .bindPopup(
          `<b>${weather.name}</b><br>
           ${t('weather.temperature')}: ${Math.round(weather.main.temp)}°C<br>
           ${t('weather.weather')}: ${weather.weather[0].description}`
        )
        .openPopup();

      return () => {
        if (markerRef.current) {
          markerRef.current.remove();
        }
      };
    }
  }, [coordinates, weather, t]);

  return (
    <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div id="map" className="h-full w-full" />
      <style jsx global>{`
        .custom-marker-icon {
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MapComponent; 