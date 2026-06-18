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
var UsuarioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../domain/usuario.entity");
const preferencia_usuario_entity_1 = require("../domain/preferencia-usuario.entity");
const perfil_usuario_entity_1 = require("../domain/perfil-usuario.entity");
let UsuarioService = UsuarioService_1 = class UsuarioService {
    constructor(usuarioRepo, preferenciaRepo, perfilRepo) {
        this.usuarioRepo = usuarioRepo;
        this.preferenciaRepo = preferenciaRepo;
        this.perfilRepo = perfilRepo;
        this.logger = new common_1.Logger(UsuarioService_1.name);
    }
    async buscarPerfil(usuarioId) {
        const usuario = await this.usuarioRepo.findOne({
            where: { id: usuarioId },
            relations: ['perfil', 'preferencias'],
        });
        if (!usuario)
            throw new common_1.NotFoundException('Usuário não encontrado');
        return usuario;
    }
    async atualizarPerfil(usuarioId, dados) {
        let perfil = await this.perfilRepo.findOne({ where: { usuarioId } });
        if (!perfil) {
            perfil = this.perfilRepo.create({ usuarioId, ...dados });
        }
        else {
            Object.assign(perfil, dados);
        }
        return this.perfilRepo.save(perfil);
    }
    async atualizarPreferencias(usuarioId, dados) {
        let preferencias = await this.preferenciaRepo.findOne({ where: { usuarioId } });
        if (!preferencias) {
            preferencias = this.preferenciaRepo.create({ usuarioId, ...dados });
        }
        else {
            Object.assign(preferencias, dados);
        }
        return this.preferenciaRepo.save(preferencias);
    }
    async listarUsuarios(pagina = 1, limite = 20) {
        const [usuarios, total] = await this.usuarioRepo.findAndCount({
            skip: (pagina - 1) * limite,
            take: limite,
            order: { criadoEm: 'DESC' },
        });
        return { usuarios, total, pagina, limite };
    }
};
exports.UsuarioService = UsuarioService;
exports.UsuarioService = UsuarioService = UsuarioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(preferencia_usuario_entity_1.PreferenciaUsuario)),
    __param(2, (0, typeorm_1.InjectRepository)(perfil_usuario_entity_1.PerfilUsuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioService);
//# sourceMappingURL=usuario.service.js.map