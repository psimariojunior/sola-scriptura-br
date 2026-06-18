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
var DicionarioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DicionarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const verbete_entity_1 = require("../domain/verbete.entity");
let DicionarioService = DicionarioService_1 = class DicionarioService {
    constructor(verbeteRepo) {
        this.verbeteRepo = verbeteRepo;
        this.logger = new common_1.Logger(DicionarioService_1.name);
    }
    async buscarPorSlug(slug) {
        const verbete = await this.verbeteRepo.findOne({ where: { slug } });
        if (!verbete)
            throw new common_1.NotFoundException(`Verbete ${slug} não encontrado`);
        return verbete;
    }
    async pesquisar(consulta) {
        return this.verbeteRepo.find({
            where: [
                { titulo: (0, typeorm_2.ILike)(`%${consulta}%`) },
                { definicao: (0, typeorm_2.ILike)(`%${consulta}%`) },
            ],
            take: 20,
        });
    }
    async listarPorCategoria(categoria) {
        return this.verbeteRepo.find({ where: { categoria }, order: { titulo: 'ASC' } });
    }
};
exports.DicionarioService = DicionarioService;
exports.DicionarioService = DicionarioService = DicionarioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(verbete_entity_1.Verbete)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DicionarioService);
//# sourceMappingURL=dicionario.service.js.map