import type { Metadata } from 'next';
import { Bodoni_Moda } from 'next/font/google';
import './globals.css';

const hermesDisplay = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-hermes-display',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Jones Tse | Mobile Developer & DevOps Engineer',
  description:
    'Hong Kong mobile developer and DevOps engineer building refined applications, dependable delivery systems, and resilient cloud infrastructure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={hermesDisplay.variable}>{children}</body>
    </html>
  );
}
