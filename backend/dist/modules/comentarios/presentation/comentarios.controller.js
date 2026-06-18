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
exports.ComentariosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const comentarios_service_1 = require("../application/comentarios.service");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let ComentariosController = class ComentariosController {
    constructor(comentariosService) {
        this.comentariosService = comentariosService;
    }
    listarAutores() {
        return this.comentariosService.listarAutores();
    }
    buscarPorAutor(autor) {
        return this.comentariosService.buscarPorAutor(autor);
    }
    buscarPorCapitulo(livroId, capitulo, versiculo) {
        return this.comentariosService.buscarPorReferencia(livroId, +capitulo, versiculo ? +versiculo : undefined);
    }
};
exports.ComentariosController = ComentariosController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('autores'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista autores de comentários' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "listarAutores", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)('autor/:autor'),
    (0, swagger_1.ApiOperation)({ summary: 'Comentários por autor' }),
    __param(0, (0, common_1.Param)('autor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "buscarPorAutor", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(':livroId/:capitulo'),
    (0, swagger_1.ApiOperation)({ summary: 'Comentários de um capítulo' }),
    (0, swagger_1.ApiQuery)({ name: 'versiculo', required: false }),
    __param(0, (0, common_1.Param)('livroId')),
    __param(1, (0, common_1.Param)('capitulo')),
    __param(2, (0, common_1.Query)('versiculo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], ComentariosController.prototype, "buscarPorCapitulo", null);
exports.ComentariosController = ComentariosController = __decorate([
    (0, swagger_1.ApiTags)('Comentários'),
    (0, common_1.Controller)('comentarios'),
    __metadata("design:paramtypes", [comentarios_service_1.ComentariosService])
], ComentariosController);
//# sourceMappingURL=comentarios.controller.js.map