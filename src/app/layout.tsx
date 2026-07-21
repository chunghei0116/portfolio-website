import type { Metadata } from "next";
import { Bricolage_Grotesque, Newsreader, JetBrains_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const bodyFont = Newsreader({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const typewriterFont = Courier_Prime({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Jones Tse — Mobile & DevOps Engineer",
  description: "Eight years of pipelines, code, and systems in one grid. Infrastructure built for native mobile apps and scalable cloud operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${typewriterFont.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full font-sans antialiased text-foreground bg-background">
        {children}
      </body>
    </html>
  );
}
