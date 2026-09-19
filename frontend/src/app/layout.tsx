import React from 'react';
import './globals.css';

export const metadata = {
  title: 'User Management System | Professional Dashboard',
  description: 'NestJS REST API + Next.js App Router User Directory Management System with Tailwind CSS styling',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
