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
exports.ContextoHistorico = void 0;
const typeorm_1 = require("typeorm");
let ContextoHistorico = class ContextoHistorico {
};
exports.ContextoHistorico = ContextoHistorico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entidade_tipo', length: 50 }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "entidadeTipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entidade_id' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "entidadeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'autor' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_estimada' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "dataEstimada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'destinatarios' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "destinatarios", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_politico' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "contextoPolitico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_religioso' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "contextoReligioso", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_economico' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "contextoEconomico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'contexto_cultural' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "contextoCultural", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'imperios_envolvidos' }),
    __metadata("design:type", Array)
], ContextoHistorico.prototype, "imperiosEnvolvidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'governantes' }),
    __metadata("design:type", Array)
], ContextoHistorico.prototype, "governantes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'eventos_contemporaneos' }),
    __metadata("design:type", Array)
], ContextoHistorico.prototype, "eventosContemporaneos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_teologico' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "significadoTeologico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fontes' }),
    __metadata("design:type", String)
], ContextoHistorico.prototype, "fontes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], ContextoHistorico.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], ContextoHistorico.prototype, "atualizadoEm", void 0);
exports.ContextoHistorico = ContextoHistorico = __decorate([
    (0, typeorm_1.Entity)('contextos_historicos')
], ContextoHistorico);
//# sourceMappingURL=contexto-historico.entity.js.map