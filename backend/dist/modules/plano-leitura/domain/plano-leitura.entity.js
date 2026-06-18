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
exports.PlanoLeitura = void 0;
const typeorm_1 = require("typeorm");
const progresso_leitura_entity_1 = require("./progresso-leitura.entity");
let PlanoLeitura = class PlanoLeitura {
};
exports.PlanoLeitura = PlanoLeitura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlanoLeitura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], PlanoLeitura.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], PlanoLeitura.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_dias' }),
    __metadata("design:type", Number)
], PlanoLeitura.prototype, "totalDias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'capitulos_por_dia', default: 1 }),
    __metadata("design:type", Number)
], PlanoLeitura.prototype, "capitulosPorDia", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', name: 'programacao' }),
    __metadata("design:type", Object)
], PlanoLeitura.prototype, "programacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'categoria' }),
    __metadata("design:type", String)
], PlanoLeitura.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'publico' }),
    __metadata("design:type", Boolean)
], PlanoLeitura.prototype, "publico", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => progresso_leitura_entity_1.ProgressoLeitura, (p) => p.plano),
    __metadata("design:type", Array)
], PlanoLeitura.prototype, "progressos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], PlanoLeitura.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], PlanoLeitura.prototype, "atualizadoEm", void 0);
exports.PlanoLeitura = PlanoLeitura = __decorate([
    (0, typeorm_1.Entity)('planos_leitura')
], PlanoLeitura);
//# sourceMappingURL=plano-leitura.entity.js.map