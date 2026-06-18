"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AutenticacaoService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
const usuario_entity_1 = require("../../usuario/domain/usuario.entity");
const refresh_token_entity_1 = require("../domain/refresh-token.entity");
let AutenticacaoService = AutenticacaoService_1 = class AutenticacaoService {
    constructor(usuarioRepo, refreshRepo, jwtService, configService) {
        this.usuarioRepo = usuarioRepo;
        this.refreshRepo = refreshRepo;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AutenticacaoService_1.name);
    }
    async cadastrar(dados) {
        const existe = await this.usuarioRepo.findOne({ where: { email: dados.email } });
        if (existe)
            throw new common_1.ConflictException('Email já cadastrado');
        const senhaHash = await bcrypt.hash(dados.senha, 12);
        const usuario = this.usuarioRepo.create({
            nome: dados.nome,
            email: dados.email,
            senhaHash,
        });
        await this.usuarioRepo.save(usuario);
        return this.gerarTokens(usuario);
    }
    async login(email, senha) {
        const usuario = await this.usuarioRepo.findOne({
            where: { email },
            select: ['id', 'nome', 'email', 'senhaHash', 'ativo'],
        });
        if (!usuario)
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        if (!usuario.ativo)
            throw new common_1.UnauthorizedException('Conta desativada');
        const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
        if (!senhaValida)
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        return this.gerarTokens(usuario);
    }
    async refresh(token) {
        const refreshToken = await this.refreshRepo.findOne({
            where: { token, ativo: true },
            relations: ['usuario'],
        });
        if (!refreshToken || refreshToken.expiraEm < new Date()) {
            throw new common_1.UnauthorizedException('Refresh token inválido ou expirado');
        }
        refreshToken.ativo = false;
        await this.refreshRepo.save(refreshToken);
        return this.gerarTokens(refreshToken.usuario);
    }
    async logout(usuarioId) {
        await this.refreshRepo.update({ usuarioId, ativo: true }, { ativo: false });
    }
    async gerarTokens(usuario) {
        const payload = { sub: usuario.id, email: usuario.email };
        const accessToken = this.jwtService.sign(payload);
        const refreshTokenStr = (0, uuid_1.v4)();
        const refreshToken = this.refreshRepo.create({
            token: refreshTokenStr,
            usuarioId: usuario.id,
            expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        await this.refreshRepo.save(refreshToken);
        return {
            accessToken,
            refreshToken: refreshTokenStr,
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
        };
    }
};
exports.AutenticacaoService = AutenticacaoService;
exports.AutenticacaoService = AutenticacaoService = AutenticacaoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], AutenticacaoService);
//# sourceMappingURL=autenticacao.service.js.map