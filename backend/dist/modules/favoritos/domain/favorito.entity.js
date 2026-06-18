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
exports.Favorito = void 0;
const typeorm_1 = require("typeorm");
let Favorito = class Favorito {
};
exports.Favorito = Favorito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Favorito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario_id' }),
    __metadata("design:type", String)
], Favorito.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'versiculo_id' }),
    __metadata("design:type", String)
], Favorito.prototype, "versiculoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'etiquetas', array: true }),
    __metadata("design:type", Array)
], Favorito.prototype, "etiquetas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'nota_pessoal' }),
    __metadata("design:type", String)
], Favorito.prototype, "notaPessoal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0, name: 'ordem' }),
    __metadata("design:type", Number)
], Favorito.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Favorito.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Favorito.prototype, "atualizadoEm", void 0);
exports.Favorito = Favorito = __decorate([
    (0, typeorm_1.Entity)('favoritos')
], Favorito);
//# sourceMappingURL=favorito.entity.js.map