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
exports.Doutrina = void 0;
const typeorm_1 = require("typeorm");
const categoria_doutrina_entity_1 = require("./categoria-doutrina.entity");
const doutrina_versiculo_entity_1 = require("./doutrina-versiculo.entity");
let Doutrina = class Doutrina {
};
exports.Doutrina = Doutrina;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Doutrina.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Doutrina.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Doutrina.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'definicao' }),
    __metadata("design:type", String)
], Doutrina.prototype, "definicao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'explicacao' }),
    __metadata("design:type", String)
], Doutrina.prototype, "explicacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'base_scriptura' }),
    __metadata("design:type", String)
], Doutrina.prototype, "baseScriptura", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'interpretacoes' }),
    __metadata("design:type", Object)
], Doutrina.prototype, "interpretacoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'tradicoes' }),
    __metadata("design:type", Object)
], Doutrina.prototype, "tradicoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'controversias' }),
    __metadata("design:type", Array)
], Doutrina.prototype, "controversias", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true, name: 'passagens_chave' }),
    __metadata("design:type", Array)
], Doutrina.prototype, "passagensChave", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'categoria_id' }),
    __metadata("design:type", String)
], Doutrina.prototype, "categoriaId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categoria_doutrina_entity_1.CategoriaDoutrina, (cat) => cat.doutrinas),
    (0, typeorm_1.JoinColumn)({ name: 'categoria_id' }),
    __metadata("design:type", categoria_doutrina_entity_1.CategoriaDoutrina)
], Doutrina.prototype, "categoria", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doutrina_versiculo_entity_1.DoutrinaVersiculo, (dv) => dv.doutrina),
    __metadata("design:type", Array)
], Doutrina.prototype, "referencias", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Doutrina.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Doutrina.prototype, "atualizadoEm", void 0);
exports.Doutrina = Doutrina = __decorate([
    (0, typeorm_1.Entity)('doutrinas')
], Doutrina);
//# sourceMappingURL=doutrina.entity.js.map