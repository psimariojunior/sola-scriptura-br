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
exports.PalavraHebraica = void 0;
const typeorm_1 = require("typeorm");
let PalavraHebraica = class PalavraHebraica {
};
exports.PalavraHebraica = PalavraHebraica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, unique: true }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "strong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'palavra_original' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "palavraOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "lemma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "transliteracao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "pronuncia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'definicao_curta' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "definicaoCurta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'definicao_completa', nullable: true }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "definicaoCompleta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "morfologia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'classe_gramatical' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "classeGramatical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'raiz' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "raiz", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'padrao' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "padrao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'radical' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "radical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tipo_verbo' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "tipoVerbo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'conjugacao' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "conjugacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tempo' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "tempo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'pessoa' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "pessoa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'genero' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "genero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'numero' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'estado' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'frequencia_at' }),
    __metadata("design:type", Number)
], PalavraHebraica.prototype, "frequenciaAT", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'ocorrencias' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "ocorrencias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_bdb' }),
    __metadata("design:type", Object)
], PalavraHebraica.prototype, "definicoesBdb", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_halot' }),
    __metadata("design:type", Object)
], PalavraHebraica.prototype, "definicoesHalot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'definicoes_gesenius' }),
    __metadata("design:type", Object)
], PalavraHebraica.prototype, "definicoesGesenius", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'cognatos' }),
    __metadata("design:type", Array)
], PalavraHebraica.prototype, "cognatos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'palavras_relacionadas', array: true }),
    __metadata("design:type", Array)
], PalavraHebraica.prototype, "palavrasRelacionadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'notas_gramaticais' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "notasGramaticais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'ocorrencias_notaveis' }),
    __metadata("design:type", String)
], PalavraHebraica.prototype, "ocorrenciasNotaveis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'versiculos_chave' }),
    __metadata("design:type", Array)
], PalavraHebraica.prototype, "versiculosChave", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'vetor_embedding', array: true, precision: 1536 }),
    __metadata("design:type", Array)
], PalavraHebraica.prototype, "vetorEmbedding", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PalavraHebraica.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PalavraHebraica.prototype, "atualizadoEm", void 0);
exports.PalavraHebraica = PalavraHebraica = __decorate([
    (0, typeorm_1.Entity)('palavras_hebraicas')
], PalavraHebraica);
//# sourceMappingURL=palavra-hebraica.entity.js.map