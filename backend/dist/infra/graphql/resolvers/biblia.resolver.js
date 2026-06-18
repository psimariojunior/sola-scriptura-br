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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibliaResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const biblia_service_1 = require("../../modules/biblia/application/biblia.service");
let BibliaResolver = class BibliaResolver {
    constructor(bibliaService) {
        this.bibliaService = bibliaService;
    }
    async livro(slug) {
        return this.bibliaService.buscarPorSlug(slug);
    }
    async capitulo(livroId, numero) {
        return this.bibliaService.buscarCapitulo(livroId, numero);
    }
    async versiculo(livroId, capitulo, versiculo, traducaoId) {
        return this.bibliaService.buscarVersiculo(livroId, capitulo, versiculo, traducaoId);
    }
    async buscarTexto(consulta) {
        return this.bibliaService.pesquisar(consulta);
    }
    async capitulos(livro) {
        return this.bibliaService.listarCapitulos(livro.id);
    }
};
exports.BibliaResolver = BibliaResolver;
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BibliaResolver.prototype, "livro", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('livroId')),
    __param(1, (0, graphql_1.Args)('numero', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], BibliaResolver.prototype, "capitulo", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('livroId')),
    __param(1, (0, graphql_1.Args)('capitulo', { type: () => graphql_1.Int })),
    __param(2, (0, graphql_1.Args)('versiculo', { type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('traducaoId', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], BibliaResolver.prototype, "versiculo", null);
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, graphql_1.Args)('consulta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BibliaResolver.prototype, "buscarTexto", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BibliaResolver.prototype, "capitulos", null);
exports.BibliaResolver = BibliaResolver = __decorate([
    (0, graphql_1.Resolver)('Biblia'),
    __param(0, (0, common_1.Inject)(biblia_service_1.BibliaService)),
    __metadata("design:paramtypes", [typeof (_a = typeof biblia_service_1.BibliaService !== "undefined" && biblia_service_1.BibliaService) === "function" ? _a : Object])
], BibliaResolver);
//# sourceMappingURL=biblia.resolver.js.map