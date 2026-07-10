import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Scene from "@/components/canvas/Scene";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Renaissance Particle Canvas",
  description: "Bespoke Renaissance particle sheet wave visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full font-sans antialiased text-foreground selection:bg-accent-gold selection:text-background bg-background">
        {/* Persistent 3D Background Scene */}
        <Scene />
        
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
