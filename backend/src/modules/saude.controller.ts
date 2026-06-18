import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Saúde')
@Controller('health')
export class SaudeController {
  @Get()
  @ApiOperation({ summary: 'Verifica saúde do sistema' })
  async health() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      versao: '1.0.0',
      ambiente: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
    };
  }
}
