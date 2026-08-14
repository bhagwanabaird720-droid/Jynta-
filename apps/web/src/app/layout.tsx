import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jynta — One AI. One System. Unlimited Possibilities.',
  description: 'Jynta AI Assistant, Memory & Automation Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
