import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Versiculo } from '../../modules/biblia/domain/versiculo.entity';
import { Doutrina } from '../../modules/teologia/domain/doutrina.entity';
import { Personagem } from '../../modules/personagens/domain/personagem.entity';
import { PalavraGrega } from '../../modules/grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../../modules/hebraico/domain/palavra-hebraica.entity';
import { ContextoHistorico } from '../../modules/historia/domain/contexto-historico.entity';
import { Localizacao } from '../../modules/geografia/domain/localizacao.entity';
import { ReferenciaCruzada } from '../../modules/referencias/domain/referencia-cruzada.entity';
import { Livro } from '../../modules/biblia/domain/livro.entity';

export interface NoGrafo {
  id: string;
  tipo: 'pessoa' | 'lugar' | 'evento' | 'doutrina' | 'livro' | 'versiculo' | 'palavra' | 'profecia';
  nome: string;
  descricao?: string;
  metadados?: Record<string, any>;
}

export interface ArestaGrafo {
  origem: string;
  destino: string;
  tipo: string;
  peso: number;
  metadados?: Record<string, any>;
}

interface ResultadoCaminho {
  caminho: NoGrafo[];
  arestas: ArestaGrafo[];
  comprimento: number;
}

@Injectable()
export class KnowledgeGraphService {
  private readonly logger = new Logger(KnowledgeGraphService.name);
  private nos: Map<string, NoGrafo> = new Map();
  private arestas: ArestaGrafo[] = [];
  private adjacencyList: Map<string, Set<string>> = new Map();
  private populado = false;

  constructor(
    @InjectRepository(Versiculo) private versiculoRepo: Repository<Versiculo>,
    @InjectRepository(Doutrina) private doutrinaRepo: Repository<Doutrina>,
    @InjectRepository(Personagem) private personagemRepo: Repository<Personagem>,
    @InjectRepository(PalavraGrega) private gregoRepo: Repository<PalavraGrega>,
    @InjectRepository(PalavraHebraica) private hebraicoRepo: Repository<PalavraHebraica>,
    @InjectRepository(ContextoHistorico) private historiaRepo: Repository<ContextoHistorico>,
    @InjectRepository(Localizacao) private geografiaRepo: Repository<Localizacao>,
    @InjectRepository(ReferenciaCruzada) private referenciasRepo: Repository<ReferenciaCruzada>,
    @InjectRepository(Livro) private livroRepo: Repository<Livro>,
  ) {}

  async popularGrafo(): Promise<{ nos: number; arestas: number }> {
    this.logger.log('Populando grafo de conhecimento...');
    this.nos.clear();
    this.arestas = [];
    this.adjacencyList.clear();

    await this.popularLivros();
    await this.popularPersonagens();
    await this.popularDoutrinas();
    await this.popularPalavras();
    await this.popularReferencias();
    await this.popularHistoria();
    await this.popularGeografia();
    this.cruzarPersonagemVersiculo();
    this.cruzarDoutrinaVersiculo();

    this.populado = true;

    const stats = { nos: this.nos.size, arestas: this.arestas.length };
    this.logger.log(`Grafo populado: ${stats.nos} nós, ${stats.arestas} arestas`);
    return stats;
  }

  adicionarNo(no: NoGrafo): void {
    this.nos.set(no.id, no);
    if (!this.adjacencyList.has(no.id)) {
      this.adjacencyList.set(no.id, new Set());
    }
  }

  adicionarAresta(aresta: ArestaGrafo): void {
    const existente = this.arestas.find(
      a => a.origem === aresta.origem && a.destino === aresta.destino && a.tipo === aresta.tipo,
    );
    if (existente) {
      existente.peso = Math.max(existente.peso, aresta.peso);
      return;
    }

    this.arestas.push(aresta);

    if (!this.adjacencyList.has(aresta.origem)) {
      this.adjacencyList.set(aresta.origem, new Set());
    }
    if (!this.adjacencyList.has(aresta.destino)) {
      this.adjacencyList.set(aresta.destino, new Set());
    }
    this.adjacencyList.get(aresta.origem)!.add(aresta.destino);
    this.adjacencyList.get(aresta.destino)!.add(aresta.origem);
  }

  buscarNo(id: string): NoGrafo | undefined {
    return this.nos.get(id);
  }

  buscarVizinhos(entidadeId: string, tipo?: string, profundidade = 1): { nos: NoGrafo[]; arestas: ArestaGrafo[] } {
    const visitados = new Set<string>();
    const resultadoNos: NoGrafo[] = [];
    const resultadoArestas: ArestaGrafo[] = [];
    const fila = [{ id: entidadeId, profundidade: 0 }];
    visitados.add(entidadeId);

    while (fila.length > 0) {
      const atual = fila.shift()!;
      const no = this.nos.get(atual.id);
      if (no) {
        if (!tipo || no.tipo === tipo) {
          resultadoNos.push(no);
        }
      }

      if (atual.profundidade < profundidade) {
        const conexoes = this.arestas.filter(
          a => a.origem === atual.id || a.destino === atual.id,
        );

        for (const aresta of conexoes) {
          const chave = `${aresta.origem}->${aresta.destino}:${aresta.tipo}`;
          if (!resultadoArestas.find(a => `${a.origem}->${a.destino}:${a.tipo}` === chave)) {
            resultadoArestas.push(aresta);
          }

          const vizinhoId = aresta.origem === atual.id ? aresta.destino : aresta.origem;
          if (!visitados.has(vizinhoId)) {
            visitados.add(vizinhoId);
            fila.push({ id: vizinhoId, profundidade: atual.profundidade + 1 });
          }
        }
      }
    }

    return { nos: resultadoNos, arestas: resultadoArestas };
  }

  buscarCaminho(origemId: string, destinoId: string): ResultadoCaminho {
    if (origemId === destinoId) {
      const no = this.nos.get(origemId);
      return { caminho: no ? [no] : [], arestas: [], comprimento: 0 };
    }

    const visitados = new Set<string>();
    const fila: Array<{ id: string; caminho: NoGrafo[]; arestas: ArestaGrafo[] }> = [
      { id: origemId, caminho: [], arestas: [] },
    ];
    visitados.add(origemId);

    while (fila.length > 0) {
      const atual = fila.shift()!;
      const noAtual = this.nos.get(atual.id);

      if (atual.id === destinoId) {
        return {
          caminho: noAtual ? [...atual.caminho, noAtual] : atual.caminho,
          arestas: atual.arestas,
          comprimento: atual.arestas.length,
        };
      }

      const conexoes = this.arestas.filter(
        a => a.origem === atual.id || a.destino === atual.id,
      );

      const ordenadas = conexoes.sort((a, b) => b.peso - a.peso);

      for (const aresta of ordenadas) {
        const vizinhoId = aresta.origem === atual.id ? aresta.destino : aresta.origem;
        if (!visitados.has(vizinhoId)) {
          visitados.add(vizinhoId);
          const noVizinho = this.nos.get(vizinhoId);
          fila.push({
            id: vizinhoId,
            caminho: noAtual ? [...atual.caminho, noAtual] : atual.caminho,
            arestas: [...atual.arestas, aresta],
          });
        }
      }
    }

    return { caminho: [], arestas: [], comprimento: -1 };
  }

  suggestConnections(entidadeId: string): Array<{ entidade: NoGrafo; score: number; razao: string }> {
    const no = this.nos.get(entidadeId);
    if (!no) return [];

    const vizinhos = this.buscarVizinhos(entidadeId, undefined, 2);
    const vizinhoIds = new Set(vizinhos.nos.map(n => n.id));

    const candidatos: Array<{ entidade: NoGrafo; score: number; razao: string }> = [];

    for (const [id, candidate] of this.nos) {
      if (id === entidadeId || vizinhoIds.has(id)) continue;

      let score = 0;
      let razao = '';

      if (candidate.tipo === no.tipo) {
        score += 0.3;
        razao = `Mesmo tipo (${candidate.tipo})`;
      }

      const candidatoVizinhos = this.adjacencyList.get(id);
      const comuns = candidatoVizinhos
        ? [...candidatoVizinhos].filter(v => vizinhoIds.has(v))
        : [];

      if (comuns.length > 0) {
        score += comuns.length * 0.2;
        razao = `${comuns.length} entidade(s) em comum`;
      }

      if (score > 0.3) {
        candidatos.push({ entidade: candidate, score, razao });
      }
    }

    return candidatos
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  estatisticas(): { totalNos: number; totalArestas: number; tipos: Record<string, number>; populado: boolean } {
    const tipos: Record<string, number> = {};
    this.nos.forEach((no) => {
      tipos[no.tipo] = (tipos[no.tipo] || 0) + 1;
    });
    return {
      totalNos: this.nos.size,
      totalArestas: this.arestas.length,
      tipos,
      populado: this.populado,
    };
  }

  exportar(): { nos: NoGrafo[]; arestas: ArestaGrafo[] } {
    return {
      nos: Array.from(this.nos.values()),
      arestas: this.arestas,
    };
  }

  private adicionarNoSeNovo(no: NoGrafo): void {
    if (!this.nos.has(no.id)) {
      this.adicionarNo(no);
    }
  }

  private async popularLivros(): Promise<void> {
    try {
      const livros = await this.livroRepo.find();
      for (const livro of livros) {
        this.adicionarNoSeNovo({
          id: `livro:${livro.id}`,
          tipo: 'livro',
          nome: livro.nome,
          descricao: `${livro.testamento || ''} - ${livro.quantidadeCapitulos || ''} capítulos`,
        });
      }
    } catch (e) {
      this.logger.debug('Pulando livros: ' + (e as Error).message);
    }
  }

  private async popularPersonagens(): Promise<void> {
    try {
      const personagens = await this.personagemRepo.find({ take: 500 });
      for (const p of personagens) {
        this.adicionarNoSeNovo({
          id: `personagem:${p.id}`,
          tipo: 'pessoa',
          nome: p.nomePortugues || p.nome,
          descricao: p.biografia?.slice(0, 200),
          metadados: {
            nomeHebraico: p.nomeHebraico,
            nomeGrego: p.nomeGrego,
          },
        });
      }
    } catch (e) {
      this.logger.debug('Pulando personagens: ' + (e as Error).message);
    }
  }

  private async popularDoutrinas(): Promise<void> {
    try {
      const doutrinas = await this.doutrinaRepo.find({ take: 200 });
      for (const d of doutrinas) {
        this.adicionarNoSeNovo({
          id: `doutrina:${d.id}`,
          tipo: 'doutrina',
          nome: d.nome,
          descricao: d.definicao?.slice(0, 200) || d.explicacao?.slice(0, 200),
        });
      }
    } catch (e) {
      this.logger.debug('Pulando doutrinas: ' + (e as Error).message);
    }
  }

  private async popularPalavras(): Promise<void> {
    try {
      const gregos = await this.gregoRepo.find({ take: 200 });
      for (const g of gregos) {
        this.adicionarNoSeNovo({
          id: `grego:${g.id}`,
          tipo: 'palavra',
          nome: g.palavraOriginal || g.lemma || g.strong,
          descricao: `${g.strong}: ${g.definicaoCurta || ''}`,
        });
      }
    } catch (e) {
      this.logger.debug('Pulando palavras gregas: ' + (e as Error).message);
    }

    try {
      const hebraicos = await this.hebraicoRepo.find({ take: 200 });
      for (const h of hebraicos) {
        this.adicionarNoSeNovo({
          id: `hebraico:${h.id}`,
          tipo: 'palavra',
          nome: h.palavraOriginal || h.lemma || h.strong,
          descricao: `${h.strong}: ${h.definicaoCurta || ''}`,
        });
      }
    } catch (e) {
      this.logger.debug('Pulando palavras hebraicas: ' + (e as Error).message);
    }
  }

  private async popularReferencias(): Promise<void> {
    try {
      const refs = await this.referenciasRepo.find({ take: 1000 });
      for (const ref of refs) {
        const origemId = `versiculo:${ref.versiculoOrigemId}`;
        const destinoId = `versiculo:${ref.versiculoDestinoId}`;

        if (this.nos.has(origemId) && this.nos.has(destinoId)) {
          this.adicionarAresta({
            origem: origemId,
            destino: destinoId,
            tipo: 'referencia_cruzada',
            peso: ref.peso || 0.5,
          });
        }
      }
    } catch (e) {
      this.logger.debug('Pulando referências: ' + (e as Error).message);
    }
  }

  private async popularHistoria(): Promise<void> {
    try {
      const historicos = await this.historiaRepo.find({ take: 200 });
      for (const h of historicos) {
        this.adicionarNoSeNovo({
          id: `historia:${h.id}`,
          tipo: 'evento',
          nome: h.titulo || h.entidadeTipo || `Evento ${h.id}`,
          descricao: h.contextoPolitico?.slice(0, 200) || h.contextoReligioso?.slice(0, 200),
        });
      }
    } catch (e) {
      this.logger.debug('Pulando história: ' + (e as Error).message);
    }
  }

  private async popularGeografia(): Promise<void> {
    try {
      const locs = await this.geografiaRepo.find({ take: 200 });
      for (const loc of locs) {
        this.adicionarNoSeNovo({
          id: `geografia:${loc.id}`,
          tipo: 'lugar',
          nome: loc.nome,
          descricao: loc.descricao?.slice(0, 200),
          metadados: {
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
        });
      }
    } catch (e) {
      this.logger.debug('Pulando geografia: ' + (e as Error).message);
    }
  }

  private cruzarPersonagemVersiculo(): void {
    const personagens = Array.from(this.nos.values()).filter(n => n.tipo === 'pessoa');
    const versiculos = Array.from(this.nos.values()).filter(n => n.tipo === 'versiculo');

    for (const p of personagens) {
      for (const v of versiculos) {
        if (v.nome.toLowerCase().includes(p.nome.toLowerCase()) ||
            (v.descricao || '').toLowerCase().includes(p.nome.toLowerCase())) {
          this.adicionarAresta({
            origem: p.id,
            destino: v.id,
            tipo: 'mencionado_em',
            peso: 0.6,
          });
        }
      }
    }
  }

  private cruzarDoutrinaVersiculo(): void {
    const doutrinas = Array.from(this.nos.values()).filter(n => n.tipo === 'doutrina');
    const versiculos = Array.from(this.nos.values()).filter(n => n.tipo === 'versiculo');

    for (const d of doutrinas) {
      for (const v of versiculos) {
        const desc = (d.descricao || '').toLowerCase();
        const vtext = (v.nome + ' ' + (v.descricao || '')).toLowerCase();

        const termosDoutrina = d.nome.toLowerCase().split(/\s+/);
        const relevantes = termosDoutrina.filter(t => t.length > 3 && vtext.includes(t));

        if (relevantes.length >= 1) {
          this.adicionarAresta({
            origem: d.id,
            destino: v.id,
            tipo: 'ensina',
            peso: 0.4 + relevantes.length * 0.1,
          });
        }
      }
    }
  }
}
