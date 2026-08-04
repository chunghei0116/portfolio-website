import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda } from 'next/font/google';
import './globals.css';
import './portfolio.css';
import { getSiteUrl } from '@/lib/site-url';

const displayFont = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500'],
});

const siteUrl = getSiteUrl();
const description =
  'Hong Kong mobile developer and DevOps engineer building refined applications, dependable delivery systems, and resilient cloud infrastructure.';
const socialImage = siteUrl
  ? new URL('/infrastructure-editorial.png', siteUrl)
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl ?? undefined,
  title: {
    default: 'Jones Tse - Mobile Developer and DevOps Engineer',
    template: '%s | Jones Tse',
  },
  description,
  authors: [{ name: 'Jones Tse' }],
  creator: 'Jones Tse',
  category: 'technology',
  alternates: siteUrl ? { canonical: siteUrl.href } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    title: 'Jones Tse - Mobile Developer and DevOps Engineer',
    description,
    type: 'website',
    siteName: 'Jones Tse',
    ...(socialImage
      ? {
          images: [
            {
              url: socialImage,
              width: 1536,
              height: 1024,
              alt: 'An abstract technical landscape representing cloud infrastructure and delivery systems.',
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jones Tse - Mobile Developer and DevOps Engineer',
    description,
    ...(socialImage ? { images: [socialImage] } : {}),
  },
  icons: {
    icon: '/helmet.jpg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#f3f0e8',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={displayFont.variable}>{children}</body>
    </html>
  );
}
