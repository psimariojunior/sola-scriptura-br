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
exports.Personagem = void 0;
const typeorm_1 = require("typeorm");
let Personagem = class Personagem {
};
exports.Personagem = Personagem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Personagem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, name: 'nome_portugues' }),
    __metadata("design:type", String)
], Personagem.prototype, "nomePortugues", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_original' }),
    __metadata("design:type", String)
], Personagem.prototype, "nomeOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_hebraico' }),
    __metadata("design:type", String)
], Personagem.prototype, "nomeHebraico", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, name: 'nome_grego' }),
    __metadata("design:type", String)
], Personagem.prototype, "nomeGrego", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Personagem.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'biografia' }),
    __metadata("design:type", String)
], Personagem.prototype, "biografia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_nome' }),
    __metadata("design:type", String)
], Personagem.prototype, "significadoNome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'primeira_mencao' }),
    __metadata("design:type", String)
], Personagem.prototype, "primeiraMencao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'ultima_mençao' }),
    __metadata("design:type", String)
], Personagem.prototype, "ultimaMencao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'total_mencoes' }),
    __metadata("design:type", Number)
], Personagem.prototype, "totalMencoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'familia' }),
    __metadata("design:type", Object)
], Personagem.prototype, "familia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'eventos_principais' }),
    __metadata("design:type", Array)
], Personagem.prototype, "eventosPrincipais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'relacoes' }),
    __metadata("design:type", Array)
], Personagem.prototype, "relacoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'versoes_referencias' }),
    __metadata("design:type", Array)
], Personagem.prototype, "versoesReferencias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'genealogia' }),
    __metadata("design:type", String)
], Personagem.prototype, "genealogia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_teologico' }),
    __metadata("design:type", String)
], Personagem.prototype, "significadoTeologico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'vetor_embedding', array: true, precision: 1536 }),
    __metadata("design:type", Array)
], Personagem.prototype, "vetorEmbedding", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Personagem.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Personagem.prototype, "atualizadoEm", void 0);
exports.Personagem = Personagem = __decorate([
    (0, typeorm_1.Entity)('personagens')
], Personagem);
//# sourceMappingURL=personagem.entity.js.map