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
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
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
