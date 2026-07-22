import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.1,
  
  // Setting this option to true will print useful information to the console while setting up Sentry.
  debug: false,
  
  // Environment
  environment: process.env.NODE_ENV || 'development',
  
  // Enable automatic session tracking
  autoSessionTracking: true,
  
  // Don't send PII (personally identifiable information)
  sendDefaultPii: false,
  
  // Ignore common errors
  ignoreErrors: [
    'favicon.ico',
    'ResizeObserver loop',
    'Non-Error promise rejection',
    'Network request failed',
  ],
  
  // Allow URLs
  allowUrls: [
    /solascripturabr\.com\.br/,
    /localhost/,
  ],
});
