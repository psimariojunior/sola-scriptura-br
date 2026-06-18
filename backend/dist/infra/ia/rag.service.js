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
var RAGService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RAGService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elasticsearch_service_1 = require("../busca/elasticsearch.service");
let RAGService = RAGService_1 = class RAGService {
    constructor(configService, elasticsearchService) {
        this.configService = configService;
        this.elasticsearchService = elasticsearchService;
        this.logger = new common_1.Logger(RAGService_1.name);
    }
    async buscarContexto(consulta) {
        const [resultadosBiblia, resultadosLexico, resultadosTeologia, resultadosComentarios] = await Promise.all([
            this.elasticsearchService.buscarTextoCompleto('biblia', consulta, 1, 10),
            this.elasticsearchService.buscarTextoCompleto('lexico', consulta, 1, 5),
            this.elasticsearchService.buscarTextoCompleto('teologia', consulta, 1, 5),
            this.elasticsearchService.buscarTextoCompleto('comentarios', consulta, 1, 5),
        ]);
        return {
            textoBiblico: resultadosBiblia.map((r) => r.fonte?.['texto'] || ''),
            lexico: resultadosLexico.map((r) => r.fonte['definicao']),
            comentarios: resultadosComentarios.map((r) => r.fonte['conteudo']),
            teologia: resultadosTeologia.map((r) => r.fonte['explicacao']),
            historia: [],
            geografia: [],
            arqueologia: [],
            fontes: this.montarFontes(resultadosBiblia, resultadosLexico, resultadosTeologia, resultadosComentarios),
        };
    }
    async montarPrompt(consulta, contexto, tradicaoTeologica) {
        const partes = ['Você é um especialista em estudos bíblicos acadêmicos.', ''];
        if (tradicaoTeologica) {
            partes.push(`Considere a perspectiva da tradição ${tradicaoTeologica} quando aplicável.`);
            partes.push('');
        }
        partes.push('=== CONTEXTO BÍBLICO ===');
        partes.push(contexto.textoBiblico.join('\n') || 'Nenhum texto encontrado');
        if (contexto.lexico.length > 0) {
            partes.push('');
            partes.push('=== LÉXICO / STRONG ===');
            partes.push(contexto.lexico.join('\n'));
        }
        if (contexto.teologia.length > 0) {
            partes.push('');
            partes.push('=== TEOLOGIA ===');
            partes.push(contexto.teologia.join('\n'));
        }
        if (contexto.comentarios.length > 0) {
            partes.push('');
            partes.push('=== COMENTÁRIOS ===');
            partes.push(contexto.comentarios.join('\n'));
        }
        partes.push('');
        partes.push('=== PERGUNTA DO USUÁRIO ===');
        partes.push(consulta);
        partes.push('');
        partes.push('Instruções:');
        partes.push('- Responda em português brasileiro');
        partes.push('- Baseie-se NO CONTEXTO fornecido acima');
        partes.push('- Se não houver contexto suficiente, indique isso claramente');
        partes.push('- Cite fontes e referências bíblicas sempre que possível');
        partes.push('- Identifique claramente interpretações específicas de tradições teológicas');
        partes.push('- Seja acadêmico mas acessível');
        return partes.join('\n');
    }
    montarFontes(...grupos) {
        const tipos = ['Bíblia', 'Léxico', 'Teologia', 'Comentários'];
        const fontes = [];
        grupos.forEach((grupo, idx) => {
            if (grupo) {
                grupo.forEach((r) => {
                    fontes.push({
                        tipo: tipos[idx] || 'Desconhecido',
                        texto: r.fonte?.texto || r.fonte?.conteudo || r.fonte?.definicao || '',
                        relevancia: r.score || 0,
                        referencia: r.fonte?.referencia || r.id || '',
                    });
                });
            }
        });
        return fontes.sort((a, b) => b.relevancia - a.relevancia).slice(0, 20);
    }
};
exports.RAGService = RAGService;
exports.RAGService = RAGService = RAGService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, elasticsearch_service_1.ElasticsearchService])
], RAGService);
//# sourceMappingURL=rag.service.js.map