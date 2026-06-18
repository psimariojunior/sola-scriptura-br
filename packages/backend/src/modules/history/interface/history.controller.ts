import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HistoryService } from '../application/history.service';

@ApiTags('História Bíblica')
@Controller('historia')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('pessoa/:nome')
  @ApiOperation({ summary: 'Buscar pessoa bíblica' })
  async buscarPessoa(@Param('nome') nome: string) {
    return this.historyService.buscarPessoa(nome);
  }

  @Get('pessoas')
  @ApiOperation({ summary: 'Listar pessoas bíblicas' })
  async listarPessoas(@Query('categoria') categoria?: string) {
    return this.historyService.listarPessoas(categoria);
  }

  @Get('local/:nome')
  @ApiOperation({ summary: 'Buscar local bíblico' })
  async buscarLocal(@Param('nome') nome: string) {
    return this.historyService.buscarLocal(nome);
  }
}
