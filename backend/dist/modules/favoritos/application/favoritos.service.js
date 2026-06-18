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
var FavoritosService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const favorito_entity_1 = require("../domain/favorito.entity");
let FavoritosService = FavoritosService_1 = class FavoritosService {
    constructor(favoritoRepo) {
        this.favoritoRepo = favoritoRepo;
        this.logger = new common_1.Logger(FavoritosService_1.name);
    }
    async listar(usuarioId) {
        return this.favoritoRepo.find({
            where: { usuarioId },
            order: { ordem: 'ASC' },
        });
    }
    async adicionar(usuarioId, versiculoId, etiquetas, notaPessoal) {
        const favorito = this.favoritoRepo.create({
            usuarioId, versiculoId, etiquetas, notaPessoal,
        });
        return this.favoritoRepo.save(favorito);
    }
    async remover(usuarioId, favoritoId) {
        await this.favoritoRepo.delete({ id: favoritoId, usuarioId });
    }
    async reordenar(usuarioId, favoritoId, novaOrdem) {
        await this.favoritoRepo.update({ id: favoritoId, usuarioId }, { ordem: novaOrdem });
    }
};
exports.FavoritosService = FavoritosService;
exports.FavoritosService = FavoritosService = FavoritosService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(favorito_entity_1.Favorito)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FavoritosService);
//# sourceMappingURL=favoritos.service.js.map