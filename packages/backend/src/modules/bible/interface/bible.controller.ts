import {
  Controller, Get, Param, Query, ParseIntPipe, DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BibleService } from '../application/bible.service';

@ApiTags('Bíblia')
@Controller('biblia')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get(':livro/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Buscar versículo específico' })
  @ApiParam({ name: 'livro', description: 'Nome do livro (ex: Gênesis, João)' })
  @ApiParam({ name: 'capitulo', description: 'Número do capítulo' })
  @ApiParam({ name: 'versiculo', description: 'Número do versículo' })
  @ApiQuery({ name: 'versao', required: false, description: 'Sigla da versão (ARA, NVI, ARC)' })
  async buscarVersiculo(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('versao') versao?: string,
  ) {
    return this.bibleService.buscarVersiculo(
      { livro, capitulo, versiculo },
      versao || 'ARA',
    );
  }

  @Get(':livro/:capitulo/:versiculo/contexto')
  @ApiOperation({ summary: 'Buscar contexto completo do versículo' })
  async buscarContexto(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Param('versiculo', ParseIntPipe) versiculo: number,
    @Query('versao') versao?: string,
    @Query('margem', new DefaultValuePipe(5), ParseIntPipe) margem?: number,
  ) {
    return this.bibleService.buscarContexto(
      { livro, capitulo, versiculo },
      versao || 'ARA',
      margem || 5,
    );
  }

  @Get(':livro/:capitulo')
  @ApiOperation({ summary: 'Buscar capítulo completo' })
  async buscarCapitulo(
    @Param('livro') livro: string,
    @Param('capitulo', ParseIntPipe) capitulo: number,
    @Query('versao') versao?: string,
  ) {
    return this.bibleService.buscarCapitulo({ livro, capitulo, versiculo: 1 }, versao || 'ARA');
  }

  @Get('busca')
  @ApiOperation({ summary: 'Buscar texto nas Escrituras' })
  @ApiQuery({ name: 'q', description: 'Termo de busca' })
  async buscarTexto(
    @Query('q') termo: string,
    @Query('versao') versao?: string,
    @Query('pagina', new DefaultValuePipe(1), ParseIntPipe) pagina?: number,
    @Query('limite', new DefaultValuePipe(20), ParseIntPipe) limite?: number,
  ) {
    return this.bibleService.buscarTexto(termo, versao || 'ARA', pagina, limite);
  }

  @Get('versoes')
  @ApiOperation({ summary: 'Listar todas as versões disponíveis' })
  async listarVersoes() {
    return this.bibleService.listarVersoes();
  }

  @Get('livros')
  @ApiOperation({ summary: 'Listar livros da Bíblia' })
  async listarLivros(@Query('versao') versao?: string) {
    return this.bibleService.listarLivros(versao || 'ARA');
  }
}
