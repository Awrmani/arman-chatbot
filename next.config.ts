import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'qq5zqpo4wcrtelgo.public.blob.vercel-storage.com',
        pathname: '/**/**',
      },
    ],
  },
};

export default nextConfig;
