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
exports.PlanoLeituraController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plano_leitura_service_1 = require("../application/plano-leitura.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const usuario_atual_decorator_1 = require("../../../common/decorators/usuario-atual.decorator");
const publico_decorator_1 = require("../../../common/decorators/publico.decorator");
let PlanoLeituraController = class PlanoLeituraController {
    constructor(planoSchema) {
        this.planoSchema = planoSchema;
    }
    listarPlanos() {
        return this.planoSchema.listarPlanos();
    }
    buscarPlano(id) {
        return this.planoSchema.buscarPlano(id);
    }
    iniciar(usuarioId, planoId) {
        return this.planoSchema.iniciarPlano(usuarioId, planoId);
    }
    avancar(usuarioId, progressoId) {
        return this.planoSchema.avancarDia(usuarioId, progressoId);
    }
    progresso(usuarioId) {
        return this.planoSchema.progressoUsuario(usuarioId);
    }
};
exports.PlanoLeituraController = PlanoLeituraController;
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista planos de leitura disponíveis' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanoLeituraController.prototype, "listarPlanos", null);
__decorate([
    (0, publico_decorator_1.Publico)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalhes de um plano de leitura' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanoLeituraController.prototype, "buscarPlano", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(':planoId/iniciar'),
    (0, swagger_1.ApiOperation)({ summary: 'Inicia um plano de leitura' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Param)('planoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanoLeituraController.prototype, "iniciar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)('progresso/:progressoId/avancar'),
    (0, swagger_1.ApiOperation)({ summary: 'Avança um dia no plano' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Param)('progressoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlanoLeituraController.prototype, "avancar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('usuario/progresso'),
    (0, swagger_1.ApiOperation)({ summary: 'Progresso do usuário nos planos' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlanoLeituraController.prototype, "progresso", null);
exports.PlanoLeituraController = PlanoLeituraController = __decorate([
    (0, swagger_1.ApiTags)('Plano de Leitura'),
    (0, common_1.Controller)('plano-leitura'),
    __metadata("design:paramtypes", [plano_leitura_service_1.PlanoLeituraService])
], PlanoLeituraController);
//# sourceMappingURL=plano-leitura.controller.js.map