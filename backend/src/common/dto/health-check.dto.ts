export interface HealthCheckResponse {
  status: 'online' | 'degraded' | 'offline';
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  memory: {
    heapUsed: string;
    heapTotal: string;
    rss: string;
    external: string;
  };
  database: {
    status: 'connected' | 'disconnected' | 'error';
    latencyMs?: number;
    message?: string;
  };
  dependencies: Record<string, {
    status: 'healthy' | 'unhealthy' | 'unknown';
    latencyMs?: number;
    message?: string;
  }>;
}
