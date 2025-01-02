import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/providers/theme-provider';
import QueryProvider from './providers/query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'Weather App - Cek Cuaca Real-time',
  description: 'Aplikasi cuaca modern dengan informasi cuaca real-time dan prakiraan 5 hari ke depan',
  keywords: 'cuaca, weather, prakiraan cuaca, weather forecast, Indonesia',
  openGraph: {
    title: 'Weather App - Cek Cuaca Real-time',
    description: 'Aplikasi cuaca modern dengan informasi cuaca real-time',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather App - Cek Cuaca Real-time',
    description: 'Aplikasi cuaca modern dengan informasi cuaca real-time',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
} 