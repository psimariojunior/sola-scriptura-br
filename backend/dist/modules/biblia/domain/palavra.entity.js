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
exports.Palavra = void 0;
const typeorm_1 = require("typeorm");
const versiculo_entity_1 = require("./versiculo.entity");
let Palavra = class Palavra {
};
exports.Palavra = Palavra;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Palavra.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Palavra.prototype, "texto", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Palavra.prototype, "posicao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'texto_original' }),
    __metadata("design:type", String)
], Palavra.prototype, "textoOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'idioma_original' }),
    __metadata("design:type", String)
], Palavra.prototype, "idiomaOriginal", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true, name: 'strong_grego' }),
    __metadata("design:type", String)
], Palavra.prototype, "strongGrego", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true, name: 'strong_hebraico' }),
    __metadata("design:type", String)
], Palavra.prototype, "strongHebraico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'lemma' }),
    __metadata("design:type", String)
], Palavra.prototype, "lemma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'transliteracao' }),
    __metadata("design:type", String)
], Palavra.prototype, "transliteracao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'pronuncia' }),
    __metadata("design:type", String)
], Palavra.prototype, "pronuncia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'definicao' }),
    __metadata("design:type", String)
], Palavra.prototype, "definicao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'morfologia' }),
    __metadata("design:type", String)
], Palavra.prototype, "morfologia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'classe_gramatical' }),
    __metadata("design:type", String)
], Palavra.prototype, "classeGramatical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tempo_verbal' }),
    __metadata("design:type", String)
], Palavra.prototype, "tempoVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'voz_verbal' }),
    __metadata("design:type", String)
], Palavra.prototype, "vozVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'modo_verbal' }),
    __metadata("design:type", String)
], Palavra.prototype, "modoVerbal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'frequencia' }),
    __metadata("design:type", Number)
], Palavra.prototype, "frequencia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tipo_entidade' }),
    __metadata("design:type", String)
], Palavra.prototype, "tipoEntidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'entidade_id' }),
    __metadata("design:type", String)
], Palavra.prototype, "entidadeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_id' }),
    __metadata("design:type", String)
], Palavra.prototype, "versiculoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => versiculo_entity_1.Versiculo, (versiculo) => versiculo.palavras),
    (0, typeorm_1.JoinColumn)({ name: 'versiculo_id' }),
    __metadata("design:type", versiculo_entity_1.Versiculo)
], Palavra.prototype, "versiculo", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Palavra.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Palavra.prototype, "atualizadoEm", void 0);
exports.Palavra = Palavra = __decorate([
    (0, typeorm_1.Entity)('palavras'),
    (0, typeorm_1.Index)(['versiculoId', 'posicao'])
], Palavra);
//# sourceMappingURL=palavra.entity.js.map