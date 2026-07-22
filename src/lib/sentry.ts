let sentryInitialized = false;

export function initSentry() {
  if (sentryInitialized || typeof window === 'undefined') return;

  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!SENTRY_DSN) return;

  sentryInitialized = true;

  // Dynamic import with string to bypass TS module resolution
  // Sentry is an optional dependency — only load if installed
  const modId = '@sentry/nextjs';
  import(/* webpackIgnore: true */ /* @vite-ignore */ modId)
    .then((Sentry: unknown) => {
      (Sentry as { init: (cfg: Record<string, unknown>) => void }).init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 0.1,
        environment: process.env.NODE_ENV,
      });
    })
    .catch(() => {
      // Sentry not installed — silent ignore
    });
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  console.error('[Error]', error.message, context);

  if (!sentryInitialized) return;

  const modId = '@sentry/nextjs';
  import(/* webpackIgnore: true */ /* @vite-ignore */ modId)
    .then((Sentry: unknown) => {
      (Sentry as { captureException: (err: Error, ctx?: unknown) => void }).captureException(error, { extra: context });
    })
    .catch(() => {
      // Sentry not available
    });
}
