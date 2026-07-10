import { SetMetadata } from '@nestjs/common';

export const THROTTLE_LIMIT = 'throttle_limit';
export const THROTTLE_TTL = 'throttle_ttl';

export interface ThrottleOptions {
  ttl: number;
  limit: number;
}

export const ThrottleCustom = (options: ThrottleOptions) =>
  (target: any, key?: string, descriptor?: any) => {
    if (descriptor) {
      SetMetadata(THROTTLE_LIMIT, options.limit)(target, key!, descriptor);
      SetMetadata(THROTTLE_TTL, options.ttl)(target, key!, descriptor);
      return descriptor;
    }
    return SetMetadata(THROTTLE_LIMIT, options.limit)(target);
  };

// Usage decorators for common patterns
export const ThrottleLogin = () =>
  (target: any, key: string, descriptor: any) => {
    SetMetadata(THROTTLE_LIMIT, 5)(target, key, descriptor);
    SetMetadata(THROTTLE_TTL, 60000)(target, key, descriptor);
    return descriptor;
  };

export const ThrottleIa = () =>
  (target: any, key: string, descriptor: any) => {
    SetMetadata(THROTTLE_LIMIT, 10)(target, key, descriptor);
    SetMetadata(THROTTLE_TTL, 60000)(target, key, descriptor);
    return descriptor;
  };
