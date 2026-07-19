/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion', 'lucide-react', '@heroicons/react/24/outline',
      'recharts', 'leaflet', 'react-leaflet',
      '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover',
      '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-accordion',
      '@radix-ui/react-scroll-area', '@radix-ui/react-checkbox', '@radix-ui/react-label',
      '@radix-ui/react-progress', '@radix-ui/react-avatar', '@radix-ui/react-slot',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
