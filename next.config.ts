import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: "https://grocery.newcinderella.online",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "grocery.newcinderella.online",
      },
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://grocery.newcinderella.online/api/:path*",
      },
    ];
  },
};

export default nextConfig;
