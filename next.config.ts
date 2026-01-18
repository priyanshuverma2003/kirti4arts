import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/checkout',
        destination: '/cart',
        permanent: true,
      },
      {
        source: '/order-success',
        destination: '/cart',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
