import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExegesisService } from '../application/exegesis.service';

@ApiTags('Exegese')
@Controller('exegese')
export class ExegesisController {
  constructor(private readonly exegesisService: ExegesisService) {}

  @Get(':livro/:capitulo/:versiculo/contexto')
  @ApiOperation({ summary: 'Análise de contexto imediato e literário' })
  async contexto(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('versao') versao?: string,
  ) {
    return this.exegesisService.analisarContexto(livro, capitulo, versiculo, versao);
  }

  @Get(':livro/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Análise exegética completa' })
  async analiseCompleta(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('versao') versao?: string,
  ) {
    return this.exegesisService.analiseExegeticaCompleta(livro, capitulo, versiculo, versao);
  }
}
