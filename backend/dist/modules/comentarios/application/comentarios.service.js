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
var ComentariosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comentario_entity_1 = require("../domain/comentario.entity");
let ComentariosService = ComentariosService_1 = class ComentariosService {
    constructor(comentarioRepo) {
        this.comentarioRepo = comentarioRepo;
        this.logger = new common_1.Logger(ComentariosService_1.name);
    }
    async buscarPorReferencia(livroId, capitulo, versiculo) {
        const query = this.comentarioRepo.createQueryBuilder('c')
            .where('c.livroId = :livroId', { livroId })
            .andWhere('c.capitulo = :capitulo', { capitulo });
        if (versiculo) {
            query.andWhere('(c.versiculoInicio <= :versiculo AND c.versiculoFim >= :versiculo)', { versiculo });
        }
        return query.orderBy('c.autor', 'ASC').getMany();
    }
    async buscarPorAutor(autor) {
        return this.comentarioRepo.find({ where: { autor }, take: 50 });
    }
    async listarAutores() {
        const resultado = await this.comentarioRepo
            .createQueryBuilder('c')
            .select('DISTINCT c.autor')
            .orderBy('c.autor')
            .getRawMany();
        return resultado.map((r) => r.autor);
    }
};
exports.ComentariosService = ComentariosService;
exports.ComentariosService = ComentariosService = ComentariosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comentario_entity_1.Comentario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ComentariosService);
//# sourceMappingURL=comentarios.service.js.map