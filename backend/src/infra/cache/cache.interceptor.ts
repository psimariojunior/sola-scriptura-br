import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './cache.service';

export function CacheKey(prefix: string) {
  return function (target: any, propertyKey?: string, descriptor?: any) {
    if (descriptor) {
      Reflect.defineMetadata('cache:prefix', prefix, descriptor.value);
    }
    return descriptor;
  };
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(private readonly cache: CacheService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    if (!this.cache.isAvailable()) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle();
    }

    // Skip cache for authenticated requests
    if (request.headers.authorization) {
      return next.handle();
    }

    const cacheKey = this.generateKey(request);

    const cached = await this.cache.get<{
      status: number;
      body: any;
      headers: Record<string, string>;
    }>(cacheKey);

    if (cached) {
      response.set(cached.headers);
      response.status(cached.status);
      return of(cached.body);
    }

    return next.handle().pipe(
      tap(async (body) => {
        try {
          await this.cache.set(cacheKey, {
            status: response.statusCode,
            body,
            headers: {
              'cache-control': 'public, max-age=300, s-maxage=300',
              'x-cache': 'HIT',
            },
          }, 300);
        } catch {
          // Cache write failed silently
        }
      }),
    );
  }

  private generateKey(request: any): string {
    const { originalUrl, method } = request;
    return `ssb-cache:${method}:${originalUrl}`;
  }
}
