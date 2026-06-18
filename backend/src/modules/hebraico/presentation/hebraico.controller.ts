import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { HebraicoService } from '../application/hebraico.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Hebraico')
@Controller('hebraico')
export class HebraicoController {
  constructor(private readonly hebraicoService: HebraicoService) {}

  @Publico()
  @Get('strong/:strong')
  @ApiOperation({ summary: 'Busca palavra hebraica pelo código Strong' })
  buscarPorStrong(@Param('strong') strong: string) {
    return this.hebraicoService.buscarPorStrong(strong);
  }

  @Publico()
  @Get('buscar')
  @ApiOperation({ summary: 'Pesquisa por transliteração ou texto original' })
  @ApiQuery({ name: 'q', required: true })
  buscar(@Query('q') consulta: string) {
    return this.hebraicoService.buscarPorTransliteracao(consulta);
  }

  @Publico()
  @Get('raiz/:raiz')
  @ApiOperation({ summary: 'Busca palavras pela raiz' })
  buscarPorRaiz(@Param('raiz') raiz: string) {
    return this.hebraicoService.buscarPorRaiz(raiz);
  }

  @Publico()
  @Get('frequentes')
  @ApiOperation({ summary: 'Palavras hebraicas mais frequentes no AT' })
  frequentes(@Query('limite') limite?: number) {
    return this.hebraicoService.buscarFrequentes(limite ? +limite : 100);
  }
}
