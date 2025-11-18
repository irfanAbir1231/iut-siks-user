import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Add the rewrites function here to proxy API requests
  async rewrites() {
    return [
      {
        source: "/api-reminder/:path*",
        destination: "https://reminder.dev/api/:path*",
      },
      {
        source: "/api-quran/:path*",
        destination: "https://api.quran.com/api/v4/:path*",
      },
    ];
  },
};

export default nextConfig;
