import * as Sentry from '@sentry/nextjs';
import type { RequestAsyncContext } from 'next/dist/server/request-async-storage';

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '',
      tracesSampleRate: 0.1,
      debug: false,
      environment: process.env.NODE_ENV || 'development',
      maxValueLength: 250,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '',
      tracesSampleRate: 0.1,
      debug: false,
      environment: process.env.NODE_ENV || 'development',
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
