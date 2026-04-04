import { Geist, Oregano } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const oregano = Oregano({
  variable: '--font-oregano',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Email Playground — Build, Preview & Test HTML Emails',
  description:
    'Create HTML email templates with real-time preview and quickly send test emails to yourself or your team.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${oregano.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
