/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  serverExternalPackages: ['node-edge-tts'],
  experimental: {
    optimizePackageImports: [
      'framer-motion', 'lucide-react',
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
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.tile.openstreetmap.org https://solascripturabr.com.br",
              "font-src 'self'",
              "connect-src 'self' https://api.solascripturabr.com.br https://api.midvash.com https://*.vercel-insights.com https://va.vercel-scripts.com wss://*.vercel.app",
              "frame-src 'self' https://www.google.com https://accounts.google.com",
              "media-src 'self' blob:",
            ].join('; '),
          },
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
