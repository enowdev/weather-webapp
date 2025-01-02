'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface UnitConverterProps {
  celsius: number;
}

export const UnitConverter = ({ celsius }: UnitConverterProps) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const temperature = unit === 'C' ? celsius : (celsius * 9) / 5 + 32;

  return (
    <div className="flex items-center gap-2">
      <p className="text-4xl font-bold text-gray-900 dark:text-white">
        {Math.round(temperature)}°{unit}
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600
                 transition-colors duration-200"
      >
        {unit === 'C' ? '°F' : '°C'}
      </motion.button>
    </div>
  );
}; 