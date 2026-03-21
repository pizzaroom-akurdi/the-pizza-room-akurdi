import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Auto-convert JPEGs → WebP / AVIF (50–70 % smaller, same quality)
    formats: ["image/avif", "image/webp"],
    // Server-side cache: keep optimised images for 30 days before re-processing
    minimumCacheTTL: 2_592_000,
    // Only the sizes we actually render (avoids unnecessary renditions)
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  async headers() {
    return [
      {
        // Browser cache for Next.js optimised image responses
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Browser cache for raw source images in /public/images/
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
