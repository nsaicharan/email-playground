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
  title: 'Email Playground — Build, Share & Test HTML Emails',
  description:
    'Quickly create HTML email demos, share them with your team, and send test emails to review and fix issues before sending to customers.',
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
