import { Injectable, Inject, Logger } from '@nestjs/common';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(REDIS_CLIENT) private readonly redis: any) {}

  async get<T>(key: string): Promise<T | null> {
    if (!this.redis) return null;
    try {
      const data = await this.redis.get(key);
      if (!data) return null;
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }

  async set(key: string, value: unknown, ttlSeconds = 300): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
    } catch (err) {
      this.logger.warn(`Cache SET failed for ${key}: ${err}`);
    }
  }

  async del(pattern: string): Promise<void> {
    if (!this.redis) return;
    try {
      if (pattern.includes('*')) {
        const keys: string[] = [];
        let cursor = '0';
        do {
          const [nextCursor, batch] = await this.redis.scan(
            cursor,
            'MATCH',
            pattern,
            'COUNT',
            100,
          );
          cursor = nextCursor;
          keys.push(...batch);
        } while (cursor !== '0');

        if (keys.length > 0) {
          const BATCH_SIZE = 50;
          for (let i = 0; i < keys.length; i += BATCH_SIZE) {
            await this.redis.del(...keys.slice(i, i + BATCH_SIZE));
          }
        }
      } else {
        await this.redis.del(pattern);
      }
    } catch (err) {
      this.logger.warn(`Cache DEL failed for ${pattern}: ${err}`);
    }
  }

  async flush(): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.flushdb();
    } catch (err) {
      this.logger.warn(`Cache FLUSH failed: ${err}`);
    }
  }

  isAvailable(): boolean {
    return !!this.redis;
  }
}
