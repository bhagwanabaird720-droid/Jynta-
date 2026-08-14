import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@jynta/ui', '@jynta/design-system', '@jynta/hooks'],
};

export default nextConfig;
