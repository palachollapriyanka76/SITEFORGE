import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@siteforge/ui", "@siteforge/types", "@siteforge/database"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.clerk.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
