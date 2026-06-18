"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacaoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const autenticacao_controller_1 = require("./presentation/autenticacao.controller");
const autenticacao_service_1 = require("./application/autenticacao.service");
const usuario_entity_1 = require("../usuario/domain/usuario.entity");
const refresh_token_entity_1 = require("./domain/refresh-token.entity");
let AutenticacaoModule = class AutenticacaoModule {
};
exports.AutenticacaoModule = AutenticacaoModule;
exports.AutenticacaoModule = AutenticacaoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, refresh_token_entity_1.RefreshToken]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET', 'super-secret-key'),
                    signOptions: {
                        expiresIn: config.get('JWT_EXPIRATION', '15m'),
                    },
                }),
            }),
        ],
        controllers: [autenticacao_controller_1.AutenticacaoController],
        providers: [autenticacao_service_1.AutenticacaoService],
        exports: [autenticacao_service_1.AutenticacaoService],
    })
], AutenticacaoModule);
//# sourceMappingURL=autenticacao.module.js.map