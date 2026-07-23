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
  title: "Wandering Workshop | Studio Ghibli Portfolio",
  description: "A hand-painted, whimsical developer portfolio inspired by Howl's Moving Castle, featuring magic doorway project portals, aged parchment stories, and elemental magic skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} scroll-smooth`}>
      <body className="bg-[#7EC8E3] text-[#1C2833] selection:bg-[#9B72AA]/30 selection:text-[#4A3525] font-sans antialiased ghibli-scrollbar">
        {children}
      </body>
    </html>
  );
}

