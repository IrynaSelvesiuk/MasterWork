import { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
