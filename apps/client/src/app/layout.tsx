import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tutors App",
  description: "Created by Irene",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
