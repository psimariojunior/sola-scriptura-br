"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IaService = void 0;
const common_1 = require("@nestjs/common");
const rag_service_1 = require("../../../infra/ia/rag.service");
const llm_service_1 = require("../../../infra/ia/llm.service");
const knowledge_graph_service_1 = require("../../../infra/ia/knowledge-graph.service");
let IaService = IaService_1 = class IaService {
    constructor(ragService, llmService, knowledgeGraph) {
        this.ragService = ragService;
        this.llmService = llmService;
        this.knowledgeGraph = knowledgeGraph;
        this.logger = new common_1.Logger(IaService_1.name);
    }
    async perguntar(consulta, tradicaoTeologica) {
        const contexto = await this.ragService.buscarContexto(consulta);
        const prompt = await this.ragService.montarPrompt(consulta, contexto, tradicaoTeologica);
        const resposta = await this.llmService.gerarResposta(prompt);
        return {
            pergunta: consulta,
            resposta,
            contexto: contexto.fontes.slice(0, 5),
            tradicaoTeologica: tradicaoTeologica || 'geral',
            fontes: contexto.fontes.slice(0, 10),
        };
    }
    async analisarExegese(versiculoId, texto) {
        const consulta = `Faça uma análise exegese detalhada deste versículo: "${texto}" (ID: ${versiculoId})`;
        return this.perguntar(consulta);
    }
    async analisarGrego(textoGrego) {
        const consulta = `Analise o texto grego a seguir, fornecendo morfologia, sintaxe e significado: "${textoGrego}"`;
        return this.perguntar(consulta);
    }
    async compararPassagens(passagens) {
        const consulta = `Compare e contraste as seguintes passagens bíblicas: ${passagens.join('; ')}`;
        return this.perguntar(consulta);
    }
    async buscarNoGrafo(entidadeId, profundidade = 2) {
        return this.knowledgeGraph.buscarVizinhos(entidadeId, profundidade);
    }
    async estatisticasGrafo() {
        return this.knowledgeGraph.estatisticas();
    }
};
exports.IaService = IaService;
exports.IaService = IaService = IaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rag_service_1.RAGService,
        llm_service_1.LLMService,
        knowledge_graph_service_1.KnowledgeGraphService])
], IaService);
//# sourceMappingURL=ia.service.js.map