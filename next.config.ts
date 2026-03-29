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
      // Proxy all /api/proxy/* requests to backend
      {
        source: "/api/proxy/:path*",
        destination: `${process.env.BASE_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/proxy/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,PATCH,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

export default nextConfig;
