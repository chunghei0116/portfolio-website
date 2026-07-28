import type { Metadata } from 'next';
import { Bricolage_Grotesque, Source_Serif_4 } from 'next/font/google';
import './globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const body = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' });

export const metadata: Metadata = {
  title: 'Your Name — Developer Portfolio',
  description: 'A portfolio of thoughtful digital work.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>;
}
