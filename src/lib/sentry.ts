import * as Sentry from '@sentry/nextjs';

let sentryInitialized = false;

export function initSentry() {
  if (sentryInitialized || typeof window === 'undefined') return;

  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!SENTRY_DSN) return;

  sentryInitialized = true;
  // Sentry is now initialized via sentry.client.config.ts
  // This function is kept for backward compatibility
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  console.error('[Error]', error.message, context);

  if (!sentryInitialized) return;

  Sentry.captureException(error, { extra: context });
}

export function setSentryUser(user: { id: string; email?: string }) {
  if (!sentryInitialized) return;
  Sentry.setUser(user);
}

export function clearSentryUser() {
  if (!sentryInitialized) return;
  Sentry.setUser(null);
}
