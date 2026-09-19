import React from 'react';
import './globals.css';

export const metadata = {
  title: 'User CRUD Management System',
  description: 'NestJS REST API + Next.js App Router User Directory Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
