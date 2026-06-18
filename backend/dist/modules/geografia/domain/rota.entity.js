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
exports.Rota = void 0;
const typeorm_1 = require("typeorm");
let Rota = class Rota {
};
exports.Rota = Rota;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Rota.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Rota.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Rota.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], Rota.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', name: 'pontos' }),
    __metadata("design:type", Array)
], Rota.prototype, "pontos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'cor_rota' }),
    __metadata("design:type", String)
], Rota.prototype, "corRota", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'referencias_biblicas' }),
    __metadata("design:type", Array)
], Rota.prototype, "referenciasBiblicas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'personagens_envolvidos', array: true }),
    __metadata("design:type", Array)
], Rota.prototype, "personagensEnvolvidos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Rota.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Rota.prototype, "atualizadoEm", void 0);
exports.Rota = Rota = __decorate([
    (0, typeorm_1.Entity)('rotas')
], Rota);
//# sourceMappingURL=rota.entity.js.map