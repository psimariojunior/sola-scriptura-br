import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  tracesSampleRate: 0.1,
  debug: false,
  environment: process.env.NODE_ENV || 'development',
  sendDefaultPii: false,
  ignoreErrors: [
    'favicon.ico',
    'ResizeObserver loop',
    'Non-Error promise rejection',
    'Network request failed',
  ],
  allowUrls: [
    /solascripturabr\.com\.br/,
    /localhost/,
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
