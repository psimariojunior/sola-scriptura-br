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
exports.Comentario = void 0;
const typeorm_1 = require("typeorm");
let Comentario = class Comentario {
};
exports.Comentario = Comentario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Comentario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, name: 'titulo' }),
    __metadata("design:type", String)
], Comentario.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'autor' }),
    __metadata("design:type", String)
], Comentario.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'referencia' }),
    __metadata("design:type", String)
], Comentario.prototype, "referencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'livro_id', nullable: true }),
    __metadata("design:type", String)
], Comentario.prototype, "livroId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'capitulo' }),
    __metadata("design:type", Number)
], Comentario.prototype, "capitulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'versiculo_inicio' }),
    __metadata("design:type", Number)
], Comentario.prototype, "versiculoInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'versiculo_fim' }),
    __metadata("design:type", Number)
], Comentario.prototype, "versiculoFim", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Comentario.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tradicao_teologica' }),
    __metadata("design:type", String)
], Comentario.prototype, "tradicaoTeologica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fonte' }),
    __metadata("design:type", String)
], Comentario.prototype, "fonte", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'licenca_publica' }),
    __metadata("design:type", Boolean)
], Comentario.prototype, "licencaPublica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'idioma', default: 'pt-BR' }),
    __metadata("design:type", String)
], Comentario.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Comentario.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Comentario.prototype, "atualizadoEm", void 0);
exports.Comentario = Comentario = __decorate([
    (0, typeorm_1.Entity)('comentarios')
], Comentario);
//# sourceMappingURL=comentario.entity.js.map