"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KnowledgeGraphService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGraphService = void 0;
const common_1 = require("@nestjs/common");
let KnowledgeGraphService = KnowledgeGraphService_1 = class KnowledgeGraphService {
    constructor() {
        this.logger = new common_1.Logger(KnowledgeGraphService_1.name);
        this.nos = new Map();
        this.arestas = [];
    }
    adicionarNo(no) {
        this.nos.set(no.id, no);
    }
    adicionarAresta(aresta) {
        this.arestas.push(aresta);
    }
    buscarNo(id) {
        return this.nos.get(id);
    }
    buscarVizinhos(id, profundiade = 1) {
        const visitados = new Set();
        const resultadoNos = [];
        const resultadoArestas = [];
        const fila = [{ id, profundidade: 0 }];
        visitados.add(id);
        while (fila.length > 0) {
            const atual = fila.shift();
            const no = this.nos.get(atual.id);
            if (no)
                resultadoNos.push(no);
            if (atual.profundidade < profundiade) {
                const conexoes = this.arestas.filter((a) => a.origem === atual.id || a.destino === atual.id);
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
    buscarCaminho(origemId, destinoId) {
        const visitados = new Set();
        const fila = [
            { id: origemId, caminho: [] },
        ];
        visitados.add(origemId);
        while (fila.length > 0) {
            const atual = fila.shift();
            const noAtual = this.nos.get(atual.id);
            const novoCaminho = noAtual ? [...atual.caminho, noAtual] : atual.caminho;
            if (atual.id === destinoId)
                return novoCaminho;
            const conexoes = this.arestas.filter((a) => a.origem === atual.id || a.destino === atual.id);
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
    estatisticas() {
        const tipos = {};
        this.nos.forEach((no) => {
            tipos[no.tipo] = (tipos[no.tipo] || 0) + 1;
        });
        return {
            totalNos: this.nos.size,
            totalArestas: this.arestas.length,
            tipos,
        };
    }
    exportar() {
        return {
            nos: Array.from(this.nos.values()),
            arestas: this.arestas,
        };
    }
};
exports.KnowledgeGraphService = KnowledgeGraphService;
exports.KnowledgeGraphService = KnowledgeGraphService = KnowledgeGraphService_1 = __decorate([
    (0, common_1.Injectable)()
], KnowledgeGraphService);
//# sourceMappingURL=knowledge-graph.service.js.map