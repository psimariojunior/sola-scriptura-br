import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { CacheService } from './cache.service';
import { REDIS_CLIENT } from './redis.constants';
export { REDIS_CLIENT } from './redis.constants';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const host = config.get('REDIS_HOST');
        if (!host) {
          new Logger('RedisModule').warn('REDIS_HOST não configurado — Redis desabilitado');
          return null;
        }
        return new Redis({
          host,
          port: config.get('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD', ''),
          db: config.get('REDIS_DB', 0),
          retryStrategy: (times) => Math.min(times * 50, 2000),
        });
      },
    },
    CacheService,
  ],
  exports: [REDIS_CLIENT, CacheService],
})
export class RedisModule {}
