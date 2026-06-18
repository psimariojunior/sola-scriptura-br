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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfilUsuario = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
let PerfilUsuario = class PerfilUsuario {
};
exports.PerfilUsuario = PerfilUsuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', unique: true }),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.perfil),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], PerfilUsuario.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'bio' }),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'denominacao' }),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "denominacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'interesses' }),
    __metadata("design:type", Array)
], PerfilUsuario.prototype, "interesses", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'idiomas_preferidos', array: true }),
    __metadata("design:type", Array)
], PerfilUsuario.prototype, "idiomasPreferidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tradicao_teologica' }),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "tradicaoTeologica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'nivel_estudo' }),
    __metadata("design:type", String)
], PerfilUsuario.prototype, "nivelEstudo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PerfilUsuario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PerfilUsuario.prototype, "atualizadoEm", void 0);
exports.PerfilUsuario = PerfilUsuario = __decorate([
    (0, typeorm_1.Entity)('perfis_usuario')
], PerfilUsuario);
//# sourceMappingURL=perfil-usuario.entity.js.map