import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@siteforge/ui", "@siteforge/types", "@siteforge/database"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

export default nextConfig;
