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
exports.Livro = void 0;
const typeorm_1 = require("typeorm");
const capitulo_entity_1 = require("./capitulo.entity");
const traducao_entity_1 = require("./traducao.entity");
const testamento_entity_1 = require("./testamento.entity");
let Livro = class Livro {
};
exports.Livro = Livro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Livro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Livro.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_abreviado', length: 30 }),
    __metadata("design:type", String)
], Livro.prototype, "nomeAbreviado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_ingles', length: 100, nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "nomeIngles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_hebraico', length: 100, nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "nomeHebraico", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_grego', length: 100, nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "nomeGrego", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, unique: true }),
    __metadata("design:type", String)
], Livro.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'ordem_testamento' }),
    __metadata("design:type", Number)
], Livro.prototype, "ordemTestamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'ordem_geral' }),
    __metadata("design:type", Number)
], Livro.prototype, "ordemGeral", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_capitulos', default: 0 }),
    __metadata("design:type", Number)
], Livro.prototype, "totalCapitulos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Livro.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_escrita' }),
    __metadata("design:type", String)
], Livro.prototype, "dataEscrita", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_historico' }),
    __metadata("design:type", String)
], Livro.prototype, "contextoHistorico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'proposito' }),
    __metadata("design:type", String)
], Livro.prototype, "proposito", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'temas_principais' }),
    __metadata("design:type", String)
], Livro.prototype, "temasPrincipais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'palavras_chave', array: true }),
    __metadata("design:type", Array)
], Livro.prototype, "palavrasChave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'genero_literario' }),
    __metadata("design:type", String)
], Livro.prototype, "generoLiterario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'testamento_id' }),
    __metadata("design:type", String)
], Livro.prototype, "testamentoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => testamento_entity_1.Testamento, (testamento) => testamento.livros),
    (0, typeorm_1.JoinColumn)({ name: 'testamento_id' }),
    __metadata("design:type", testamento_entity_1.Testamento)
], Livro.prototype, "testamento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => capitulo_entity_1.Capitulo, (capitulo) => capitulo.livro),
    __metadata("design:type", Array)
], Livro.prototype, "capitulos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => traducao_entity_1.Traducao, (traducao) => traducao.livro),
    __metadata("design:type", Array)
], Livro.prototype, "traducoes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Livro.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Livro.prototype, "atualizadoEm", void 0);
exports.Livro = Livro = __decorate([
    (0, typeorm_1.Entity)('livros')
], Livro);
//# sourceMappingURL=livro.entity.js.map