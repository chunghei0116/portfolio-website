import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jones Tse | Developer and DevOps Engineer',
  description: 'Developer and DevOps engineer building reliable products, platforms, and delivery systems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
