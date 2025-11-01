import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'cdn.jsdelivr.net',
      'avatars.githubusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
