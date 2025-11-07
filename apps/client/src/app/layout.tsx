import { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from '@/shared/providers/query-provider';
import { StoreHydrator } from './store-hydrator';

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
      <body className={`antialiased flex flex-col min-h-screen bg-gray-50`}>
        <QueryProvider>
          <StoreHydrator />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
