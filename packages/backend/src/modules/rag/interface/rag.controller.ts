import { Controller, Post, Body, Query, Get, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RagService } from '../application/rag.service';

@ApiTags('RAG - Busca Aumentada por Recuperação')
@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('contexto')
  @ApiOperation({ summary: 'Buscar contexto aumentado para uma consulta' })
  async buscarContexto(
    @Body('consulta') consulta: string,
    @Body('limite', new DefaultValuePipe(10), ParseIntPipe) limite?: number,
  ) {
    return this.ragService.buscarContexto(consulta, limite || 10);
  }

  @Post('embedding')
  @ApiOperation({ summary: 'Extrair embedding de um texto' })
  async extrairEmbedding(@Body('texto') texto: string) {
    return this.ragService.extrairEmbedding(texto);
  }
}
