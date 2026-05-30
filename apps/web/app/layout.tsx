import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SiteForge — AI Website Builder for Small Business",
    template: "%s | SiteForge",
  },
  description:
    "Build beautiful, professional websites for your small business in minutes using AI. No coding required.",
  keywords: [
    "website builder",
    "AI website",
    "small business",
    "SiteForge",
    "no code",
  ],
  openGraph: {
    title: "SiteForge — AI Website Builder",
    description:
      "Build beautiful websites for your small business in minutes using AI.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "SiteForge",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
