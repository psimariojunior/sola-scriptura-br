import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElasticsearchService } from '../../../infra/busca/elasticsearch.service';
import { Versiculo } from '../../biblia/domain/versiculo.entity';
import { Livro } from '../../biblia/domain/livro.entity';
import { Personagem } from '../../personagens/domain/personagem.entity';
import { Doutrina } from '../../teologia/domain/doutrina.entity';
import { ContextoHistorico } from '../../historia/domain/contexto-historico.entity';
import { Localizacao } from '../../geografia/domain/localizacao.entity';
import { PalavraGrega } from '../../grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../../hebraico/domain/palavra-hebraica.entity';

const LOTE_TAMANHO = 500;

const INDICES_CONFIG: Record<string, any> = {
  versiculos: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          portugues: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding', 'stop', 'portuguese_stemmer'],
          },
        },
        filter: {
          portuguese_stemmer: {
            type: 'stemmer',
            language: 'portuguese',
          },
        },
      },
    },
    mappings: {
      properties: {
        texto: { type: 'text', analyzer: 'portugues' },
        livro_nome: { type: 'text', analyzer: 'portugues' },
        livro_nome_abreviado: { type: 'keyword' },
        livro_slug: { type: 'keyword' },
        capitulo_numero: { type: 'integer' },
        numero: { type: 'integer' },
        traducao_id: { type: 'keyword' },
        testamento_id: { type: 'keyword' },
      },
    },
  },
  personagens: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          portugues: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding', 'portuguese_stemmer'],
          },
        },
        filter: {
          portuguese_stemmer: {
            type: 'stemmer',
            language: 'portuguese',
          },
        },
      },
    },
    mappings: {
      properties: {
        nome_portugues: { type: 'text', analyzer: 'portugues' },
        nome_original: { type: 'text' },
        nome_hebraico: { type: 'text' },
        nome_grego: { type: 'text' },
        slug: { type: 'keyword' },
        biografia: { type: 'text', analyzer: 'portugues' },
        significado_nome: { type: 'text', analyzer: 'portugues' },
        total_mencoes: { type: 'integer' },
      },
    },
  },
  doutrinas: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          portugues: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding', 'portuguese_stemmer'],
          },
        },
        filter: {
          portuguese_stemmer: {
            type: 'stemmer',
            language: 'portuguese',
          },
        },
      },
    },
    mappings: {
      properties: {
        nome: { type: 'text', analyzer: 'portugues' },
        slug: { type: 'keyword' },
        definicao: { type: 'text', analyzer: 'portugues' },
        explicacao: { type: 'text', analyzer: 'portugues' },
        base_scriptura: { type: 'text' },
        categoria_nome: { type: 'keyword' },
        passagens_chave: { type: 'text' },
      },
    },
  },
  contextos_historicos: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          portugues: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding', 'portuguese_stemmer'],
          },
        },
        filter: {
          portuguese_stemmer: {
            type: 'stemmer',
            language: 'portuguese',
          },
        },
      },
    },
    mappings: {
      properties: {
        entidade_tipo: { type: 'keyword' },
        autor: { type: 'text', analyzer: 'portugues' },
        data_estimada: { type: 'keyword' },
        contexto_politico: { type: 'text', analyzer: 'portugues' },
        contexto_religioso: { type: 'text', analyzer: 'portugues' },
        contexto_economico: { type: 'text', analyzer: 'portugues' },
        contexto_cultural: { type: 'text', analyzer: 'portugues' },
        significado_teologico: { type: 'text', analyzer: 'portugues' },
      },
    },
  },
  localizacoes: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
      analysis: {
        analyzer: {
          portugues: {
            type: 'custom',
            tokenizer: 'standard',
            filter: ['lowercase', 'asciifolding', 'portuguese_stemmer'],
          },
        },
        filter: {
          portuguese_stemmer: {
            type: 'stemmer',
            language: 'portuguese',
          },
        },
      },
    },
    mappings: {
      properties: {
        nome_portugues: { type: 'text', analyzer: 'portugues' },
        nome_original: { type: 'text' },
        nome_ingles: { type: 'text' },
        slug: { type: 'keyword' },
        tipo: { type: 'keyword' },
        regiao: { type: 'text', analyzer: 'portugues' },
        pais_atual: { type: 'text', analyzer: 'portugues' },
        descricao: { type: 'text', analyzer: 'portugues' },
        historia: { type: 'text', analyzer: 'portugues' },
        latitude: { type: 'double' },
        longitude: { type: 'double' },
      },
    },
  },
  palavras_gregas: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
    },
    mappings: {
      properties: {
        palavra_original: { type: 'text' },
        strong: { type: 'keyword' },
        lemma: { type: 'text' },
        transliteracao: { type: 'text' },
        definicao_curta: { type: 'text' },
        definicao_completa: { type: 'text' },
        classe_gramatical: { type: 'keyword' },
        frequencia_nt: { type: 'integer' },
        frequencia_at: { type: 'integer' },
      },
    },
  },
  palavras_hebraicas: {
    settings: {
      number_of_shards: 1,
      number_of_replicas: 0,
    },
    mappings: {
      properties: {
        palavra_original: { type: 'text' },
        strong: { type: 'keyword' },
        lemma: { type: 'text' },
        transliteracao: { type: 'text' },
        definicao_curta: { type: 'text' },
        definicao_completa: { type: 'text' },
        classe_gramatical: { type: 'keyword' },
        frequencia_at: { type: 'integer' },
      },
    },
  },
};

@Injectable()
export class PesquisaIndexService {
  private readonly logger = new Logger(PesquisaIndexService.name);

  constructor(
    private readonly elasticsearch: ElasticsearchService,
    @InjectRepository(Versiculo)
    private readonly versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Livro)
    private readonly livroRepo: Repository<Livro>,
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
  ) {}

  async indexarVersiculos(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'versiculos';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.versiculoRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} versículos...`);

    while (offset < total) {
      const versiculos = await this.versiculoRepo
        .createQueryBuilder('v')
        .leftJoinAndSelect('v.capitulo', 'c')
        .leftJoinAndSelect('c.livro', 'l')
        .skip(offset)
        .take(LOTE_TAMANHO)
        .getMany();

      for (const v of versiculos) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: v.id,
            corpo: {
              texto: v.texto,
              livro_nome: v.capitulo?.livro?.nome || '',
              livro_nome_abreviado: v.capitulo?.livro?.nomeAbreviado || '',
              livro_slug: v.capitulo?.livro?.slug || '',
              capitulo_numero: v.capituloNumero,
              numero: v.numero,
              traducao_id: v.traducaoId,
              testamento_id: v.testamentoId,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar versículo ${v.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Versículos indexados: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarPersonagens(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'personagens';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.personagemRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} personagens...`);

    while (offset < total) {
      const personagens = await this.personagemRepo.find({
        skip: offset,
        take: LOTE_TAMANHO,
      });

      for (const p of personagens) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: p.id,
            corpo: {
              nome_portugues: p.nomePortugues,
              nome_original: p.nomeOriginal,
              nome_hebraico: p.nomeHebraico,
              nome_grego: p.nomeGrego,
              slug: p.slug,
              biografia: p.biografia,
              significado_nome: p.significadoNome,
              total_mencoes: p.totalMencoes,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar personagem ${p.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Personagens indexados: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarDoutrinas(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'doutrinas';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.doutrinaRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} doutrinas...`);

    while (offset < total) {
      const doutrinas = await this.doutrinaRepo
        .createQueryBuilder('d')
        .leftJoinAndSelect('d.categoria', 'c')
        .skip(offset)
        .take(LOTE_TAMANHO)
        .getMany();

      for (const d of doutrinas) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: d.id,
            corpo: {
              nome: d.nome,
              slug: d.slug,
              definicao: d.definicao,
              explicacao: d.explicacao,
              base_scriptura: d.baseScriptura,
              categoria_nome: d.categoria?.nome || '',
              passagens_chave: d.passagensChave?.join(' ') || '',
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar doutrina ${d.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Doutrinas indexadas: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarHistoria(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'contextos_historicos';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.historiaRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} contextos históricos...`);

    while (offset < total) {
      const contextos = await this.historiaRepo.find({
        skip: offset,
        take: LOTE_TAMANHO,
      });

      for (const c of contextos) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: c.id,
            corpo: {
              entidade_tipo: c.entidadeTipo,
              autor: c.autor,
              data_estimada: c.dataEstimada,
              contexto_politico: c.contextoPolitico,
              contexto_religioso: c.contextoReligioso,
              contexto_economico: c.contextoEconomico,
              contexto_cultural: c.contextoCultural,
              significado_teologico: c.significadoTeologico,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar contexto histórico ${c.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Contextos históricos indexados: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarGeografia(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'localizacoes';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.geografiaRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} localizações...`);

    while (offset < total) {
      const localizacoes = await this.geografiaRepo.find({
        skip: offset,
        take: LOTE_TAMANHO,
      });

      for (const loc of localizacoes) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: loc.id,
            corpo: {
              nome_portugues: loc.nomePortugues,
              nome_original: loc.nomeOriginal,
              nome_ingles: loc.nomeIngles,
              slug: loc.slug,
              tipo: loc.tipo,
              regiao: loc.regiao,
              pais_atual: loc.paisAtual,
              descricao: loc.descricao,
              historia: loc.historia,
              latitude: loc.latitude,
              longitude: loc.longitude,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar localização ${loc.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Localizações indexadas: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarGrego(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'palavras_gregas';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.gregoRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} palavras gregas...`);

    while (offset < total) {
      const palavras = await this.gregoRepo.find({
        skip: offset,
        take: LOTE_TAMANHO,
      });

      for (const p of palavras) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: p.id,
            corpo: {
              palavra_original: p.palavraOriginal,
              strong: p.strong,
              lemma: p.lemma,
              transliteracao: p.transliteracao,
              definicao_curta: p.definicaoCurta,
              definicao_completa: p.definicaoCompleta,
              classe_gramatical: p.classeGramatical,
              frequencia_nt: p.frequenciaNT,
              frequencia_at: p.frequenciaAT,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar palavra grega ${p.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Palavras gregas indexadas: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarHebraico(): Promise<{ indexados: number; erros: number }> {
    const nomeIndice = 'palavras_hebraicas';
    await this.elasticsearch.criarIndice(nomeIndice, INDICES_CONFIG[nomeIndice]);

    const total = await this.hebraicoRepo.count();
    let indexados = 0;
    let erros = 0;
    let offset = 0;

    this.logger.log(`Indexando ${total} palavras hebraicas...`);

    while (offset < total) {
      const palavras = await this.hebraicoRepo.find({
        skip: offset,
        take: LOTE_TAMANHO,
      });

      for (const p of palavras) {
        try {
          await this.elasticsearch.indexar({
            indice: nomeIndice,
            id: p.id,
            corpo: {
              palavra_original: p.palavraOriginal,
              strong: p.strong,
              lemma: p.lemma,
              transliteracao: p.transliteracao,
              definicao_curta: p.definicaoCurta,
              definicao_completa: p.definicaoCompleta,
              classe_gramatical: p.classeGramatical,
              frequencia_at: p.frequenciaAT,
            },
          });
          indexados++;
        } catch (error) {
          erros++;
          this.logger.error(`Erro ao indexar palavra hebraica ${p.id}: ${error.message}`);
        }
      }

      offset += LOTE_TAMANHO;
    }

    this.logger.log(`Palavras hebraicas indexadas: ${indexados}, erros: ${erros}`);
    return { indexados, erros };
  }

  async indexarTudo(): Promise<Record<string, { indexados: number; erros: number }>> {
    this.logger.log('Iniciando indexação completa...');

    const resultados: Record<string, { indexados: number; erros: number }> = {};

    resultados.versiculos = await this.indexarVersiculos();
    resultados.personagens = await this.indexarPersonagens();
    resultados.doutrinas = await this.indexarDoutrinas();
    resultados.historia = await this.indexarHistoria();
    resultados.geografia = await this.indexarGeografia();
    resultados.grego = await this.indexarGrego();
    resultados.hebraico = await this.indexarHebraico();

    this.logger.log('Indexação completa finalizada.');
    return resultados;
  }

  async recriarIndices(): Promise<void> {
    this.logger.log('Recriando todos os índices...');

    const nomesIndices = Object.keys(INDICES_CONFIG);

    for (const nome of nomesIndices) {
      try {
        const existe = await this.elasticsearch['client'].indices.exists({ index: nome });
        if (existe) {
          await this.elasticsearch['client'].indices.delete({ index: nome });
          this.logger.log(`Índice ${nome} deletado`);
        }
      } catch (error) {
        this.logger.warn(`Erro ao deletar índice ${nome}: ${error.message}`);
      }
    }

    for (const [nome, config] of Object.entries(INDICES_CONFIG)) {
      try {
        await this.elasticsearch.criarIndice(nome, config);
        this.logger.log(`Índice ${nome} criado`);
      } catch (error) {
        this.logger.error(`Erro ao criar índice ${nome}: ${error.message}`);
      }
    }

    this.logger.log('Recriação de índices finalizada.');
  }
}
