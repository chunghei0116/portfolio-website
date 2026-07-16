import type { Metadata } from "next";
import { Space_Grotesk, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Jones Tse — Mobile & DevOps Engineer Folio",
  description: "Systems portfolio showcasing low-latency infrastructure, mobile apps, CI/CD telemetry, and cloud automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full font-sans antialiased text-foreground bg-background">
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
