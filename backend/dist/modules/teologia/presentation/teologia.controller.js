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
exports.TeologiaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teologia_service_1 = require("../application/teologia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let TeologiaController = class TeologiaController {
    constructor(teologiaService) {
        this.teologiaService = teologiaService;
    }
    listarCategorias() {
        return this.teologiaService.listarCategorias();
    }
    buscarDoutrina(slug) {
        return this.teologiaService.buscarDoutrina(slug);
    }
    relacionarTexto(versiculoId) {
        return this.teologiaService.relacionarTexto(versiculoId);
    }
};
exports.TeologiaController = TeologiaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('categorias'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista categorias teológicas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TeologiaController.prototype, "listarCategorias", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('doutrinas/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca doutrina pelo slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeologiaController.prototype, "buscarDoutrina", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('versiculo/:versiculoId'),
    (0, swagger_1.ApiOperation)({ summary: 'Relaciona teologia com um versículo' }),
    __param(0, (0, common_1.Param)('versiculoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TeologiaController.prototype, "relacionarTexto", null);
exports.TeologiaController = TeologiaController = __decorate([
    (0, swagger_1.ApiTags)('Teologia'),
    (0, common_1.Controller)('teologia'),
    __metadata("design:paramtypes", [teologia_service_1.TeologiaService])
], TeologiaController);
//# sourceMappingURL=teologia.controller.js.map