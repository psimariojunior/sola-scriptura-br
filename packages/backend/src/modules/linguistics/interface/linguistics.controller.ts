import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LinguisticsService } from '../application/linguistics.service';

@ApiTags('Linguística Bíblica')
@Controller('linguistica')
export class LinguisticsController {
  constructor(private readonly linguisticsService: LinguisticsService) {}

  @Get('palavra/:palavra')
  @ApiOperation({ summary: 'Analisar morfologia e semântica de uma palavra' })
  async analisarPalavra(
    @Param('palavra') palavra: string,
    @Query('idioma') idioma?: string,
  ) {
    return this.linguisticsService.analisarPalavra(palavra, idioma);
  }

  @Get('strong/:codigo')
  @ApiOperation({ summary: 'Buscar por código Strong' })
  async buscarStrong(@Param('codigo') codigo: string) {
    return this.linguisticsService.buscarPorStrong(codigo);
  }

  @Get('lemma/:lemma')
  @ApiOperation({ summary: 'Buscar entradas por lemma' })
  async buscarLemma(
    @Param('lemma') lemma: string,
    @Query('idioma') idioma?: string,
  ) {
    return this.linguisticsService.buscarPorLemma(lemma, idioma);
  }
}
