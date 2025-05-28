import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google'; // Correctly import Google Fonts
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Instantiate the Google Fonts
const inter = Inter({
  variable: '--font-inter', // Use a new CSS variable name
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono', // Use a new CSS variable name
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Validated - Validate Your Business Ideas',
  description: 'Submit your business ideas, get feedback, and find real paying users for beta testing for your new venture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the new font variables to the body */}
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
