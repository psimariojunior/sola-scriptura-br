import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GeographyService } from '../application/geography.service';

@ApiTags('Geografia Bíblica')
@Controller('geografia')
export class GeographyController {
  constructor(private readonly geographyService: GeographyService) {}

  @Get('local/:nome')
  @ApiOperation({ summary: 'Informações geográficas de um local' })
  async buscarLocal(@Param('nome') nome: string) {
    return this.geographyService.buscarLocal(nome);
  }

  @Get('tipo/:tipo')
  @ApiOperation({ summary: 'Listar locais por tipo' })
  async listarPorTipo(@Param('tipo') tipo: string) {
    return this.geographyService.listarPorTipo(tipo);
  }

  @Get('proximos')
  @ApiOperation({ summary: 'Buscar locais próximos' })
  async buscarProximos(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('raio') raio?: number,
  ) {
    return this.geographyService.buscarProximos(lat, lng, raio || 50);
  }
}
