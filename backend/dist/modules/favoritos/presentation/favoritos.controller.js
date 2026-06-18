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
exports.FavoritosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const favoritos_service_1 = require("../application/favoritos.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const usuario_atual_decorator_1 = require("../../../common/decorators/usuario-atual.decorator");
let FavoritosController = class FavoritosController {
    constructor(favoritosService) {
        this.favoritosService = favoritosService;
    }
    listar(usuarioId) {
        return this.favoritosService.listar(usuarioId);
    }
    adicionar(usuarioId, dados) {
        return this.favoritosService.adicionar(usuarioId, dados.versiculoId, dados.etiquetas, dados.notaPessoal);
    }
    remover(usuarioId, id) {
        return this.favoritosService.remover(usuarioId, id);
    }
};
exports.FavoritosController = FavoritosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista favoritos do usuário' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritosController.prototype, "listar", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Adiciona versículo aos favoritos' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FavoritosController.prototype, "adicionar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove favorito' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoritosController.prototype, "remover", null);
exports.FavoritosController = FavoritosController = __decorate([
    (0, swagger_1.ApiTags)('Favoritos'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('favoritos'),
    __metadata("design:paramtypes", [favoritos_service_1.FavoritosService])
], FavoritosController);
//# sourceMappingURL=favoritos.controller.js.map