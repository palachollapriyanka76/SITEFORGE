import React from 'react';
import '../styles/globals.css';

export const metadata = {
  title: 'SiteForge',
  description: 'AI-Powered Website Builder',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Non-blocking font loading — preconnect + swap prevents render blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
