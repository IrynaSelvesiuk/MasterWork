import { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/shared/providers/query-provider';

export const metadata: Metadata = {
  title: 'Tutors App',
  description: 'Created by Irene',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
