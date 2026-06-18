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
exports.Nota = void 0;
const typeorm_1 = require("typeorm");
const versiculo_entity_1 = require("../../biblia/domain/versiculo.entity");
let Nota = class Nota {
};
exports.Nota = Nota;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Nota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", String)
], Nota.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_id', nullable: true }),
    __metadata("design:type", String)
], Nota.prototype, "versiculoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => versiculo_entity_1.Versiculo, (v) => v.notas),
    (0, typeorm_1.JoinColumn)({ name: 'versiculo_id' }),
    __metadata("design:type", versiculo_entity_1.Versiculo)
], Nota.prototype, "versiculo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'conteudo' }),
    __metadata("design:type", String)
], Nota.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'etiquetas' }),
    __metadata("design:type", Array)
], Nota.prototype, "etiquetas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'cor_destaque' }),
    __metadata("design:type", String)
], Nota.prototype, "corDestaque", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'publica' }),
    __metadata("design:type", Boolean)
], Nota.prototype, "publica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'sincronizado' }),
    __metadata("design:type", Boolean)
], Nota.prototype, "sincronizado", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Nota.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Nota.prototype, "atualizadoEm", void 0);
exports.Nota = Nota = __decorate([
    (0, typeorm_1.Entity)('notas')
], Nota);
//# sourceMappingURL=nota.entity.js.map