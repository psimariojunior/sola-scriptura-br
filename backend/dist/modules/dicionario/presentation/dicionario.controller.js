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
exports.DicionarioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dicionario_service_1 = require("../application/dicionario.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let DicionarioController = class DicionarioController {
    constructor(dicionarioService) {
        this.dicionarioService = dicionarioService;
    }
    pesquisar(consulta) {
        return this.dicionarioService.pesquisar(consulta);
    }
    porCategoria(categoria) {
        return this.dicionarioService.listarPorCategoria(categoria);
    }
    buscarPorSlug(slug) {
        return this.dicionarioService.buscarPorSlug(slug);
    }
};
exports.DicionarioController = DicionarioController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('buscar'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisa no dicionário bíblico' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DicionarioController.prototype, "pesquisar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('categoria/:categoria'),
    (0, swagger_1.ApiOperation)({ summary: 'Verbetes por categoria' }),
    __param(0, (0, common_1.Param)('categoria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DicionarioController.prototype, "porCategoria", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca verbete pelo slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DicionarioController.prototype, "buscarPorSlug", null);
exports.DicionarioController = DicionarioController = __decorate([
    (0, swagger_1.ApiTags)('Dicionário'),
    (0, common_1.Controller)('dicionario'),
    __metadata("design:paramtypes", [dicionario_service_1.DicionarioService])
], DicionarioController);
//# sourceMappingURL=dicionario.controller.js.map