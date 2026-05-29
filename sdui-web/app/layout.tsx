import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { GooeyToaster } from '@/components/ui/goey-toaster';

const montserratHeading = Montserrat({ subsets: ['latin'], variable: '--font-heading' });

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SDUI',
  description: 'Server-Driven UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
        montserratHeading.variable,
        'dark'
      )}
    >
      <body className="flex min-h-full flex-col">
        <GooeyToaster />
        {children}
      </body>
    </html>
  );
}
