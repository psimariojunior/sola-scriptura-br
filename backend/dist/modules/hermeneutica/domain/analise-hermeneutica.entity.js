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
exports.AnaliseHermeneutica = void 0;
const typeorm_1 = require("typeorm");
let AnaliseHermeneutica = class AnaliseHermeneutica {
};
exports.AnaliseHermeneutica = AnaliseHermeneutica;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_id' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "versiculoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'genero_literario' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "generoLiterario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'principios_hermeneuticos' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "principiosHermeneuticos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'interpretacao_historica' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "interpretacaoHistorica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'interpretacao_gramatical' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "interpretacaoGramatical", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'interpretacao_contextual' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "interpretacaoContextual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'interpretacao_teologica' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "interpretacaoTeologica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'aplicacao_contemporanea' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "aplicacaoContemporanea", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'principios_aplicados' }),
    __metadata("design:type", Array)
], AnaliseHermeneutica.prototype, "principiosAplicados", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'interpretacoes_tradicoes' }),
    __metadata("design:type", Object)
], AnaliseHermeneutica.prototype, "interpretacoesTradicoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'observacoes' }),
    __metadata("design:type", String)
], AnaliseHermeneutica.prototype, "observacoes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], AnaliseHermeneutica.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], AnaliseHermeneutica.prototype, "atualizadoEm", void 0);
exports.AnaliseHermeneutica = AnaliseHermeneutica = __decorate([
    (0, typeorm_1.Entity)('analises_hermeneuticas')
], AnaliseHermeneutica);
//# sourceMappingURL=analise-hermeneutica.entity.js.map