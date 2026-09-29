import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Square SDK uses node-fetch; keep it out of the server bundle (avoids "fetch failed").
  serverExternalPackages: ["square"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "items-images-production.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "items-images-sandbox.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "square-cdn.com",
      },
      {
        protocol: "https",
        hostname: "*.squarecdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.square.site",
      },
    ],
  },
};

export default nextConfig;
