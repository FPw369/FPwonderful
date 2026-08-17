import type { Metadata } from 'next';
import { Space_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { MiniPlayerProvider } from '@/components/MiniPlayerContext';
import { LiminalBackdrop } from '@/components/LiminalBackdrop';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { MiniPlayer } from '@/components/MiniPlayer';

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FPwonderful — Artist, Producer & Engineer',
  description:
    'FPwonderful is a recording artist, producer, and mixing & mastering engineer based in Chicago, IL. Sound with intention. Less but better.',
  keywords: [
    'FPwonderful',
    'DOOMgang',
    'Chicago Music Producer',
    'Mixing Engineer Chicago',
    'Mastering Engineer Chicago',
    'Analog Mixing',
    'Audio Engineering',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${cormorantGaramond.variable}`}>
      <body className="bg-[#121217] text-[#F9F4F4] min-h-screen flex flex-col relative selection:bg-[#ACE1AF] selection:text-[#121217]">
        <MiniPlayerProvider>
          {/* Clean Solid Backdrop */}
          <LiminalBackdrop />

          {/* Top Header Nav */}
          <Nav />

          {/* Page Content */}
          <main className="flex-grow pt-24">{children}</main>

          {/* Persistent Mini Player */}
          <MiniPlayer />

          {/* Underground / Grounded Footer */}
          <Footer />
        </MiniPlayerProvider>
      </body>
    </html>
  );
}
