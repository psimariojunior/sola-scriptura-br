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
exports.Versiculo = void 0;
const typeorm_1 = require("typeorm");
const capitulo_entity_1 = require("./capitulo.entity");
const palavra_entity_1 = require("./palavra.entity");
const referencia_cruzada_entity_1 = require("../../referencias/domain/referencia-cruzada.entity");
const nota_entity_1 = require("../../notas/domain/nota.entity");
let Versiculo = class Versiculo {
};
exports.Versiculo = Versiculo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Versiculo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Versiculo.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Versiculo.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'texto_formatado', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Versiculo.prototype, "textoFormatado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'livro_id' }),
    __metadata("design:type", String)
], Versiculo.prototype, "livroId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'capitulo_id' }),
    __metadata("design:type", String)
], Versiculo.prototype, "capituloId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'capitulo_numero' }),
    __metadata("design:type", Number)
], Versiculo.prototype, "capituloNumero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'traducao_id' }),
    __metadata("design:type", String)
], Versiculo.prototype, "traducaoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'testamento_id' }),
    __metadata("design:type", String)
], Versiculo.prototype, "testamentoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => capitulo_entity_1.Capitulo, (capitulo) => capitulo.versiculos),
    (0, typeorm_1.JoinColumn)({ name: 'capitulo_id' }),
    __metadata("design:type", capitulo_entity_1.Capitulo)
], Versiculo.prototype, "capitulo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => palavra_entity_1.Palavra, (palavra) => palavra.versiculo),
    __metadata("design:type", Array)
], Versiculo.prototype, "palavras", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => referencia_cruzada_entity_1.ReferenciaCruzada, (ref) => ref.versiculoOrigem),
    __metadata("design:type", Array)
], Versiculo.prototype, "referenciasOrigem", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => referencia_cruzada_entity_1.ReferenciaCruzada, (ref) => ref.versiculoDestino),
    __metadata("design:type", Array)
], Versiculo.prototype, "referenciasDestino", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => nota_entity_1.Nota, (nota) => nota.versiculo),
    __metadata("design:type", Array)
], Versiculo.prototype, "notas", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Versiculo.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Versiculo.prototype, "atualizadoEm", void 0);
exports.Versiculo = Versiculo = __decorate([
    (0, typeorm_1.Entity)('versiculos'),
    (0, typeorm_1.Index)(['capituloId', 'numero'], { unique: true }),
    (0, typeorm_1.Index)(['livroId', 'capituloNumero', 'numero'])
], Versiculo);
//# sourceMappingURL=versiculo.entity.js.map