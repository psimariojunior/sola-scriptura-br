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
var GregoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GregoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const palavra_grega_entity_1 = require("../domain/palavra-grega.entity");
let GregoService = GregoService_1 = class GregoService {
    constructor(palavraRepo) {
        this.palavraRepo = palavraRepo;
        this.logger = new common_1.Logger(GregoService_1.name);
    }
    async buscarPorStrong(strong) {
        const palavra = await this.palavraRepo.findOne({ where: { strong } });
        if (!palavra)
            throw new common_1.NotFoundException(`Strong ${strong} não encontrado`);
        return palavra;
    }
    async buscarPorLemma(lemma) {
        return this.palavraRepo.find({ where: { lemma }, take: 20 });
    }
    async buscarPorTransliteracao(texto) {
        return this.palavraRepo.createQueryBuilder('pg')
            .where('pg.transliteracao ILIKE :texto', { texto: `%${texto}%` })
            .orWhere('pg.palavraOriginal ILIKE :texto', { texto: `%${texto}%` })
            .take(20)
            .getMany();
    }
    async listarOcorrencias(strong) {
        const palavra = await this.buscarPorStrong(strong);
        const ocorrencias = palavra.ocorrencias ? JSON.parse(palavra.ocorrencias) : [];
        return { palavra, ocorrencias, total: ocorrencias.length };
    }
    async buscarFrequentes(limite = 100) {
        return this.palavraRepo.find({
            order: { frequenciaNT: 'DESC' },
            take: limite,
        });
    }
    async buscarSimilares(strong) {
        const palavra = await this.buscarPorStrong(strong);
        return this.palavraRepo.createQueryBuilder('pg')
            .where('pg.lemma = :lemma', { lemma: palavra.lemma })
            .andWhere('pg.strong != :strong', { strong })
            .getMany();
    }
};
exports.GregoService = GregoService;
exports.GregoService = GregoService = GregoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(palavra_grega_entity_1.PalavraGrega)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GregoService);
//# sourceMappingURL=grego.service.js.map