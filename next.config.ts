import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f4.bcbits.com", // Bandcamp CDN
      },
      {
        protocol: "https",
        hostname: "**.bandcamp.com",
      },
    ],
  },
  // Allow serving audio/video from public dir
  async headers() {
    return [
      {
        source: "/audio/:path*",
        headers: [
          { key: "Accept-Ranges", value: "bytes" },
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
    ];
  },
};

export default nextConfig;
