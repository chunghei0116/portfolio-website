import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Scene from "@/components/canvas/Scene";
import PageTransition from "@/components/ui/PageTransition";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "JONES TSE // DEVOPS & MOBILE ENGINEER",
  description: "Minimalist tech portfolio — DevOps infrastructure, Flutter & Tauri development. Built with Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full font-sans antialiased bg-background text-foreground selection:bg-accent-red selection:text-white">
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
