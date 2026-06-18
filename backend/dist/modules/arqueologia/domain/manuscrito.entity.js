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
exports.Manuscrito = void 0;
const typeorm_1 = require("typeorm");
let Manuscrito = class Manuscrito {
};
exports.Manuscrito = Manuscrito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Manuscrito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Manuscrito.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'tipo' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'material' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "material", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'data_estimada' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "dataEstimada", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'local_descoberta' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "localDescoberta", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'local_atual' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "localAtual", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'idioma' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'conteudo' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "conteudo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'passagens_incluidas' }),
    __metadata("design:type", Array)
], Manuscrito.prototype, "passagensIncluidas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'significado' }),
    __metadata("design:type", String)
], Manuscrito.prototype, "significado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'imagens' }),
    __metadata("design:type", Array)
], Manuscrito.prototype, "imagens", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Manuscrito.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Manuscrito.prototype, "atualizadoEm", void 0);
exports.Manuscrito = Manuscrito = __decorate([
    (0, typeorm_1.Entity)('manuscritos')
], Manuscrito);
//# sourceMappingURL=manuscrito.entity.js.map