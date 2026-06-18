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
exports.ReferenciaCruzada = void 0;
const typeorm_1 = require("typeorm");
const versiculo_entity_1 = require("../../biblia/domain/versiculo.entity");
let ReferenciaCruzada = class ReferenciaCruzada {
};
exports.ReferenciaCruzada = ReferenciaCruzada;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReferenciaCruzada.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_origem_id' }),
    __metadata("design:type", String)
], ReferenciaCruzada.prototype, "versiculoOrigemId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_destino_id' }),
    __metadata("design:type", String)
], ReferenciaCruzada.prototype, "versiculoDestinoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, name: 'tipo_relacao' }),
    __metadata("design:type", String)
], ReferenciaCruzada.prototype, "tipoRelacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], ReferenciaCruzada.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1, name: 'peso' }),
    __metadata("design:type", Number)
], ReferenciaCruzada.prototype, "peso", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => versiculo_entity_1.Versiculo, (v) => v.referenciasOrigem),
    (0, typeorm_1.JoinColumn)({ name: 'versiculo_origem_id' }),
    __metadata("design:type", versiculo_entity_1.Versiculo)
], ReferenciaCruzada.prototype, "versiculoOrigem", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => versiculo_entity_1.Versiculo, (v) => v.referenciasDestino),
    (0, typeorm_1.JoinColumn)({ name: 'versiculo_destino_id' }),
    __metadata("design:type", versiculo_entity_1.Versiculo)
], ReferenciaCruzada.prototype, "versiculoDestino", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], ReferenciaCruzada.prototype, "criadoEm", void 0);
exports.ReferenciaCruzada = ReferenciaCruzada = __decorate([
    (0, typeorm_1.Entity)('referencias_cruzadas')
], ReferenciaCruzada);
//# sourceMappingURL=referencia-cruzada.entity.js.map