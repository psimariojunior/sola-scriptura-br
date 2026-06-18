import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Publico } from '../../common/decorators/publico.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../../infra/cache/redis.module';
import Redis from 'ioredis';

@ApiTags('Saúde')
@Controller()
export class SaudeController {
  constructor(
    @InjectRepository('Testamento') private testamentoRepo: Repository<any>,
    @Inject(REDIS_CLIENT) private redis: Redis,
  ) {}

  @Publico()
  @Get('health')
  @ApiOperation({ summary: 'Verifica saúde do sistema' })
  async health() {
    const dbStatus = await this.verificarBanco();
    const redisStatus = await this.verificarRedis();
    const status = dbStatus && redisStatus ? 'online' : 'degradado';

    return {
      status,
      timestamp: new Date().toISOString(),
      servicos: {
        banco: dbStatus ? 'online' : 'offline',
        redis: redisStatus ? 'online' : 'offline',
      },
      versao: '1.0.0',
      ambiente: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
    };
  }

  private async verificarBanco(): Promise<boolean> {
    try {
      await this.testamentoRepo.find({ take: 1 });
      return true;
    } catch {
      return false;
    }
  }

  private async verificarRedis(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch {
      return false;
    }
  }
}
