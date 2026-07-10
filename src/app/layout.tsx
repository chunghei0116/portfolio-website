import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Scene from "@/components/canvas/Scene";
import PageTransition from "@/components/ui/PageTransition";

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
  title: "JONES TSE // RENAISSANCE ENGINEERING",
  description: "DevOps infrastructure and mobile engineering portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} ${cormorant.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full font-sans antialiased text-foreground selection:bg-accent-blue selection:text-white">
        {/* Persistent 3D Background Scene */}
        <Scene />
        
        {/* Floating Brutalist Navbar */}
        <Navbar />
        
        <main className="relative min-h-screen flex flex-col">
          {/* Animated Route Transitions */}
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </body>
    </html>
  );
}
