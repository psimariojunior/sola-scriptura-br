import { LoggerService } from '@nestjs/common';
import pino from 'pino';

export function createLogger(): LoggerService {
  const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
  });

  return {
    log: (message, ...optionalParams) => logger.info({ msg: message, ...optionalParams }),
    error: (message, ...optionalParams) => logger.error({ msg: message, ...optionalParams }),
    warn: (message, ...optionalParams) => logger.warn({ msg: message, ...optionalParams }),
    debug: (message, ...optionalParams) => logger.debug({ msg: message, ...optionalParams }),
    verbose: (message, ...optionalParams) => logger.trace({ msg: message, ...optionalParams }),
  };
}
