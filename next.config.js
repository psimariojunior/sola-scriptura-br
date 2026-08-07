const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  serverExternalPackages: ['node-edge-tts'],
  experimental: {
    optimizePackageImports: [
      'framer-motion', 'lucide-react',
      'recharts', 'leaflet', 'react-leaflet', 'socket.io-client',
      '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover',
      '@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-accordion',
      '@radix-ui/react-scroll-area', '@radix-ui/react-checkbox', '@radix-ui/react-label',
      '@radix-ui/react-progress', '@radix-ui/react-avatar', '@radix-ui/react-slot',
      'i18next', 'react-i18next',
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
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live https://browser.sentry-cdn.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https: http: https://*.tile.openstreetmap.org https://solascripturabr.com.br",
              "font-src 'self'",
              "connect-src 'self' https://api.solascripturabr.com.br https://api.midvash.com https://*.vercel-insights.com https://va.vercel-scripts.com https://*.sentry.io wss://*.vercel.app",
              "frame-src 'self' https://www.google.com https://accounts.google.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
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

const sentryPlugins = process.env.SENTRY_ORG ? [require('@sentry/nextjs')] : [];

let config = sentryPlugins.length > 0
  ? require('@sentry/nextjs').withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      silent: !process.env.CI,
      widenClientFileUpload: true,
      hideSourceMaps: true,
      disableServerWebpackPlugin: true,
      disableClientWebpackPlugin: true,
      telemetry: false,
    })
  : nextConfig;

module.exports = withBundleAnalyzer(config);
