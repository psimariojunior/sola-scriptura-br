import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ElasticsearchService } from '../../../infra/busca/elasticsearch.service';
import { PesquisaHistorico } from '../domain/pesquisa-historico.entity';
import { PesquisaSugestao } from '../domain/pesquisa-sugestao.entity';
import { Livro } from '../../biblia/domain/livro.entity';
import { Versiculo } from '../../biblia/domain/versiculo.entity';
import { Personagem } from '../../personagens/domain/personagem.entity';
import { Doutrina } from '../../teologia/domain/doutrina.entity';
import { ContextoHistorico } from '../../historia/domain/contexto-historico.entity';
import { Localizacao } from '../../geografia/domain/localizacao.entity';
import { PalavraGrega } from '../../grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../../hebraico/domain/palavra-hebraica.entity';
import { Verbete } from '../../dicionario/domain/verbete.entity';
import {
  PesquisaGeralDto,
  PesquisaAvancadaDto,
  TipoPesquisa,
} from './dto/pesquisa.dto';
import {
  PesquisaResultadoDto,
  ItemPesquisaDto,
  AutocompleteResultadoDto,
  SugestaoDto,
} from './dto/pesquisa-response.dto';

const INDICES_ES = {
  versiculos: 'versiculos',
  personagens: 'personagens',
  doutrinas: 'doutrinas',
  historia: 'contextos_historicos',
  geografia: 'localizacoes',
  grego: 'palavras_gregas',
  hebraico: 'palavras_hebraicas',
  dicionario: 'verbetes',
} as const;

@Injectable()
export class PesquisaService {
  private readonly logger = new Logger(PesquisaService.name);

  constructor(
    private readonly elasticsearch: ElasticsearchService,
    @InjectRepository(PesquisaHistorico)
    private readonly historicoRepo: Repository<PesquisaHistorico>,
    @InjectRepository(PesquisaSugestao)
    private readonly sugestaoRepo: Repository<PesquisaSugestao>,
    @InjectRepository(Livro)
    private readonly livroRepo: Repository<Livro>,
    @InjectRepository(Versiculo)
    private readonly versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Personagem)
    private readonly personagemRepo: Repository<Personagem>,
    @InjectRepository(Doutrina)
    private readonly doutrinaRepo: Repository<Doutrina>,
    @InjectRepository(ContextoHistorico)
    private readonly historiaRepo: Repository<ContextoHistorico>,
    @InjectRepository(Localizacao)
    private readonly geografiaRepo: Repository<Localizacao>,
    @InjectRepository(PalavraGrega)
    private readonly gregoRepo: Repository<PalavraGrega>,
    @InjectRepository(PalavraHebraica)
    private readonly hebraicoRepo: Repository<PalavraHebraica>,
    @InjectRepository(Verbete)
    private readonly dicionarioRepo: Repository<Verbete>,
  ) {}

  async pesquisar(
    dto: PesquisaGeralDto,
    usuarioId?: string,
  ): Promise<PesquisaResultadoDto> {
    const inicio = Date.now();
    const { q, page = 1, limit = 20, tipo = TipoPesquisa.ALL } = dto;

    let resultados: ItemPesquisaDto[] = [];
    const fontes: string[] = [];
    let total = 0;

    try {
      const esResultados = await this.buscaCompleta(q, page, limit);
      resultados = esResultados.resultados;
      total = esResultados.total;
      fontes.push(...esResultados.fontes);
    } catch (error) {
      this.logger.warn(`Elasticsearch indisponível, fallback para TypeORM: ${error.message}`);
      const ormResultados = await this.buscaOrmFallback(q, page, limit, tipo);
      resultados = ormResultados.resultados;
      total = ormResultados.total;
      fontes.push('typeorm');
    }

    if (tipo !== TipoPesquisa.ALL) {
      resultados = resultados.filter((r) => r.tipo === tipo);
      total = resultados.length;
    }

    await this.registrarBusca(usuarioId, q, { tipo }, total).catch((err) =>
      this.logger.warn(`Falha ao registrar busca: ${err.message}`),
    );

    await this.incrementarPesoSugestao(q).catch((err) =>
      this.logger.warn(`Falha ao incrementar peso da sugestão: ${err.message}`),
    );

    const tempoMs = Date.now() - inicio;

    return {
      resultados,
      total,
      page,
      limit,
      tempo_ms: tempoMs,
      fontes,
    };
  }

  async buscaCompleta(
    query: string,
    page = 1,
    limit = 20,
  ): Promise<PesquisaResultadoDto> {
    const inicio = Date.now();
    const indices = Object.values(INDICES_ES);
    const todosResultados: ItemPesquisaDto[] = [];
    const fontes: string[] = [];
    let total = 0;

    const resultadosES = await Promise.allSettled(
      indices.map((indice) =>
        this.elasticsearch.buscarTextoCompleto(indice, query, 1, limit),
      ),
    );

    for (let i = 0; i < resultadosES.length; i++) {
      const resultado = resultadosES[i];
      if (resultado.status === 'fulfilled') {
        const indice = indices[i];
        fontes.push(indice);
        const itens = resultado.value.map((hit) =>
          this.mapearHitParaItem(indice, hit),
        );
        todosResultados.push(...itens);
      }
    }

    todosResultados.sort((a, b) => b.relevancia - a.relevancia);
    total = todosResultados.length;

    const inicioPagina = (page - 1) * limit;
    const resultadosPaginados = todosResultados.slice(inicioPagina, inicioPagina + limit);

    const tempoMs = Date.now() - inicio;

    return {
      resultados: resultadosPaginados,
      total,
      page,
      limit,
      tempo_ms: tempoMs,
      fontes,
    };
  }

  async buscaSemantica(
    query: string,
    embedding: number[],
    page = 1,
    limit = 20,
  ): Promise<PesquisaResultadoDto> {
    const inicio = Date.now();
    const indices = Object.values(INDICES_ES);
    const todosResultados: ItemPesquisaDto[] = [];
    const fontes: string[] = [];
    let total = 0;

    const resultadosES = await Promise.allSettled(
      indices.map((indice) =>
        this.elasticsearch.buscarSemantica(indice, embedding, 1, limit),
      ),
    );

    for (let i = 0; i < resultadosES.length; i++) {
      const resultado = resultadosES[i];
      if (resultado.status === 'fulfilled') {
        const indice = indices[i];
        fontes.push(indice);
        const itens = resultado.value.map((hit) =>
          this.mapearHitParaItem(indice, hit),
        );
        todosResultados.push(...itens);
      }
    }

    todosResultados.sort((a, b) => b.relevancia - a.relevancia);
    total = todosResultados.length;

    const inicioPagina = (page - 1) * limit;
    const resultadosPaginados = todosResultados.slice(inicioPagina, inicioPagina + limit);

    const tempoMs = Date.now() - inicio;

    return {
      resultados: resultadosPaginados,
      total,
      page,
      limit,
      tempo_ms: tempoMs,
      fontes,
    };
  }

  async autocomplete(q: string, limite = 8): Promise<AutocompleteResultadoDto> {
    const sugestoesBanco = await this.sugestaoRepo
      .createQueryBuilder('s')
      .where('s.termo ILIKE :termo', { termo: `${q}%` })
      .orderBy('s.peso', 'DESC')
      .take(limite)
      .getMany();

    const sugestoes: SugestaoDto[] = sugestoesBanco.map((s) => ({
      termo: s.termo,
      peso: s.peso,
      categoria: s.categoria,
    }));

    if (sugestoes.length < limite) {
      const restante = limite - sugestoes.length;
      const livrosExistentes = new Set(sugestoes.map((s) => s.termo.toLowerCase()));

      const livros = await this.livroRepo
        .createQueryBuilder('l')
        .where('l.nome ILIKE :q', { q: `${q}%` })
        .orWhere('l.slug ILIKE :q', { q: `${q}%` })
        .take(restante)
        .getMany();

      for (const livro of livros) {
        if (!livrosExistentes.has(livro.nome.toLowerCase())) {
          sugestoes.push({
            termo: livro.nome,
            peso: 0,
            categoria: 'livro',
          });
        }
      }
    }

    return { sugestoes };
  }

  async buscarLivros(q: string): Promise<ItemPesquisaDto[]> {
    const livros = await this.livroRepo
      .createQueryBuilder('l')
      .where('l.nome ILIKE :q OR l.slug ILIKE :q OR l.nome_abreviado ILIKE :q', {
        q: `%${q}%`,
      })
      .orderBy('l.ordem_geral', 'ASC')
      .take(20)
      .getMany();

    return livros.map((livro) => ({
      tipo: 'livro',
      titulo: livro.nome,
      subtitulo: `${livro.nomeAbreviado} - ${livro.totalCapitulos} capítulos`,
      referencia: null,
      trecho: livro.temasPrincipais || livro.contextoHistorico || '',
      relevancia: 1.0,
      metadata: {
        id: livro.id,
        slug: livro.slug,
        autor: livro.autor,
        testamentoId: livro.testamentoId,
      },
    }));
  }

  async buscarVersiculos(
    q: string,
    filtros?: {
      livro?: string;
      testamento?: string;
      traducao?: string;
    },
  ): Promise<ItemPesquisaDto[]> {
    const query = this.versiculoRepo
      .createQueryBuilder('v')
      .leftJoinAndSelect('v.capitulo', 'c')
      .leftJoinAndSelect('c.livro', 'l')
      .where('v.texto ILIKE :q', { q: `%${q}%` });

    if (filtros?.livro) {
      query.andWhere('l.slug = :livro OR l.nome ILIKE :livroFuzzy', {
        livro: filtros.livro,
        livroFuzzy: `%${filtros.livro}%`,
      });
    }
    if (filtros?.testamento) {
      query.andWhere('v.testamentoId = :testamento', {
        testamento: filtros.testamento,
      });
    }
    if (filtros?.traducao) {
      query.andWhere('v.traducaoId = :traducao', {
        traducao: filtros.traducao,
      });
    }

    const versiculos = await query.take(20).getMany();

    return versiculos.map((v) => ({
      tipo: 'versiculo',
      titulo: `${v.capitulo?.livro?.nome || ''} ${v.capituloNumero}:${v.numero}`,
      subtitulo: v.capitulo?.livro?.nomeAbreviado,
      referencia: `${v.capituloNumero}:${v.numero}`,
      trecho: v.texto,
      relevancia: 1.0,
      metadata: {
        id: v.id,
        livroId: v.livroId,
        capituloNumero: v.capituloNumero,
        numero: v.numero,
        traducaoId: v.traducaoId,
      },
    }));
  }

  async buscarPersonagens(q: string): Promise<ItemPesquisaDto[]> {
    const personagens = await this.personagemRepo
      .createQueryBuilder('p')
      .where(
        'p.nome_portugues ILIKE :q OR p.nome_original ILIKE :q OR p.nome_hebraico ILIKE :q OR p.nome_grego ILIKE :q',
        { q: `%${q}%` },
      )
      .orderBy('p.total_mencoes', 'DESC')
      .take(20)
      .getMany();

    return personagens.map((p) => ({
      tipo: 'personagem',
      titulo: p.nomePortugues,
      subtitulo: [p.nomeOriginal, p.nomeHebraico, p.nomeGrego].filter(Boolean).join(' / '),
      referencia: null,
      trecho: p.biografia?.substring(0, 200) || '',
      relevancia: 1.0,
      metadata: {
        id: p.id,
        slug: p.slug,
        totalMencoes: p.totalMencoes,
        significadoNome: p.significadoNome,
      },
    }));
  }

  async buscarDoutrinas(q: string): Promise<ItemPesquisaDto[]> {
    const doutrinas = await this.doutrinaRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.categoria', 'c')
      .where('d.nome ILIKE :q OR d.definicao ILIKE :q OR d.explicacao ILIKE :q', {
        q: `%${q}%`,
      })
      .orderBy('d.nome', 'ASC')
      .take(20)
      .getMany();

    return doutrinas.map((d) => ({
      tipo: 'doutrina',
      titulo: d.nome,
      subtitulo: d.categoria?.nome,
      referencia: null,
      trecho: d.definicao || '',
      relevancia: 1.0,
      metadata: {
        id: d.id,
        slug: d.slug,
        categoriaId: d.categoriaId,
        passagensChave: d.passagensChave,
      },
    }));
  }

  async buscarHistoria(q: string): Promise<ItemPesquisaDto[]> {
    const contextos = await this.historiaRepo
      .createQueryBuilder('ch')
      .where(
        'ch.autor ILIKE :q OR ch.contexto_politico ILIKE :q OR ch.contexto_religioso ILIKE :q OR ch.contexto_cultural ILIKE :q OR ch.significado_teologico ILIKE :q',
        { q: `%${q}%` },
      )
      .take(20)
      .getMany();

    return contextos.map((c) => ({
      tipo: 'historia',
      titulo: `${c.entidadeTipo} - ${c.autor || 'Contexto Histórico'}`,
      subtitulo: c.dataEstimada,
      referencia: null,
      trecho:
        c.contextoPolitico?.substring(0, 200) ||
        c.contextoCultural?.substring(0, 200) ||
        '',
      relevancia: 1.0,
      metadata: {
        id: c.id,
        entidadeTipo: c.entidadeTipo,
        entidadeId: c.entidadeId,
        imperiosEnvolvidos: c.imperiosEnvolvidos,
      },
    }));
  }

  async buscarGeografia(q: string): Promise<ItemPesquisaDto[]> {
    const localizacoes = await this.geografiaRepo
      .createQueryBuilder('loc')
      .where(
        'loc.nome_portugues ILIKE :q OR loc.nome_original ILIKE :q OR loc.nome_ingles ILIKE :q OR loc.regiao ILIKE :q',
        { q: `%${q}%` },
      )
      .orderBy('loc.nome_portugues', 'ASC')
      .take(20)
      .getMany();

    return localizacoes.map((loc) => ({
      tipo: 'geografia',
      titulo: loc.nomePortugues,
      subtitulo: [loc.regiao, loc.paisAtual].filter(Boolean).join(', '),
      referencia: null,
      trecho: loc.descricao?.substring(0, 200) || '',
      relevancia: 1.0,
      metadata: {
        id: loc.id,
        slug: loc.slug,
        tipo: loc.tipo,
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
    }));
  }

  async buscarGrego(q: string): Promise<ItemPesquisaDto[]> {
    const palavras = await this.gregoRepo
      .createQueryBuilder('pg')
      .where(
        'pg.palavra_original ILIKE :q OR pg.lemma ILIKE :q OR pg.transliteracao ILIKE :q OR pg.strong ILIKE :q OR pg.definicao_curta ILIKE :q',
        { q: `%${q}%` },
      )
      .orderBy('pg.frequencia_nt', 'DESC')
      .take(20)
      .getMany();

    return palavras.map((p) => ({
      tipo: 'grego',
      titulo: `${p.palavraOriginal} (${p.strong})`,
      subtitulo: p.transliteracao,
      referencia: p.strong,
      trecho: p.definicaoCurta,
      relevancia: 1.0,
      metadata: {
        id: p.id,
        strong: p.strong,
        classeGramatical: p.classeGramatical,
        frequenciaNT: p.frequenciaNT,
      },
    }));
  }

  async buscarHebraico(q: string): Promise<ItemPesquisaDto[]> {
    const palavras = await this.hebraicoRepo
      .createQueryBuilder('ph')
      .where(
        'ph.palavra_original ILIKE :q OR ph.lemma ILIKE :q OR ph.transliteracao ILIKE :q OR ph.strong ILIKE :q OR ph.definicao_curta ILIKE :q',
        { q: `%${q}%` },
      )
      .orderBy('ph.frequencia_at', 'DESC')
      .take(20)
      .getMany();

    return palavras.map((p) => ({
      tipo: 'hebraico',
      titulo: `${p.palavraOriginal} (${p.strong})`,
      subtitulo: p.transliteracao,
      referencia: p.strong,
      trecho: p.definicaoCurta,
      relevancia: 1.0,
      metadata: {
        id: p.id,
        strong: p.strong,
        classeGramatical: p.classeGramatical,
        frequenciaAT: p.frequenciaAT,
      },
    }));
  }

  async buscarDicionario(q: string): Promise<ItemPesquisaDto[]> {
    const verbetes = await this.dicionarioRepo
      .createQueryBuilder('v')
      .where(
        'v.titulo ILIKE :q OR v.definicao ILIKE :q OR v.explicacao ILIKE :q OR v.categoria ILIKE :q',
        { q: `%${q}%` },
      )
      .orderBy('v.titulo', 'ASC')
      .take(20)
      .getMany();

    return verbetes.map((v) => ({
      tipo: 'dicionario',
      titulo: v.titulo,
      subtitulo: v.categoria,
      referencia: null,
      trecho: v.definicao?.substring(0, 200) || '',
      relevancia: 1.0,
      metadata: {
        id: v.id,
        slug: v.slug,
        sinonimos: v.sinonimos,
        referenciasBiblicas: v.referenciasBiblicas,
      },
    }));
  }

  async registrarBusca(
    usuarioId: string | undefined,
    consulta: string,
    filtros: Record<string, any>,
    count: number,
  ): Promise<void> {
    const historico = this.historicoRepo.create({
      usuarioId: usuarioId || null,
      consulta,
      filtros,
      resultadosCount: count,
    });
    await this.historicoRepo.save(historico);
  }

  async sugestoesPopulares(limite = 10): Promise<SugestaoDto[]> {
    const sugestoes = await this.sugestaoRepo
      .createQueryBuilder('s')
      .orderBy('s.peso', 'DESC')
      .take(limite)
      .getMany();

    return sugestoes.map((s) => ({
      termo: s.termo,
      peso: s.peso,
      categoria: s.categoria,
    }));
  }

  async historicoBuscas(
    usuarioId: string,
    limite = 20,
  ): Promise<PesquisaHistorico[]> {
    return this.historicoRepo
      .createQueryBuilder('h')
      .where('h.usuario_id = :usuarioId', { usuarioId })
      .orderBy('h.criado_em', 'DESC')
      .take(limite)
      .getMany();
  }

  private async incrementarPesoSugestao(termo: string): Promise<void> {
    const normalizado = termo.trim().toLowerCase();
    if (!normalizado) return;

    let sugestao = await this.sugestaoRepo.findOne({ where: { termo: normalizado } });
    if (sugestao) {
      sugestao.peso += 1;
      await this.sugestaoRepo.save(sugestao);
    } else {
      sugestao = this.sugestaoRepo.create({
        termo: normalizado,
        peso: 1,
        categoria: null,
      });
      await this.sugestaoRepo.save(sugestao);
    }
  }

  private async buscaOrmFallback(
    q: string,
    page: number,
    limit: number,
    tipo: TipoPesquisa,
  ): Promise<PesquisaResultadoDto> {
    const inicio = Date.now();
    const todosResultados: ItemPesquisaDto[] = [];
    const fontes: string[] = ['typeorm'];

    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.VERSICULOS) {
      const versiculos = await this.buscarVersiculos(q);
      todosResultados.push(...versiculos);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.PERSONAGENS) {
      const personagens = await this.buscarPersonagens(q);
      todosResultados.push(...personagens);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.DOCTRINAS) {
      const doutrinas = await this.buscarDoutrinas(q);
      todosResultados.push(...doutrinas);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.HISTORIA) {
      const historia = await this.buscarHistoria(q);
      todosResultados.push(...historia);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.GEOGRAFIA) {
      const geografia = await this.buscarGeografia(q);
      todosResultados.push(...geografia);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.GREGO) {
      const grego = await this.buscarGrego(q);
      todosResultados.push(...grego);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.HEBRAICO) {
      const hebraico = await this.buscarHebraico(q);
      todosResultados.push(...hebraico);
    }
    if (tipo === TipoPesquisa.ALL || tipo === TipoPesquisa.DICIONARIO) {
      const dicionario = await this.buscarDicionario(q);
      todosResultados.push(...dicionario);
    }

    const total = todosResultados.length;
    const inicioPagina = (page - 1) * limit;
    const resultadosPaginados = todosResultados.slice(inicioPagina, inicioPagina + limit);

    return {
      resultados: resultadosPaginados,
      total,
      page,
      limit,
      tempo_ms: Date.now() - inicio,
      fontes,
    };
  }

  private mapearHitParaItem(
    indice: string,
    hit: { id: string; score: number; fonte: any },
  ): ItemPesquisaDto {
    const { id, score, fonte } = hit;

    switch (indice) {
      case INDICES_ES.versiculos:
        return {
          tipo: 'versiculo',
          titulo: `${fonte.livro_nome || ''} ${fonte.capitulo_numero}:${fonte.numero}`,
          subtitulo: fonte.livro_nome_abreviado,
          referencia: `${fonte.capitulo_numero}:${fonte.numero}`,
          trecho: fonte.texto || '',
          relevancia: score,
          metadata: { id, ...fonte },
        };
      case INDICES_ES.personagens:
        return {
          tipo: 'personagem',
          titulo: fonte.nome_portugues,
          subtitulo: [fonte.nome_original, fonte.nome_hebraico].filter(Boolean).join(' / '),
          referencia: null,
          trecho: fonte.biografia?.substring(0, 200) || '',
          relevancia: score,
          metadata: { id, slug: fonte.slug },
        };
      case INDICES_ES.doutrinas:
        return {
          tipo: 'doutrina',
          titulo: fonte.nome,
          subtitulo: fonte.categoria_nome,
          referencia: null,
          trecho: fonte.definicao || '',
          relevancia: score,
          metadata: { id, slug: fonte.slug },
        };
      case INDICES_ES.historia:
        return {
          tipo: 'historia',
          titulo: `${fonte.entidade_tipo} - ${fonte.autor || 'Contexto'}`,
          subtitulo: fonte.data_estimada,
          referencia: null,
          trecho: fonte.contexto_politico?.substring(0, 200) || '',
          relevancia: score,
          metadata: { id, entidadeTipo: fonte.entidade_tipo },
        };
      case INDICES_ES.geografia:
        return {
          tipo: 'geografia',
          titulo: fonte.nome_portugues,
          subtitulo: [fonte.regiao, fonte.pais_atual].filter(Boolean).join(', '),
          referencia: null,
          trecho: fonte.descricao?.substring(0, 200) || '',
          relevancia: score,
          metadata: { id, slug: fonte.slug, tipo: fonte.tipo },
        };
      case INDICES_ES.grego:
        return {
          tipo: 'grego',
          titulo: `${fonte.palavra_original} (${fonte.strong})`,
          subtitulo: fonte.transliteracao,
          referencia: fonte.strong,
          trecho: fonte.definicao_curta || '',
          relevancia: score,
          metadata: { id, strong: fonte.strong },
        };
      case INDICES_ES.hebraico:
        return {
          tipo: 'hebraico',
          titulo: `${fonte.palavra_original} (${fonte.strong})`,
          subtitulo: fonte.transliteracao,
          referencia: fonte.strong,
          trecho: fonte.definicao_curta || '',
          relevancia: score,
          metadata: { id, strong: fonte.strong },
        };
      case INDICES_ES.dicionario:
        return {
          tipo: 'dicionario',
          titulo: fonte.titulo,
          subtitulo: fonte.categoria,
          referencia: null,
          trecho: fonte.definicao?.substring(0, 200) || '',
          relevancia: score,
          metadata: { id, slug: fonte.slug },
        };
      default:
        return {
          tipo: 'desconhecido',
          titulo: fonte.titulo || fonte.nome || 'Resultado',
          subtitulo: null,
          referencia: null,
          trecho: '',
          relevancia: score,
          metadata: { id, ...fonte },
        };
    }
  }
}
