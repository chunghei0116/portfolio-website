import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jones Tse — Creative Technologist & Full-Stack Architect',
  description: 'Clean, minimalist, and playful portfolio featuring interactive 3D WebGL experiences, clean React architectures, and high-performance web engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} dark scroll-smooth`}>
      <body className="bg-[#09090b] text-[#fafafa] selection:bg-[#10b981]/30 selection:text-[#34d399] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

