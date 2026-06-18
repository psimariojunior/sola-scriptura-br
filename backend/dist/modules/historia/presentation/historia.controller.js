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
exports.HistoriaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const historia_service_1 = require("../application/historia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let HistoriaController = class HistoriaController {
    constructor(historiaService) {
        this.historiaService = historiaService;
    }
    contextoHistorico(livroId) {
        return this.historiaService.buscarPorLivro(livroId);
    }
    contextoPorEntidade(tipo, entidadeId) {
        return this.historiaService.buscarPorEntidade(tipo, entidadeId);
    }
};
exports.HistoriaController = HistoriaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('livro/:livroId'),
    (0, swagger_1.ApiOperation)({ summary: 'Contexto histórico de um livro' }),
    __param(0, (0, common_1.Param)('livroId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HistoriaController.prototype, "contextoHistorico", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(':tipo/:entidadeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Contexto histórico por tipo de entidade' }),
    __param(0, (0, common_1.Param)('tipo')),
    __param(1, (0, common_1.Param)('entidadeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HistoriaController.prototype, "contextoPorEntidade", null);
exports.HistoriaController = HistoriaController = __decorate([
    (0, swagger_1.ApiTags)('História'),
    (0, common_1.Controller)('historia'),
    __metadata("design:paramtypes", [historia_service_1.HistoriaService])
], HistoriaController);
//# sourceMappingURL=historia.controller.js.map