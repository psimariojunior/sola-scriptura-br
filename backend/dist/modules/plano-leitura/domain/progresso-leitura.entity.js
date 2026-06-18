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
exports.ProgressoLeitura = void 0;
const typeorm_1 = require("typeorm");
const plano_leitura_entity_1 = require("./plano-leitura.entity");
let ProgressoLeitura = class ProgressoLeitura {
};
exports.ProgressoLeitura = ProgressoLeitura;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProgressoLeitura.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", String)
], ProgressoLeitura.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plano_id' }),
    __metadata("design:type", String)
], ProgressoLeitura.prototype, "planoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plano_leitura_entity_1.PlanoLeitura, (plano) => plano.progressos),
    (0, typeorm_1.JoinColumn)({ name: 'plano_id' }),
    __metadata("design:type", plano_leitura_entity_1.PlanoLeitura)
], ProgressoLeitura.prototype, "plano", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'dia_atual' }),
    __metadata("design:type", Number)
], ProgressoLeitura.prototype, "diaAtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'dias_completos' }),
    __metadata("design:type", Array)
], ProgressoLeitura.prototype, "diasCompletos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'data_inicio' }),
    __metadata("design:type", Date)
], ProgressoLeitura.prototype, "dataInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true, name: 'data_conclusao' }),
    __metadata("design:type", Date)
], ProgressoLeitura.prototype, "dataConclusao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'concluido' }),
    __metadata("design:type", Boolean)
], ProgressoLeitura.prototype, "concluido", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], ProgressoLeitura.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], ProgressoLeitura.prototype, "atualizadoEm", void 0);
exports.ProgressoLeitura = ProgressoLeitura = __decorate([
    (0, typeorm_1.Entity)('progressos_leitura')
], ProgressoLeitura);
//# sourceMappingURL=progresso-leitura.entity.js.map