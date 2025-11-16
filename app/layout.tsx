import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orange Blossom Alliance ? Track Impact',
  description:
    'Transparent donation tracker converting every dollar into concrete impact metrics for Orange Blossom Alliance.',
  metadataBase: new URL('https://agentic-af70f04e.vercel.app'),
  openGraph: {
    title: 'Orange Blossom Alliance ? Track Impact',
    description:
      'Transparent donation tracker converting every dollar into concrete impact metrics.',
    url: 'https://agentic-af70f04e.vercel.app',
    siteName: 'Track Impact',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orange Blossom Alliance ? Track Impact',
    description: 'Convert donations into real-world outcomes in seconds.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <nav className="container-tight flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 text-white">OA</span>
              <span>Orange Blossom Alliance</span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/impact" className="hover:text-brand-700">Track Impact</Link>
              <a href="https://orangeblossomalliance.org" target="_blank" className="hover:text-brand-700" rel="noreferrer">Website</a>
            </div>
          </nav>
        </header>
        <main className="container-tight py-10">{children}</main>
        <footer className="mt-16 border-t">
          <div className="container-tight flex flex-col items-center justify-between gap-2 py-6 text-xs text-gray-500 sm:flex-row">
            <p>? {new Date().getFullYear()} Orange Blossom Alliance</p>
            <p>Built for transparency and impact</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
