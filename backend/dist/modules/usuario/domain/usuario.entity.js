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
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const perfil_usuario_entity_1 = require("./perfil-usuario.entity");
const preferencia_usuario_entity_1 = require("./preferencia-usuario.entity");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'senha_hash', select: false }),
    __metadata("design:type", String)
], Usuario.prototype, "senhaHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "ativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'email_verificado' }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "emailVerificado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'mfa_ativado' }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "mfaAtivado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'mfa_segredo', select: false }),
    __metadata("design:type", String)
], Usuario.prototype, "mfaSegredo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'mfa_codigos_recovery' }),
    __metadata("design:type", Array)
], Usuario.prototype, "mfaCodigosRecovery", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'foto_url' }),
    __metadata("design:type", String)
], Usuario.prototype, "fotoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'provedores_oauth' }),
    __metadata("design:type", Object)
], Usuario.prototype, "provedoresOAuth", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'permissoes' }),
    __metadata("design:type", Array)
], Usuario.prototype, "permissoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plano', length: 20, default: 'free' }),
    __metadata("design:type", String)
], Usuario.prototype, "plano", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, name: 'ultimo_acesso' }),
    __metadata("design:type", Date)
], Usuario.prototype, "ultimoAcesso", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => perfil_usuario_entity_1.PerfilUsuario, (perfil) => perfil.usuario, { cascade: true }),
    __metadata("design:type", perfil_usuario_entity_1.PerfilUsuario)
], Usuario.prototype, "perfil", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => preferencia_usuario_entity_1.PreferenciaUsuario, (pref) => pref.usuario, { cascade: true }),
    __metadata("design:type", preferencia_usuario_entity_1.PreferenciaUsuario)
], Usuario.prototype, "preferencias", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Usuario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Usuario.prototype, "atualizadoEm", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map