import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LexiconService } from '../application/lexicon.service';

@ApiTags('Léxico Bíblico')
@Controller('lexico')
export class LexiconController {
  constructor(private readonly lexiconService: LexiconService) {}

  @Get('strong/:codigo')
  @ApiOperation({ summary: 'Buscar entrada por código Strong' })
  async buscarStrong(@Param('codigo') codigo: string) {
    return this.lexiconService.buscarStrong(codigo);
  }

  @Get('lemma/:lemma')
  @ApiOperation({ summary: 'Buscar entradas por lemma' })
  async buscarLemma(@Param('lemma') lemma: string) {
    return this.lexiconService.buscarLemma(lemma);
  }

  @Get('idioma/:idioma')
  @ApiOperation({ summary: 'Listar entradas por idioma' })
  async buscarPorIdioma(@Param('idioma') idioma: string) {
    return this.lexiconService.buscarPorIdioma(idioma);
  }

  @Get('busca')
  @ApiOperation({ summary: 'Buscar no léxico' })
  async buscar(@Query('q') termo: string) {
    return this.lexiconService.buscarPorTermo(termo);
  }
}
