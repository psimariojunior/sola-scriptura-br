import { Injectable, Logger } from '@nestjs/common';

interface NoGrafo {
  id: string;
  tipo: 'pessoa' | 'lugar' | 'evento' | 'doutrina' | 'livro' | 'capitulo' | 'versiculo' | 'profecia';
  nome: string;
  descricao?: string;
}

interface ArestaGrafo {
  origem: string;
  destino: string;
  tipo: string;
  peso: number;
}

@Injectable()
export class KnowledgeGraphService {
  private readonly logger = new Logger(KnowledgeGraphService.name);
  private nos: Map<string, NoGrafo> = new Map();
  private arestas: ArestaGrafo[] = [];

  adicionarNo(no: NoGrafo): void {
    this.nos.set(no.id, no);
  }

  adicionarAresta(aresta: ArestaGrafo): void {
    this.arestas.push(aresta);
  }

  buscarNo(id: string): NoGrafo | undefined {
    return this.nos.get(id);
  }

  buscarVizinhos(id: string, profundiade = 1): { nos: NoGrafo[]; arestas: ArestaGrafo[] } {
    const visitados = new Set<string>();
    const resultadoNos: NoGrafo[] = [];
    const resultadoArestas: ArestaGrafo[] = [];
    const fila = [{ id, profundidade: 0 }];
    visitados.add(id);

    while (fila.length > 0) {
      const atual = fila.shift()!;
      const no = this.nos.get(atual.id);
      if (no) resultadoNos.push(no);

      if (atual.profundidade < profundiade) {
        const conexoes = this.arestas.filter(
          (a) => a.origem === atual.id || a.destino === atual.id,
        );
        for (const aresta of conexoes) {
          if (!resultadoArestas.find((a) => a.origem === aresta.origem && a.destino === aresta.destino)) {
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

  buscarCaminho(origemId: string, destinoId: string): NoGrafo[] {
    const visitados = new Set<string>();
    const fila: Array<{ id: string; caminho: NoGrafo[] }> = [
      { id: origemId, caminho: [] },
    ];
    visitados.add(origemId);

    while (fila.length > 0) {
      const atual = fila.shift()!;
      const noAtual = this.nos.get(atual.id);
      const novoCaminho = noAtual ? [...atual.caminho, noAtual] : atual.caminho;

      if (atual.id === destinoId) return novoCaminho;

      const conexoes = this.arestas.filter(
        (a) => a.origem === atual.id || a.destino === atual.id,
      );
      for (const aresta of conexoes) {
        const vizinhoId = aresta.origem === atual.id ? aresta.destino : aresta.origem;
        if (!visitados.has(vizinhoId)) {
          visitados.add(vizinhoId);
          fila.push({ id: vizinhoId, caminho: novoCaminho });
        }
      }
    }

    return [];
  }

  estatisticas(): { totalNos: number; totalArestas: number; tipos: Record<string, number> } {
    const tipos: Record<string, number> = {};
    this.nos.forEach((no) => {
      tipos[no.tipo] = (tipos[no.tipo] || 0) + 1;
    });
    return {
      totalNos: this.nos.size,
      totalArestas: this.arestas.length,
      tipos,
    };
  }

  exportar(): { nos: NoGrafo[]; arestas: ArestaGrafo[] } {
    return {
      nos: Array.from(this.nos.values()),
      arestas: this.arestas,
    };
  }
}
