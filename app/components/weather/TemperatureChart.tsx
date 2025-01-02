'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { ForecastData } from '@/app/types/weather';
import { useTheme } from '../providers/theme-provider';
import { useLanguage } from '@/app/hooks/useLanguage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TemperatureChartProps {
  forecast: ForecastData;
}

export const TemperatureChart = ({ forecast }: TemperatureChartProps) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const textColor = theme === 'dark' ? '#fff' : '#1f2937';

  const data: ChartData<'line'> = {
    labels: forecast.list.slice(0, 8).map((item) => {
      return new Date(item.dt * 1000).toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }),
    datasets: [
      {
        label: t('weather.temperature'),
        data: forecast.list.slice(0, 8).map((item) => item.main.temp),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
      {
        label: t('weather.feelsLike'),
        data: forecast.list.slice(0, 8).map((item) => item.main.feels_like),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: t('weather.temperatureChart'),
        color: textColor,
      },
    },
    scales: {
      y: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="h-[400px] p-4 weather-card">
      <Line data={data} options={options} />
    </div>
  );
}; 