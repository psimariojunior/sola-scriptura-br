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
exports.Capitulo = void 0;
const typeorm_1 = require("typeorm");
const livro_entity_1 = require("./livro.entity");
const versiculo_entity_1 = require("./versiculo.entity");
let Capitulo = class Capitulo {
};
exports.Capitulo = Capitulo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Capitulo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Capitulo.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_versiculos', default: 0 }),
    __metadata("design:type", Number)
], Capitulo.prototype, "totalVersiculos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'resumo' }),
    __metadata("design:type", String)
], Capitulo.prototype, "resumo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'temas_principais', array: true }),
    __metadata("design:type", Array)
], Capitulo.prototype, "temasPrincipais", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'livro_id' }),
    __metadata("design:type", String)
], Capitulo.prototype, "livroId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => livro_entity_1.Livro, (livro) => livro.capitulos),
    (0, typeorm_1.JoinColumn)({ name: 'livro_id' }),
    __metadata("design:type", livro_entity_1.Livro)
], Capitulo.prototype, "livro", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => versiculo_entity_1.Versiculo, (versiculo) => versiculo.capitulo),
    __metadata("design:type", Array)
], Capitulo.prototype, "versiculos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Capitulo.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Capitulo.prototype, "atualizadoEm", void 0);
exports.Capitulo = Capitulo = __decorate([
    (0, typeorm_1.Entity)('capitulos'),
    (0, typeorm_1.Index)(['livroId', 'numero'], { unique: true })
], Capitulo);
//# sourceMappingURL=capitulo.entity.js.map