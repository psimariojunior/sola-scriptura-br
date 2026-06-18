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
exports.BibliaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const biblia_service_1 = require("../application/biblia.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let BibliaController = class BibliaController {
    constructor(bibliaService) {
        this.bibliaService = bibliaService;
    }
    listarTestamentos() {
        return this.bibliaService.listarTestamentos();
    }
    listarLivros(testamentoId) {
        return this.bibliaService.listarLivros(testamentoId);
    }
    buscarLivro(slug) {
        return this.bibliaService.buscarPorSlug(slug);
    }
    buscarCapitulo(livroId, numero) {
        return this.bibliaService.buscarCapitulo(livroId, +numero);
    }
    buscarVersiculo(livroId, capitulo, versiculo, traducaoId) {
        return this.bibliaService.buscarVersiculo(livroId, +capitulo, +versiculo, traducaoId);
    }
    buscarPassagem(livroId, capitulo, inicio, fim, traducaoId) {
        return this.bibliaService.buscarPassagem(livroId, +capitulo, +inicio, fim ? +fim : undefined, traducaoId);
    }
    listarTraducoes() {
        return this.bibliaService.listarTraducoes();
    }
    pesquisar(consulta, traducaoId) {
        return this.bibliaService.pesquisar(consulta, traducaoId);
    }
    buscarPalavra(id) {
        return this.bibliaService.buscarPalavraCompleta(id);
    }
};
exports.BibliaController = BibliaController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('testamentos'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os testamentos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "listarTestamentos", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('livros'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos os livros da Bíblia' }),
    (0, swagger_1.ApiQuery)({ name: 'testamentoId', required: false }),
    __param(0, (0, common_1.Query)('testamentoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "listarLivros", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('livros/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca livro por slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "buscarLivro", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('livros/:livroId/capitulos/:numero'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca capítulo pelo número' }),
    __param(0, (0, common_1.Param)('livroId')),
    __param(1, (0, common_1.Param)('numero')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "buscarCapitulo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('versiculos/:livroId/:capitulo/:versiculo'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca versículo específico' }),
    __param(0, (0, common_1.Param)('livroId')),
    __param(1, (0, common_1.Param)('capitulo')),
    __param(2, (0, common_1.Param)('versiculo')),
    __param(3, (0, common_1.Query)('traducaoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "buscarVersiculo", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('passagem/:livroId/:capitulo/:inicio/:fim?'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca uma passagem (intervalo de versículos)' }),
    __param(0, (0, common_1.Param)('livroId')),
    __param(1, (0, common_1.Param)('capitulo')),
    __param(2, (0, common_1.Param)('inicio')),
    __param(3, (0, common_1.Param)('fim')),
    __param(4, (0, common_1.Query)('traducaoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "buscarPassagem", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('traducoes'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todas as traduções disponíveis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "listarTraducoes", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('pesquisar'),
    (0, swagger_1.ApiOperation)({ summary: 'Pesquisa texto na Bíblia' }),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('traducaoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "pesquisar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('palavras/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca detalhes completos de uma palavra' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BibliaController.prototype, "buscarPalavra", null);
exports.BibliaController = BibliaController = __decorate([
    (0, swagger_1.ApiTags)('Bíblia'),
    (0, common_1.Controller)('biblia'),
    __metadata("design:paramtypes", [biblia_service_1.BibliaService])
], BibliaController);
//# sourceMappingURL=biblia.controller.js.map