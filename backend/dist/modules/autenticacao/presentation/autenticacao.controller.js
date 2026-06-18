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
exports.AutenticacaoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const autenticacao_service_1 = require("../application/autenticacao.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const usuario_atual_decorator_1 = require("../../../common/decorators/usuario-atual.decorator");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let AutenticacaoController = class AutenticacaoController {
    constructor(authService) {
        this.authService = authService;
    }
    cadastrar(dados) {
        return this.authService.cadastrar(dados);
    }
    login(credenciais) {
        return this.authService.login(credenciais.email, credenciais.senha);
    }
    refresh(dados) {
        return this.authService.refresh(dados.refreshToken);
    }
    logout(usuarioId) {
        return this.authService.logout(usuarioId);
    }
};
exports.AutenticacaoController = AutenticacaoController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('cadastrar'),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastro de novo usuário' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutenticacaoController.prototype, "cadastrar", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login de usuário' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutenticacaoController.prototype, "login", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Renovar token de acesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AutenticacaoController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Logout de usuário' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AutenticacaoController.prototype, "logout", null);
exports.AutenticacaoController = AutenticacaoController = __decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [autenticacao_service_1.AutenticacaoService])
], AutenticacaoController);
//# sourceMappingURL=autenticacao.controller.js.map