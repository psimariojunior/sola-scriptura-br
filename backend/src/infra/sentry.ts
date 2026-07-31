import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export function initSentry() {
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 0.1,
      profilesSampleRate: 0.1,
      environment: process.env.NODE_ENV || 'development',
    });
  }
}
