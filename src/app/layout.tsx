import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Senior Graphics & Full-Stack Architect | Portfolio',
  description: '100% Graphic-Intensive 3D WebGL Portfolio featuring custom GLSL shaders, 3D physics, and high-end engineering.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#030305] text-white selection:bg-[#00f0ff]/30 selection:text-[#00f0ff] antialiased">
        {children}
      </body>
    </html>
  );
}
