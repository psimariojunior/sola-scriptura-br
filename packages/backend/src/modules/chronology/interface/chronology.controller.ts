import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChronologyService } from '../application/chronology.service';

@ApiTags('Cronologia Bíblica')
@Controller('cronologia')
export class ChronologyController {
  constructor(private readonly chronologyService: ChronologyService) {}

  @Get()
  @ApiOperation({ summary: 'Obter linha do tempo bíblica completa' })
  async obterLinhaTempo(@Query('periodo') periodo?: string) {
    return this.chronologyService.obterLinhaTempo(periodo);
  }

  @Get('buscar/:referencia')
  @ApiOperation({ summary: 'Buscar eventos por referência bíblica' })
  async buscarEventos(@Param('referencia') referencia: string) {
    return this.chronologyService.buscarEventosPorReferencia(referencia);
  }
}
