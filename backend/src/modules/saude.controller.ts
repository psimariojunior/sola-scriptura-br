import { Controller, Get, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Publico } from '../common/decorators/publico.decorator';
import { HealthCheckResponse } from '../common/dto/health-check.dto';

@ApiTags('Saúde')
@Controller('health')
export class SaudeController {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Publico()
  @Get()
  @ApiOperation({ summary: 'Verifica saúde completa do sistema' })
  @ApiResponse({ status: 200, description: 'Sistema operacional' })
  @ApiResponse({ status: 503, description: 'Sistema degradado' })
  async health(): Promise<HealthCheckResponse> {
    const mem = process.memoryUsage();
    const dbCheck = await this.checkDatabase();

    if (dbCheck.status !== 'connected') {
      throw new HttpException({
        status: 'degraded',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'production',
        uptime: process.uptime(),
        database: dbCheck,
      }, HttpStatus.SERVICE_UNAVAILABLE);
    }

    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
      memory: {
        heapUsed: `${(mem.heapUsed / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(mem.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        rss: `${(mem.rss / 1024 / 1024).toFixed(2)} MB`,
        external: `${(mem.external / 1024 / 1024).toFixed(2)} MB`,
      },
      database: dbCheck,
      dependencies: {},
    };
  }

  @Publico()
  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe - verifica se o processo está vivo' })
  liveness() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Publico()
  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe - verifica se o serviço está pronto' })
  async readiness() {
    const dbCheck = await this.checkDatabase();
    return {
      status: dbCheck.status === 'connected' ? 'ready' : 'not_ready',
      database: dbCheck,
      timestamp: new Date().toISOString(),
    };
  }

  private async checkDatabase(): Promise<{
    status: 'connected' | 'disconnected' | 'error';
    latencyMs?: number;
    message?: string;
  }> {
    try {
      const start = Date.now();
      await this.dataSource.query('SELECT 1');
      return {
        status: 'connected',
        latencyMs: Date.now() - start,
      };
    } catch (error: any) {
      return {
        status: 'error',
        message: error.message || 'Database connection failed',
      };
    }
  }
}
