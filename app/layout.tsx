import './globals.css';
import type { Metadata } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';

const headline = Fraunces({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '600', '700']
});

const body = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Short-Term Crypto Signal Engine',
  description:
    'A 30-second crypto prediction engine with real-time market microstructure signals.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headline.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
