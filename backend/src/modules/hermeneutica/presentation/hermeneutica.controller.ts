import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HermeneuticaService } from '../application/hermeneutica.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Hermenêutica')
@Controller('hermeneutica')
export class HermeneuticaController {
  constructor(private readonly hermeneuticaService: HermeneuticaService) {}

  @Publico()
  @Get('versiculo/:versiculoId')
  @ApiOperation({ summary: 'Análise hermenêutica de um versículo' })
  analisar(@Param('versiculoId') versiculoId: string) {
    return this.hermeneuticaService.buscarPorVersiculo(versiculoId);
  }

  @Publico()
  @Get('versiculo/:versiculoId/genero')
  @ApiOperation({ summary: 'Identifica o gênero literário do texto' })
  genero(@Param('versiculoId') versiculoId: string) {
    return this.hermeneuticaService.identificarGenero(versiculoId);
  }
}
