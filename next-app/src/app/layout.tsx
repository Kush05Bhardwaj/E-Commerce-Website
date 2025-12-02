import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'E-Commerce Store - Modern Shopping Experience',
  description: 'Full-stack e-commerce platform built with Next.js, MongoDB, and TypeScript',
  keywords: ['ecommerce', 'shopping', 'online store', 'nextjs'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
