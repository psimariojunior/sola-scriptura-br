import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MapService } from '../application/map.service';

@ApiTags('Mapas Bíblicos')
@Controller('mapas')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('locais')
  @ApiOperation({ summary: 'Listar locais bíblicos para mapa' })
  async listarLocais(@Query('tipo') tipo?: string) {
    return this.mapService.listarLocais(tipo);
  }

  @Get('local/:nome')
  @ApiOperation({ summary: 'Buscar local específico' })
  async buscarLocal(@Param('nome') nome: string) {
    return this.mapService.buscarLocal(nome);
  }

  @Get('rotas')
  @ApiOperation({ summary: 'Obter rotas bíblicas' })
  async obterRotas() {
    return this.mapService.obterRotas();
  }
}
