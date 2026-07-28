import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jones Tse — Product Engineer',
  description: 'Product systems and interface engineering from Hong Kong.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
