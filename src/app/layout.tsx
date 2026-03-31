import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Punchy Portfolio",
  description: "Minimalist, bold, and punchy aesthetics with 3D elements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="min-h-full font-sans antialiased bg-background text-foreground selection:bg-black selection:text-white">
        {/* Background container for the 3D canvas */}
        <div 
          id="scene-container" 
          className="fixed inset-0 -z-10 bg-background transition-colors duration-500 pointer-events-none" 
          aria-hidden="true"
        />
        
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
