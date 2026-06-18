import { Controller, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ReferenceService } from '../application/reference.service';

@ApiTags('Referências Cruzadas')
@Controller('referencias')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get(':livro/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Buscar referências cruzadas para um versículo' })
  async buscarReferencias(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
  ) {
    return this.referenceService.buscarReferencias(livro, capitulo, versiculo);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova referência cruzada' })
  async criarReferencia(@Body() data: any) {
    return this.referenceService.criarReferencia(data);
  }
}
