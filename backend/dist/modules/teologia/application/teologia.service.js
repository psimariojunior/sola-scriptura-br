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
var TeologiaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeologiaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doutrina_entity_1 = require("../domain/doutrina.entity");
const categoria_doutrina_entity_1 = require("../domain/categoria-doutrina.entity");
let TeologiaService = TeologiaService_1 = class TeologiaService {
    constructor(doutrinaRepo, categoriaRepo) {
        this.doutrinaRepo = doutrinaRepo;
        this.categoriaRepo = categoriaRepo;
        this.logger = new common_1.Logger(TeologiaService_1.name);
    }
    async listarCategorias() {
        return this.categoriaRepo.find({
            order: { ordem: 'ASC' },
            relations: ['doutrinas'],
        });
    }
    async buscarDoutrina(slug) {
        const doutrina = await this.doutrinaRepo.findOne({
            where: { slug },
            relations: ['categoria', 'referencias'],
        });
        if (!doutrina)
            throw new common_1.NotFoundException(`Doutrina ${slug} não encontrada`);
        return doutrina;
    }
    async buscarPorVersiculo(versiculoId) {
        return this.doutrinaRepo.createQueryBuilder('d')
            .innerJoin('d.referencias', 'dv')
            .where('dv.versiculoId = :versiculoId', { versiculoId })
            .orderBy('dv.peso', 'DESC')
            .getMany();
    }
    async relacionarTexto(versiculoId) {
        const doutrinas = await this.buscarPorVersiculo(versiculoId);
        const categorias = await this.listarCategorias();
        const mapa = {};
        for (const cat of categorias) {
            mapa[cat.slug] = { categoria: cat, doutrinas: [] };
        }
        for (const doutrina of doutrinas) {
            const slug = doutrina.categoria?.slug || 'outros';
            if (!mapa[slug])
                mapa[slug] = { categoria: null, doutrinas: [] };
            mapa[slug].doutrinas.push(doutrina);
        }
        return mapa;
    }
};
exports.TeologiaService = TeologiaService;
exports.TeologiaService = TeologiaService = TeologiaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doutrina_entity_1.Doutrina)),
    __param(1, (0, typeorm_1.InjectRepository)(categoria_doutrina_entity_1.CategoriaDoutrina)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeologiaService);
//# sourceMappingURL=teologia.service.js.map