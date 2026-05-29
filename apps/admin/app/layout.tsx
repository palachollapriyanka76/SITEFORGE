import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@siteforge/ui/globals.css";

export const metadata: Metadata = {
  title: {
    default: "SiteForge Admin",
    template: "%s | SiteForge Admin",
  },
  description: "SiteForge administration panel.",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
