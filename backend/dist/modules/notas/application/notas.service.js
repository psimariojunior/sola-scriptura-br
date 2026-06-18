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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NotasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nota_entity_1 = require("../domain/nota.entity");
let NotasService = NotasService_1 = class NotasService {
    constructor(notaRepo) {
        this.notaRepo = notaRepo;
        this.logger = new common_1.Logger(NotasService_1.name);
    }
    async listar(usuarioId, versiculoId) {
        const where = { usuarioId };
        if (versiculoId)
            where.versiculoId = versiculoId;
        return this.notaRepo.find({ where, order: { criadoEm: 'DESC' } });
    }
    async criar(usuarioId, dados) {
        const nota = this.notaRepo.create({ usuarioId, ...dados });
        return this.notaRepo.save(nota);
    }
    async atualizar(notaId, usuarioId, dados) {
        await this.notaRepo.update({ id: notaId, usuarioId }, dados);
        return (await this.notaRepo.findOne({ where: { id: notaId } }));
    }
    async remover(notaId, usuarioId) {
        await this.notaRepo.delete({ id: notaId, usuarioId });
    }
};
exports.NotasService = NotasService;
exports.NotasService = NotasService = NotasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nota_entity_1.Nota)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotasService);
//# sourceMappingURL=notas.service.js.map