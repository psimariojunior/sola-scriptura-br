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
exports.Testamento = void 0;
const typeorm_1 = require("typeorm");
const livro_entity_1 = require("./livro.entity");
let Testamento = class Testamento {
};
exports.Testamento = Testamento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Testamento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Testamento.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], Testamento.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'ordem' }),
    __metadata("design:type", Number)
], Testamento.prototype, "ordem", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'total_livros', default: 0 }),
    __metadata("design:type", Number)
], Testamento.prototype, "totalLivros", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => livro_entity_1.Livro, (livro) => livro.testamento),
    __metadata("design:type", Array)
], Testamento.prototype, "livros", void 0);
exports.Testamento = Testamento = __decorate([
    (0, typeorm_1.Entity)('testamentos')
], Testamento);
//# sourceMappingURL=testamento.entity.js.map