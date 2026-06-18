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
exports.Escavacao = void 0;
const typeorm_1 = require("typeorm");
let Escavacao = class Escavacao {
};
exports.Escavacao = Escavacao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Escavacao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Escavacao.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'local' }),
    __metadata("design:type", String)
], Escavacao.prototype, "local", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'coordenadas' }),
    __metadata("design:type", String)
], Escavacao.prototype, "coordenadas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], Escavacao.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'arqueologo_responsavel' }),
    __metadata("design:type", String)
], Escavacao.prototype, "arqueologoResponsavel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_inicio' }),
    __metadata("design:type", String)
], Escavacao.prototype, "dataInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_fim' }),
    __metadata("design:type", String)
], Escavacao.prototype, "dataFim", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'descobertas' }),
    __metadata("design:type", Array)
], Escavacao.prototype, "descobertas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado_biblico' }),
    __metadata("design:type", String)
], Escavacao.prototype, "significadoBiblico", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'publicacoes' }),
    __metadata("design:type", Array)
], Escavacao.prototype, "publicacoes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Escavacao.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Escavacao.prototype, "atualizadoEm", void 0);
exports.Escavacao = Escavacao = __decorate([
    (0, typeorm_1.Entity)('escavacoes')
], Escavacao);
//# sourceMappingURL=escavacao.entity.js.map