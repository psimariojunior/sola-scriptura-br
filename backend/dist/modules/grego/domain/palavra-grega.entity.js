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
exports.PalavraGrega = void 0;
const typeorm_1 = require("typeorm");
let PalavraGrega = class PalavraGrega {
};
exports.PalavraGrega = PalavraGrega;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PalavraGrega.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "strong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'palavra_original' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "palavraOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "lemma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "transliteracao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "pronuncia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'definicao_curta' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "definicaoCurta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'definicao_completa', nullable: true }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "definicaoCompleta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "morfologia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'classe_gramatical' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "classeGramatical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tempo_verbal' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "tempoVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'voz_verbal' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "vozVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'modo_verbal' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "modoVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'caso' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "caso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'numero' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'genero' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'pessoa' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'frequencia_at' }),
    __metadata("design:type", Number)
], PalavraGrega.prototype, "frequenciaAT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'frequencia_nt' }),
    __metadata("design:type", Number)
], PalavraGrega.prototype, "frequenciaNT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'ocorrencias' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "ocorrencias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fonetica' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "fonetica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_bdag' }),
    __metadata("design:type", Object)
], PalavraGrega.prototype, "definicoesBdag", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_thayer' }),
    __metadata("design:type", Object)
], PalavraGrega.prototype, "definicoesThayer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_louw_nida' }),
    __metadata("design:type", Object)
], PalavraGrega.prototype, "definicoesLouwNida", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'dominio_semantico' }),
    __metadata("design:type", Object)
], PalavraGrega.prototype, "domainSemantico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'sinonimos' }),
    __metadata("design:type", Array)
], PalavraGrega.prototype, "sinonimos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'antonimos' }),
    __metadata("design:type", Array)
], PalavraGrega.prototype, "antonimos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'palavras_relacionadas', array: true }),
    __metadata("design:type", Array)
], PalavraGrega.prototype, "palavrasRelacionadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'notas_gramaticais' }),
    __metadata("design:type", String)
], PalavraGrega.prototype, "notasGramaticais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'vetor_embedding', array: true, precision: 1536 }),
    __metadata("design:type", Array)
], PalavraGrega.prototype, "vetorEmbedding", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PalavraGrega.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PalavraGrega.prototype, "atualizadoEm", void 0);
exports.PalavraGrega = PalavraGrega = __decorate([
    (0, typeorm_1.Entity)('palavras_gregas')
], PalavraGrega);
//# sourceMappingURL=palavra-grega.entity.js.map