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
exports.GregoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grego_service_1 = require("../application/grego.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let GregoController = class GregoController {
    constructor(gregoService) {
        this.gregoService = gregoService;
    }
    buscarPorStrong(strong) {
        return this.gregoService.buscarPorStrong(strong);
    }
    buscarPorLemma(lemma) {
        return this.gregoService.buscarPorLemma(lemma);
    }
    buscar(consulta) {
        return this.gregoService.buscarPorTransliteracao(consulta);
    }
    frequentes(limite) {
        return this.gregoService.buscarFrequentes(limite ? +limite : 100);
    }
};
exports.GregoController = GregoController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('strong/:strong'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca palavra grega pelo código Strong' }),
    __param(0, (0, common_1.Param)('strong')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GregoController.prototype, "buscarPorStrong", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('lemma/:lemma'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca palavras pelo lemma' }),
    __param(0, (0, common_1.Param)('lemma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GregoController.prototype, "buscarPorLemma", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisa por transliteração ou texto original' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GregoController.prototype, "buscar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('frequentes'),
    (0, swagger_1.ApiOperation)({ summary: 'Palavras gregas mais frequentes no NT' }),
    __param(0, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GregoController.prototype, "frequentes", null);
exports.GregoController = GregoController = __decorate([
    (0, swagger_1.ApiTags)('Grego'),
    (0, common_1.Controller)('grego'),
    __metadata("design:paramtypes", [grego_service_1.GregoService])
], GregoController);
//# sourceMappingURL=grego.controller.js.map