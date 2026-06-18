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
exports.EventoHistorico = void 0;
const typeorm_1 = require("typeorm");
let EventoHistorico = class EventoHistorico {
};
exports.EventoHistorico = EventoHistorico;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventoHistorico.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'categoria' }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'ano_inicio' }),
    __metadata("design:type", Number)
], EventoHistorico.prototype, "anoInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true, name: 'ano_fim' }),
    __metadata("design:type", Number)
], EventoHistorico.prototype, "anoFim", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, default: 'AC', name: 'era' }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "era", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' }),
    __metadata("design:type", Array)
], EventoHistorico.prototype, "referenciasBiblicas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'personagens_envolvidos' }),
    __metadata("design:type", Array)
], EventoHistorico.prototype, "personagensEnvolvidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_teologico' }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "significadoTeologico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'fontes' }),
    __metadata("design:type", String)
], EventoHistorico.prototype, "fontes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], EventoHistorico.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], EventoHistorico.prototype, "atualizadoEm", void 0);
exports.EventoHistorico = EventoHistorico = __decorate([
    (0, typeorm_1.Entity)('eventos_historicos'),
    (0, typeorm_1.Index)(['anoInicio', 'anoFim'])
], EventoHistorico);
//# sourceMappingURL=evento-historico.entity.js.map