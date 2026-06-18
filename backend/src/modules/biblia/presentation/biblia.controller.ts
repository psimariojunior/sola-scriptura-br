import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BibliaService } from '../application/biblia.service';
import { Publico } from '../../../common/decorators/publico.decorator';

@ApiTags('Bíblia')
@Controller('biblia')
export class BibliaController {
  constructor(private readonly bibliaService: BibliaService) {}

  @Publico()
  @Get('testamentos')
  @ApiOperation({ summary: 'Lista todos os testamentos' })
  listarTestamentos() {
    return this.bibliaService.listarTestamentos();
  }

  @Publico()
  @Get('livros')
  @ApiOperation({ summary: 'Lista todos os livros da Bíblia' })
  @ApiQuery({ name: 'testamentoId', required: false })
  listarLivros(@Query('testamentoId') testamentoId?: string) {
    return this.bibliaService.listarLivros(testamentoId);
  }

  @Publico()
  @Get('livros/:slug')
  @ApiOperation({ summary: 'Busca livro por slug' })
  buscarLivro(@Param('slug') slug: string) {
    return this.bibliaService.buscarPorSlug(slug);
  }

  @Publico()
  @Get('livros/:livroId/capitulos/:numero')
  @ApiOperation({ summary: 'Busca capítulo pelo número' })
  buscarCapitulo(@Param('livroId') livroId: string, @Param('numero') numero: number) {
    return this.bibliaService.buscarCapitulo(livroId, +numero);
  }

  @Publico()
  @Get('versiculos/:livroId/:capitulo/:versiculo')
  @ApiOperation({ summary: 'Busca versículo específico' })
  buscarVersiculo(
    @Param('livroId') livroId: string,
    @Param('capitulo') capitulo: number,
    @Param('versiculo') versiculo: number,
    @Query('traducaoId') traducaoId?: string,
  ) {
    return this.bibliaService.buscarVersiculo(livroId, +capitulo, +versiculo, traducaoId);
  }

  @Publico()
  @Get('passagem/:livroId/:capitulo/:inicio/:fim?')
  @ApiOperation({ summary: 'Busca uma passagem (intervalo de versículos)' })
  buscarPassagem(
    @Param('livroId') livroId: string,
    @Param('capitulo') capitulo: number,
    @Param('inicio') inicio: number,
    @Param('fim') fim?: number,
    @Query('traducaoId') traducaoId?: string,
  ) {
    return this.bibliaService.buscarPassagem(livroId, +capitulo, +inicio, fim ? +fim : undefined, traducaoId);
  }

  @Publico()
  @Get('traducoes')
  @ApiOperation({ summary: 'Lista todas as traduções disponíveis' })
  listarTraducoes() {
    return this.bibliaService.listarTraducoes();
  }

  @Publico()
  @Get('pesquisar')
  @ApiOperation({ summary: 'Pesquisa texto na Bíblia' })
  pesquisar(@Query('q') consulta: string, @Query('traducaoId') traducaoId?: string) {
    return this.bibliaService.pesquisar(consulta, traducaoId);
  }

  @Publico()
  @Get('palavras/:id')
  @ApiOperation({ summary: 'Busca detalhes completos de uma palavra' })
  buscarPalavra(@Param('id') id: string) {
    return this.bibliaService.buscarPalavraCompleta(id);
  }
}
