import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jones Tse | Mobile Developer & DevOps Engineer',
  description:
    'Hong Kong mobile developer and DevOps engineer building refined applications, dependable delivery systems, and resilient cloud infrastructure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
