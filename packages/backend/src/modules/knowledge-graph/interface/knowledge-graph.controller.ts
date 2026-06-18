import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { KnowledgeGraphService } from '../application/knowledge-graph.service';

@ApiTags('Grafo de Conhecimento')
@Controller('grafo')
export class KnowledgeGraphController {
  constructor(private readonly kgService: KnowledgeGraphService) {}

  @Get('entidade/:nome')
  @ApiOperation({ summary: 'Buscar entidade no grafo de conhecimento' })
  async buscarEntidade(
    @Param('nome') nome: string,
    @Query('tipo') tipo?: string,
  ) {
    return this.kgService.buscarEntidade(nome, tipo);
  }

  @Get('entidades/:tipo')
  @ApiOperation({ summary: 'Listar entidades por tipo' })
  async listarPorTipo(@Param('tipo') tipo: string) {
    return this.kgService.listarEntidadesPorTipo(tipo);
  }

  @Get('tipos')
  @ApiOperation({ summary: 'Listar tipos de entidades' })
  async listarTipos() {
    return this.kgService.listarTiposEntidade();
  }

  @Get('relacoes/:entidadeId')
  @ApiOperation({ summary: 'Listar relações de uma entidade' })
  async listarRelacoes(@Param('entidadeId') entidadeId: string) {
    return this.kgService.listarRelacoesEntidade(entidadeId);
  }

  @Get('caminho')
  @ApiOperation({ summary: 'Buscar caminho entre duas entidades' })
  async buscarCaminho(
    @Query('origem') origem: string,
    @Query('destino') destino: string,
  ) {
    return this.kgService.buscarCaminho(origem, destino);
  }

  @Get('genealogia/:nome')
  @ApiOperation({ summary: 'Buscar linha genealógica' })
  async buscarGenealogia(@Param('nome') nome: string) {
    return this.kgService.buscarLinhaGenealogica(nome);
  }

  @Post('entidade')
  @ApiOperation({ summary: 'Criar nova entidade no grafo' })
  async criarEntidade(@Body() data: any) {
    return this.kgService.criarEntidade(data);
  }

  @Post('relacao')
  @ApiOperation({ summary: 'Criar nova relação no grafo' })
  async criarRelacao(@Body() data: any) {
    return this.kgService.criarRelacao(data);
  }
}
