import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GregoService } from '../application/grego.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Grego')
@Controller('grego')
export class GregoController {
  constructor(private readonly gregoService: GregoService) {}

  @Publico()
  @Get('strong/:strong')
  @ApiOperation({ summary: 'Busca palavra grega pelo código Strong' })
  buscarPorStrong(@Param('strong') strong: string) {
    return this.gregoService.buscarPorStrong(strong);
  }

  @Publico()
  @Get('lemma/:lemma')
  @ApiOperation({ summary: 'Busca palavras pelo lemma' })
  buscarPorLemma(@Param('lemma') lemma: string) {
    return this.gregoService.buscarPorLemma(lemma);
  }

  @Publico()
  @Get('buscar')
  @ApiOperation({ summary: 'Pesquisa por transliteração ou texto original' })
  @ApiQuery({ name: 'q', required: true })
  buscar(@Query('q') consulta: string) {
    return this.gregoService.buscarPorTransliteracao(consulta);
  }

  @Publico()
  @Get('frequentes')
  @ApiOperation({ summary: 'Palavras gregas mais frequentes no NT' })
  frequentes(@Query('limite') limite?: number) {
    return this.gregoService.buscarFrequentes(limite ? +limite : 100);
  }
}
