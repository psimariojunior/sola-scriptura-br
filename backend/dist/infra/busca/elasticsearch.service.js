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
var ElasticsearchService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElasticsearchService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const elasticsearch_1 = require("@elastic/elasticsearch");
let ElasticsearchService = ElasticsearchService_1 = class ElasticsearchService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ElasticsearchService_1.name);
        this.client = new elasticsearch_1.Client({
            node: this.configService.get('ELASTICSEARCH_URL', 'http://localhost:9200'),
            auth: {
                username: this.configService.get('ELASTICSEARCH_USER', 'elastic'),
                password: this.configService.get('ELASTICSEARCH_PASSWORD', ''),
            },
        });
    }
    async criarIndice(nome, configuracao) {
        const existe = await this.client.indices.exists({ index: nome });
        if (!existe) {
            await this.client.indices.create({ index: nome, body: configuracao });
            this.logger.log(`Índice ${nome} criado`);
        }
    }
    async indexar(documento) {
        await this.client.index({
            index: documento.indice,
            id: documento.id,
            body: documento.corpo,
            refresh: 'wait_for',
        });
    }
    async buscar(params) {
        const { indice, consulta, pagina = 1, tamanho = 20 } = params;
        const from = (pagina - 1) * tamanho;
        const resultado = await this.client.search({
            index: indice,
            from,
            size: tamanho,
            body: { query: consulta },
        });
        return resultado.hits.hits.map((hit) => ({
            id: hit._id,
            score: hit._score,
            fonte: hit._source,
        }));
    }
    async buscarTextoCompleto(indice, texto, pagina = 1, tamanho = 20) {
        return this.buscar({
            indice,
            consulta: {
                multi_match: {
                    query: texto,
                    fields: ['*'],
                    type: 'best_fields',
                    fuzziness: 'AUTO',
                },
            },
            pagina,
            tamanho,
        });
    }
    async buscarSemantica(indice, vetor, pagina = 1, tamanho = 20) {
        return this.buscar({
            indice,
            consulta: {
                script_score: {
                    query: { match_all: {} },
                    script: {
                        source: "cosineSimilarity(params.queryVector, 'vetor_embedding') + 1.0",
                        params: { queryVector: vetor },
                    },
                },
            },
            pagina,
            tamanho,
        });
    }
    async atualizar(indice, id, corpo) {
        await this.client.update({ index: indice, id, body: { doc: corpo } });
    }
    async remover(indice, id) {
        await this.client.delete({ index: indice, id });
    }
    async saúde() {
        try {
            const resp = await this.client.cluster.health();
            return resp.status === 'green' || resp.status === 'yellow';
        }
        catch {
            return false;
        }
    }
};
exports.ElasticsearchService = ElasticsearchService;
exports.ElasticsearchService = ElasticsearchService = ElasticsearchService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ElasticsearchService);
//# sourceMappingURL=elasticsearch.service.js.map