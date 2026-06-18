import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GeografiaService } from '../application/geografia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Geografia')
@Controller('geografia')
export class GeografiaController {
  constructor(private readonly geografiaService: GeografiaService) {}

  @Publico()
  @Get('localizacoes')
  @ApiOperation({ summary: 'Lista todas as localizações bíblicas' })
  @ApiQuery({ name: 'tipo', required: false })
  listarLocalizacoes(@Query('tipo') tipo?: string) {
    return this.geografiaService.listarLocalizacoes(tipo);
  }

  @Publico()
  @Get('localizacoes/:slug')
  @ApiOperation({ summary: 'Detalhes de uma localização' })
  buscarLocalizacao(@Param('slug') slug: string) {
    return this.geografiaService.buscarLocalizacao(slug);
  }

  @Publico()
  @Get('rotas')
  @ApiOperation({ summary: 'Lista todas as rotas bíblicas' })
  listarRotas() {
    return this.geografiaService.listarRotas();
  }

  @Publico()
  @Get('proximos')
  @ApiOperation({ summary: 'Localizações próximas' })
  proximos(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('raio') raio?: number,
  ) {
    return this.geografiaService.buscarProximos(lat, lng, raio);
  }
}
