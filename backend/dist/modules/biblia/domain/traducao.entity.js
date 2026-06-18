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
exports.Traducao = void 0;
const typeorm_1 = require("typeorm");
const livro_entity_1 = require("./livro.entity");
const versiculo_entity_1 = require("./versiculo.entity");
let Traducao = class Traducao {
};
exports.Traducao = Traducao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Traducao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Traducao.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, unique: true }),
    __metadata("design:type", String)
], Traducao.prototype, "sigla", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'descricao' }),
    __metadata("design:type", String)
], Traducao.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, name: 'idioma' }),
    __metadata("design:type", String)
], Traducao.prototype, "idioma", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'ano_publicacao', nullable: true }),
    __metadata("design:type", Number)
], Traducao.prototype, "anoPublicacao", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true, name: 'copyright' }),
    __metadata("design:type", String)
], Traducao.prototype, "copyright", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true, name: 'licenca_publica' }),
    __metadata("design:type", Boolean)
], Traducao.prototype, "licencaPublica", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false, name: 'gratuita' }),
    __metadata("design:type", Boolean)
], Traducao.prototype, "gratuita", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'livro_id', nullable: true }),
    __metadata("design:type", String)
], Traducao.prototype, "livroId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => livro_entity_1.Livro, (livro) => livro.traducoes),
    (0, typeorm_1.JoinColumn)({ name: 'livro_id' }),
    __metadata("design:type", livro_entity_1.Livro)
], Traducao.prototype, "livro", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => versiculo_entity_1.Versiculo, (versiculo) => versiculo.capitulo),
    __metadata("design:type", Array)
], Traducao.prototype, "versiculos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'criado_em' }),
    __metadata("design:type", Date)
], Traducao.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'atualizado_em' }),
    __metadata("design:type", Date)
], Traducao.prototype, "atualizadoEm", void 0);
exports.Traducao = Traducao = __decorate([
    (0, typeorm_1.Entity)('traducoes')
], Traducao);
//# sourceMappingURL=traducao.entity.js.map