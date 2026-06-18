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
exports.Artefato = void 0;
const typeorm_1 = require("typeorm");
let Artefato = class Artefato {
};
exports.Artefato = Artefato;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Artefato.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Artefato.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], Artefato.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tipo' }),
    __metadata("design:type", String)
], Artefato.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'material' }),
    __metadata("design:type", String)
], Artefato.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_estimada' }),
    __metadata("design:type", String)
], Artefato.prototype, "dataEstimada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'local_descoberta' }),
    __metadata("design:type", String)
], Artefato.prototype, "localDescoberta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'local_atual' }),
    __metadata("design:type", String)
], Artefato.prototype, "localAtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'dimensoes' }),
    __metadata("design:type", Object)
], Artefato.prototype, "dimensoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'inscricoes' }),
    __metadata("design:type", Array)
], Artefato.prototype, "inscricoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_biblico' }),
    __metadata("design:type", String)
], Artefato.prototype, "significadoBiblico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' }),
    __metadata("design:type", Array)
], Artefato.prototype, "referenciasBiblicas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'imagens' }),
    __metadata("design:type", Array)
], Artefato.prototype, "imagens", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fontes' }),
    __metadata("design:type", String)
], Artefato.prototype, "fontes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Artefato.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Artefato.prototype, "atualizadoEm", void 0);
exports.Artefato = Artefato = __decorate([
    (0, typeorm_1.Entity)('arte_fatos')
], Artefato);
//# sourceMappingURL=artefato.entity.js.map