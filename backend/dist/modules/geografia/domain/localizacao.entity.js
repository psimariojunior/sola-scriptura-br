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
exports.Localizacao = void 0;
const typeorm_1 = require("typeorm");
let Localizacao = class Localizacao {
};
exports.Localizacao = Localizacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Localizacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'nome_portugues' }),
    __metadata("design:type", String)
], Localizacao.prototype, "nomePortugues", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_original' }),
    __metadata("design:type", String)
], Localizacao.prototype, "nomeOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_ingles' }),
    __metadata("design:type", String)
], Localizacao.prototype, "nomeIngles", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_hebraico' }),
    __metadata("design:type", String)
], Localizacao.prototype, "nomeHebraico", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_grego' }),
    __metadata("design:type", String)
], Localizacao.prototype, "nomeGrego", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Localizacao.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'tipo' }),
    __metadata("design:type", String)
], Localizacao.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true, name: 'latitude' }),
    __metadata("design:type", Number)
], Localizacao.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 7, nullable: true, name: 'longitude' }),
    __metadata("design:type", Number)
], Localizacao.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'regiao' }),
    __metadata("design:type", String)
], Localizacao.prototype, "regiao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'pais_atual' }),
    __metadata("design:type", String)
], Localizacao.prototype, "paisAtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Localizacao.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'historia' }),
    __metadata("design:type", String)
], Localizacao.prototype, "historia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_biblico' }),
    __metadata("design:type", String)
], Localizacao.prototype, "significadoBiblico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'eventos_relacionados' }),
    __metadata("design:type", Array)
], Localizacao.prototype, "eventosRelacionados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'personagens_relacionados' }),
    __metadata("design:type", Array)
], Localizacao.prototype, "personagensRelacionados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'versoes_referencias' }),
    __metadata("design:type", Array)
], Localizacao.prototype, "versoesReferencias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'fotos' }),
    __metadata("design:type", Array)
], Localizacao.prototype, "fotos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fontes' }),
    __metadata("design:type", String)
], Localizacao.prototype, "fontes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'vetor_embedding', array: true, precision: 1536 }),
    __metadata("design:type", Array)
], Localizacao.prototype, "vetorEmbedding", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Localizacao.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Localizacao.prototype, "atualizadoEm", void 0);
exports.Localizacao = Localizacao = __decorate([
    (0, typeorm_1.Entity)('localizacoes')
], Localizacao);
//# sourceMappingURL=localizacao.entity.js.map