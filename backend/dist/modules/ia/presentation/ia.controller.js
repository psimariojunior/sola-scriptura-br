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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ia_service_1 = require("../application/ia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let IaController = class IaController {
    constructor(iaService) {
        this.iaService = iaService;
    }
    perguntar(dados, tradicao) {
        return this.iaService.perguntar(dados.consulta, tradicao);
    }
    analisarExegese(dados) {
        return this.iaService.analisarExegese(dados.versiculoId, dados.texto);
    }
    analisarGrego(dados) {
        return this.iaService.analisarGrego(dados.texto);
    }
    comparar(dados) {
        return this.iaService.compararPassagens(dados.passagens);
    }
    buscarGrafo(entidadeId, profundidade) {
        return this.iaService.buscarNoGrafo(entidadeId, profundidade ? +profundidade : 2);
    }
    estatisticasGrafo() {
        return this.iaService.estatisticasGrafo();
    }
};
exports.IaController = IaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('perguntar'),
    (0, swagger_1.ApiOperation)({ summary: 'Faz uma pergunta ao assistente bíblico IA' }),
    (0, swagger_1.ApiQuery)({ name: 'tradicao', required: false, description: 'Tradição teológica (arminiana, reformada, batista, pentecostal, wesleyana)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('tradicao')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "perguntar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('exegese'),
    (0, swagger_1.ApiOperation)({ summary: 'Análise exegética via IA' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "analisarExegese", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('grego'),
    (0, swagger_1.ApiOperation)({ summary: 'Análise de texto grego via IA' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "analisarGrego", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('comparar'),
    (0, swagger_1.ApiOperation)({ summary: 'Compara passagens bíblicas via IA' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "comparar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('grafo/:entidadeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca entidade no grafo de conhecimento' }),
    __param(0, (0, common_1.Param)('entidadeId')),
    __param(1, (0, common_1.Query)('profundidade')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], IaController.prototype, "buscarGrafo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('grafo/estatisticas'),
    (0, swagger_1.ApiOperation)({ summary: 'Estatísticas do grafo de conhecimento' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IaController.prototype, "estatisticasGrafo", null);
exports.IaController = IaController = __decorate([
    (0, swagger_1.ApiTags)('IA'),
    (0, common_1.Controller)('ia'),
    __metadata("design:paramtypes", [ia_service_1.IaService])
], IaController);
//# sourceMappingURL=ia.controller.js.map