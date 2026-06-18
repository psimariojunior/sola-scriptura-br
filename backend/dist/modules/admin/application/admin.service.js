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
var AdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("../../usuario/application/usuario.service");
let AdminService = AdminService_1 = class AdminService {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
        this.logger = new common_1.Logger(AdminService_1.name);
    }
    async dashboard() {
        const usuarios = await this.usuarioService.listarUsuarios(1, 5);
        return {
            totalUsuarios: usuarios.total,
            usuariosRecentes: usuarios.usuarios,
            metricas: {
                usuariosAtivos: usuarios.total,
                planosGratuitos: 0,
                planosPremium: 0,
                totalEstudos: 0,
            },
            versao: '1.0.0',
            uptime: process.uptime(),
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = AdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], AdminService);
//# sourceMappingURL=admin.service.js.map