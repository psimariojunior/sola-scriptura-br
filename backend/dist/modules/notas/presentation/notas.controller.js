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
exports.NotasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notas_service_1 = require("../application/notas.service");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const usuario_atual_decorator_1 = require("../../../common/decorators/usuario-atual.decorator");
let NotasController = class NotasController {
    constructor(notasService) {
        this.notasService = notasService;
    }
    listar(usuarioId, versiculoId) {
        return this.notasService.listar(usuarioId, versiculoId);
    }
    criar(usuarioId, dados) {
        return this.notasService.criar(usuarioId, dados);
    }
    atualizar(usuarioId, id, dados) {
        return this.notasService.atualizar(id, usuarioId, dados);
    }
    remover(usuarioId, id) {
        return this.notasService.remover(id, usuarioId);
    }
};
exports.NotasController = NotasController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista notas do usuário' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Query)('versiculoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotasController.prototype, "listar", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria nova nota' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotasController.prototype, "criar", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza nota' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], NotasController.prototype, "atualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove nota' }),
    __param(0, (0, usuario_atual_decorator_1.UsuarioAtual)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotasController.prototype, "remover", null);
exports.NotasController = NotasController = __decorate([
    (0, swagger_1.ApiTags)('Notas'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('notas'),
    __metadata("design:paramtypes", [notas_service_1.NotasService])
], NotasController);
//# sourceMappingURL=notas.controller.js.map