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
exports.PreferenciaUsuario = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
let PreferenciaUsuario = class PreferenciaUsuario {
};
exports.PreferenciaUsuario = PreferenciaUsuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id', unique: true }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => usuario_entity_1.Usuario, (usuario) => usuario.preferencias),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], PreferenciaUsuario.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'pt-BR', name: 'idioma' }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: 'pt-BR', name: 'locale' }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "locale", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'dracula', name: 'tema' }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "tema", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, default: '18', name: 'tamanho_fonte' }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "tamanhoFonte", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, default: 'nova-versao-internacional', name: 'traducao_padrao' }),
    __metadata("design:type", String)
], PreferenciaUsuario.prototype, "traducaoPadrao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'mostrar_strong' }),
    __metadata("design:type", Boolean)
], PreferenciaUsuario.prototype, "mostrarStrong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'mostrar_notas_rodape' }),
    __metadata("design:type", Boolean)
], PreferenciaUsuario.prototype, "mostrarNotasRodape", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'mostrar_versiculos_paralelos' }),
    __metadata("design:type", Boolean)
], PreferenciaUsuario.prototype, "mostrarVersiculosParalelos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'notificacoes_estudo' }),
    __metadata("design:type", Boolean)
], PreferenciaUsuario.prototype, "notificacoesEstudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'modo_escuro' }),
    __metadata("design:type", Boolean)
], PreferenciaUsuario.prototype, "modoEscuro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'layout_personalizado' }),
    __metadata("design:type", Object)
], PreferenciaUsuario.prototype, "layoutPersonalizado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PreferenciaUsuario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PreferenciaUsuario.prototype, "atualizadoEm", void 0);
exports.PreferenciaUsuario = PreferenciaUsuario = __decorate([
    (0, typeorm_1.Entity)('preferencias_usuario')
], PreferenciaUsuario);
//# sourceMappingURL=preferencia-usuario.entity.js.map