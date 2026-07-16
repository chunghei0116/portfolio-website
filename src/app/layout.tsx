import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const bodyFont = Fraunces({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Jones Tse — Full-Stack Engineer & Graphics Specialist",
  description: "Mechanical precision, tactile layout, and low-latency interactive systems. Ported to the press-01 design system.",
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
      data-theme="press"
    >
      <body className="min-h-full font-sans antialiased text-foreground bg-background">
        <main className="relative min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
