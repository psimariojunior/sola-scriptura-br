/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-markdown'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-production-bb96.up.railway.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
