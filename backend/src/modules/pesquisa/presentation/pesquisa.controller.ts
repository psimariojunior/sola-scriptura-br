import { Controller, Get, Post, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { PesquisaService } from '../application/pesquisa.service';
import { PesquisaIndexService } from '../application/pesquisa-index.service';
import {
  PesquisaGeralDto,
  PesquisaAvancadaDto,
  AutocompleteDto,
} from '../application/dto/pesquisa.dto';
import { Publico } from '../../../common/decorators/publico.decorator';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';

@ApiTags('Pesquisa')
@Controller('pesquisa')
export class PesquisaController {
  constructor(
    private readonly pesquisaService: PesquisaService,
    private readonly indexService: PesquisaIndexService,
  ) {}

  @Publico()
  @Get()
  @ApiOperation({
    summary: 'Pesquisa geral em todos os dados bíblicos',
    description:
      'Busca versículos, personagens, doutrinas, história, geografia, léxicos e dicionário usando Elasticsearch com fallback para TypeORM.',
  })
  pesquisar(@Query() dto: PesquisaGeralDto, @Query('usuario_id') usuarioId?: string) {
    return this.pesquisaService.pesquisar(dto, usuarioId);
  }

  @Publico()
  @Get('avancada')
  @ApiOperation({
    summary: 'Pesquisa avançada com filtros',
    description:
      'Busca avançada com filtros por livro, testamento, autor, período, categoria, tradução e data.',
  })
  pesquisarAvancada(
    @Query() dto: PesquisaAvancadaDto,
    @Query('usuario_id') usuarioId?: string,
  ) {
    return this.pesquisaService.pesquisar(dto, usuarioId);
  }

  @Publico()
  @Get('autocomplete')
  @ApiOperation({
    summary: 'Autocomplete para termos de busca',
    description:
      'Retorna sugestões de termos populares e nomes de livros para preenchimento automático.',
  })
  autocomplete(@Query() dto: AutocompleteDto) {
    return this.pesquisaService.autocomplete(dto.q, dto.limite);
  }

  @Publico()
  @Get('populares')
  @ApiOperation({ summary: 'Buscas populares / trending' })
  @ApiQuery({ name: 'limite', required: false, type: Number })
  populares(@Query('limite') limite?: number) {
    return this.pesquisaService.sugestoesPopulares(limite || 10);
  }

  @Get('historico')
  @ApiOperation({ summary: 'Histórico de buscas do usuário autenticado' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'limite', required: false, type: Number })
  historico(
    @UsuarioAtual() usuario: any,
    @Query('limite') limite?: number,
  ) {
    return this.pesquisaService.historicoBuscas(usuario.id, limite || 20);
  }

  @Post('historico')
  @ApiOperation({ summary: 'Registra uma busca no histórico' })
  @ApiBearerAuth()
  registrarHistorico(
    @UsuarioAtual() usuario: any,
    @Body()
    body: {
      consulta: string;
      filtros?: Record<string, any>;
      resultados_count?: number;
    },
  ) {
    return this.pesquisaService.registrarBusca(
      usuario.id,
      body.consulta,
      body.filtros || {},
      body.resultados_count || 0,
    );
  }

  @Publico()
  @Get('livros')
  @ApiOperation({ summary: 'Pesquisa livros da Bíblia' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarLivros(@Query('q') q: string) {
    return this.pesquisaService.buscarLivros(q);
  }

  @Publico()
  @Get('versiculos')
  @ApiOperation({ summary: 'Pesquisa versículos com filtros' })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'livro', required: false, type: String })
  @ApiQuery({ name: 'testamento', required: false, type: String })
  @ApiQuery({ name: 'traducao', required: false, type: String })
  buscarVersiculos(
    @Query('q') q: string,
    @Query('livro') livro?: string,
    @Query('testamento') testamento?: string,
    @Query('traducao') traducao?: string,
  ) {
    return this.pesquisaService.buscarVersiculos(q, { livro, testamento, traducao });
  }

  @Publico()
  @Get('personagens')
  @ApiOperation({ summary: 'Pesquisa personagens bíblicos' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarPersonagens(@Query('q') q: string) {
    return this.pesquisaService.buscarPersonagens(q);
  }

  @Publico()
  @Get('doutrinas')
  @ApiOperation({ summary: 'Pesquisa doutrinas teológicas' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarDoutrinas(@Query('q') q: string) {
    return this.pesquisaService.buscarDoutrinas(q);
  }

  @Publico()
  @Get('historia')
  @ApiOperation({ summary: 'Pesquisa contextos históricos' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarHistoria(@Query('q') q: string) {
    return this.pesquisaService.buscarHistoria(q);
  }

  @Publico()
  @Get('geografia')
  @ApiOperation({ summary: 'Pesquisa localizações bíblicas' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarGeografia(@Query('q') q: string) {
    return this.pesquisaService.buscarGeografia(q);
  }

  @Publico()
  @Get('grego')
  @ApiOperation({ summary: 'Pesquisa léxico grego (Strong\'s)' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarGrego(@Query('q') q: string) {
    return this.pesquisaService.buscarGrego(q);
  }

  @Publico()
  @Get('hebraico')
  @ApiOperation({ summary: 'Pesquisa léxico hebraico (Strong\'s)' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarHebraico(@Query('q') q: string) {
    return this.pesquisaService.buscarHebraico(q);
  }

  @Publico()
  @Get('dicionario')
  @ApiOperation({ summary: 'Pesquisa dicionário bíblico' })
  @ApiQuery({ name: 'q', required: true, type: String })
  buscarDicionario(@Query('q') q: string) {
    return this.pesquisaService.buscarDicionario(q);
  }

  @Publico()
  @Get('semantica')
  @ApiOperation({
    summary: 'Pesquisa semântica por similaridade vetorial',
    description: 'Busca usando embeddings vetoriais (pgvector) para matching semântico.',
  })
  @ApiQuery({ name: 'q', required: true, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  buscaSemantica(
    @Query('q') q: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.pesquisaService.buscaCompleta(q, page || 1, limit || 20);
  }

  @Publico()
  @Post('indexar')
  @ApiOperation({
    summary: 'Indexa todos os dados no Elasticsearch',
    description: 'Indexação em lote de todos os dados do banco para o Elasticsearch.',
  })
  async indexarTudo() {
    return this.indexService.indexarTudo();
  }

  @Publico()
  @Post('recriar-indices')
  @ApiOperation({
    summary: 'Deleta e recria todos os índices do Elasticsearch',
    description:
      'Atenção: isso apaga todos os dados indexados e refaz do zero.',
  })
  async recriarIndices() {
    await this.indexService.recriarIndices();
    return { mensagem: 'Índices recriados com sucesso' };
  }
}
