import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Montserrat, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['200', '300', '400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "THE ODYSSEY | Creative Directory MMXXVI",
  description: "A minimalist, highly cinematic museum portfolio inspired by luxury art galleries and ancient Mediterranean mythology.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} ${inter.variable} scroll-smooth dark`}>
      <body className="bg-[#0A0B0D] text-[#E5E7EB] font-sans antialiased selection:bg-[#D4AF37]/40 selection:text-[#FFF8E7] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}


