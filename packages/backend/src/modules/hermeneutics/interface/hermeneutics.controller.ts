import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HermeneuticsService } from '../application/hermeneutics.service';

@ApiTags('Hermenêutica')
@Controller('hermeneutica')
export class HermeneuticsController {
  constructor(private readonly hermeneuticsService: HermeneuticsService) {}

  @Get(':livro/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Análise hermenêutica completa' })
  async analisar(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('versao') versao?: string,
  ) {
    return this.hermeneuticsService.analisarHermeneutica(livro, capitulo, versiculo, versao);
  }
}
