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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuario_service_1 = require("../application/usuario.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const usuario_atual_decorator_1 = require("../../../common/decorators/usuario-atual.decorator");
let UsuarioController = class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    buscarPerfil(usuarioId) {
        return this.usuarioService.buscarPerfil(usuarioId);
    }
    atualizarPerfil(usuarioId, dados) {
        return this.usuarioService.atualizarPerfil(usuarioId, dados);
    }
    atualizarPreferencias(usuarioId, dados) {
        return this.usuarioService.atualizarPreferencias(usuarioId, dados);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)('perfil'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca perfil do usuário logado' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "buscarPerfil", null);
__decorate([
    (0, common_1.Put)('perfil'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza perfil do usuário' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "atualizarPerfil", null);
__decorate([
    (0, common_1.Put)('preferencias'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza preferências do usuário' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "atualizarPreferencias", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('Usuário'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
//# sourceMappingURL=usuario.controller.js.map