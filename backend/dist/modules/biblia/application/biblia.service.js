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
var BibliaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibliaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const livro_entity_1 = require("../domain/livro.entity");
const capitulo_entity_1 = require("../domain/capitulo.entity");
const versiculo_entity_1 = require("../domain/versiculo.entity");
const palavra_entity_1 = require("../domain/palavra.entity");
const traducao_entity_1 = require("../domain/traducao.entity");
const testamento_entity_1 = require("../domain/testamento.entity");
let BibliaService = BibliaService_1 = class BibliaService {
    constructor(livroRepo, capituloRepo, versiculoRepo, palavraRepo, traducaoRepo, testamentoRepo) {
        this.livroRepo = livroRepo;
        this.capituloRepo = capituloRepo;
        this.versiculoRepo = versiculoRepo;
        this.palavraRepo = palavraRepo;
        this.traducaoRepo = traducaoRepo;
        this.testamentoRepo = testamentoRepo;
        this.logger = new common_1.Logger(BibliaService_1.name);
    }
    async listarTestamentos() {
        return this.testamentoRepo.find({ order: { ordem: 'ASC' }, relations: ['livros'] });
    }
    async listarLivros(testamentoId) {
        const where = testamentoId ? { testamentoId } : {};
        return this.livroRepo.find({ where, order: { ordemGeral: 'ASC' } });
    }
    async buscarPorSlug(slug) {
        const livro = await this.livroRepo.findOne({ where: { slug }, relations: ['capitulos'] });
        if (!livro)
            throw new common_1.NotFoundException(`Livro ${slug} não encontrado`);
        return livro;
    }
    async buscarCapitulo(livroId, numero) {
        const capitulo = await this.capituloRepo.findOne({
            where: { livroId, numero },
            relations: ['versiculos', 'livro'],
        });
        if (!capitulo)
            throw new common_1.NotFoundException(`Capítulo ${numero} não encontrado`);
        return capitulo;
    }
    async buscarVersiculo(livroId, capitulo, versiculo, traducaoId) {
        const where = { livroId, capituloNumero: capitulo, numero: versiculo };
        if (traducaoId)
            where.traducaoId = traducaoId;
        const resultado = await this.versiculoRepo.findOne({
            where,
            relations: ['palavras', 'capitulo', 'capitulo.livro'],
        });
        if (!resultado)
            throw new common_1.NotFoundException(`${capitulo}:${versiculo} não encontrado`);
        return resultado;
    }
    async buscarPassagem(livroId, capitulo, inicio, fim, traducaoId) {
        const where = {
            livroId, capituloNumero: capitulo,
        };
        if (fim) {
            where.numero = (0, typeorm_2.MoreThanOrEqual)(inicio) && (0, typeorm_2.LessThanOrEqual)(fim);
        }
        else {
            where.numero = inicio;
        }
        if (traducaoId)
            where.traducaoId = traducaoId;
        return this.versiculoRepo.find({
            where,
            order: { numero: 'ASC' },
            relations: ['palavras'],
        });
    }
    async listarTraducoes() {
        return this.traducaoRepo.find({ order: { nome: 'ASC' } });
    }
    async pesquisar(consulta, traducaoId, limite = 50) {
        const query = this.versiculoRepo.createQueryBuilder('v')
            .leftJoinAndSelect('v.capitulo', 'c')
            .leftJoinAndSelect('c.livro', 'l')
            .where('v.texto ILIKE :consulta', { consulta: `%${consulta}%` });
        if (traducaoId)
            query.andWhere('v.traducaoId = :traducaoId', { traducaoId });
        return query.take(limite).getMany();
    }
    async buscarPalavraCompleta(palavraId) {
        const palavra = await this.palavraRepo.findOne({
            where: { id: palavraId },
            relations: ['versiculo', 'versiculo.capitulo', 'versiculo.capitulo.livro'],
        });
        if (!palavra)
            throw new common_1.NotFoundException('Palavra não encontrada');
        return palavra;
    }
};
exports.BibliaService = BibliaService;
exports.BibliaService = BibliaService = BibliaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(livro_entity_1.Livro)),
    __param(1, (0, typeorm_1.InjectRepository)(capitulo_entity_1.Capitulo)),
    __param(2, (0, typeorm_1.InjectRepository)(versiculo_entity_1.Versiculo)),
    __param(3, (0, typeorm_1.InjectRepository)(palavra_entity_1.Palavra)),
    __param(4, (0, typeorm_1.InjectRepository)(traducao_entity_1.Traducao)),
    __param(5, (0, typeorm_1.InjectRepository)(testamento_entity_1.Testamento)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BibliaService);
//# sourceMappingURL=biblia.service.js.map