import './globals.css';
import type { ReactNode } from 'react';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { M_PLUS_Rounded_1c, Quintessential } from 'next/font/google';

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const quintessential = Quintessential({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

export const metadata = {
  title: 'Hempstead Judo Club',
  description: 'Learn Judo. Build Confidence. Join Our Community.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mPlusRounded.className} ${quintessential.variable} min-h-screen flex flex-col`}>
        {/* Skip to content for accessibility */}
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-navy focus:shadow">Skip to content</a>
  <Navbar />
  {/* Add top padding so content isn't hidden behind the fixed header */}
  <main id="content" className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
