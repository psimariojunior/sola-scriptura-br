import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

export const cacheConfig = CacheModule.registerAsync({
  useFactory: async (configService: ConfigService) => ({
    store: await redisStore({
      socket: {
        host: configService.get('REDIS_HOST', 'localhost'),
        port: configService.get('REDIS_PORT', 6379),
      },
      ttl: 300,
    }),
  }),
  inject: [ConfigService],
});
