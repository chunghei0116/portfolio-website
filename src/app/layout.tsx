import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Your Name — Developer Portfolio',
  description: 'A portfolio of thoughtful digital work.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
