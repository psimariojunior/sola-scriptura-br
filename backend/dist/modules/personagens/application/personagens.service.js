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
var PersonagensService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonagensService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const personagem_entity_1 = require("../domain/personagem.entity");
let PersonagensService = PersonagensService_1 = class PersonagensService {
    constructor(personagemRepo) {
        this.personagemRepo = personagemRepo;
        this.logger = new common_1.Logger(PersonagensService_1.name);
    }
    async listarPersonagens(limite = 50) {
        return this.personagemRepo.find({ take: limite, order: { nomePortugues: 'ASC' } });
    }
    async buscarPorSlug(slug) {
        const personagem = await this.personagemRepo.findOne({ where: { slug } });
        if (!personagem)
            throw new common_1.NotFoundException(`Personagem ${slug} não encontrado`);
        return personagem;
    }
    async buscarPorNome(consulta) {
        return this.personagemRepo.createQueryBuilder('p')
            .where('p.nomePortugues ILIKE :consulta', { consulta: `%${consulta}%` })
            .orWhere('p.nomeOriginal ILIKE :consulta', { consulta: `%${consulta}%` })
            .take(20)
            .getMany();
    }
};
exports.PersonagensService = PersonagensService;
exports.PersonagensService = PersonagensService = PersonagensService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(personagem_entity_1.Personagem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PersonagensService);
//# sourceMappingURL=personagens.service.js.map