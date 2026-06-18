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
export declare class KnowledgeGraphService {
    private readonly logger;
    private nos;
    private arestas;
    adicionarNo(no: NoGrafo): void;
    adicionarAresta(aresta: ArestaGrafo): void;
    buscarNo(id: string): NoGrafo | undefined;
    buscarVizinhos(id: string, profundiade?: number): {
        nos: NoGrafo[];
        arestas: ArestaGrafo[];
    };
    buscarCaminho(origemId: string, destinoId: string): NoGrafo[];
    estatisticas(): {
        totalNos: number;
        totalArestas: number;
        tipos: Record<string, number>;
    };
    exportar(): {
        nos: NoGrafo[];
        arestas: ArestaGrafo[];
    };
}
export {};
