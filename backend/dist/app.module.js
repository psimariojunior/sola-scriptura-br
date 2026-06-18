"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const event_emitter_1 = require("@nestjs/event-emitter");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const biblia_module_1 = require("./modules/biblia/biblia.module");
const exegese_module_1 = require("./modules/exegese/exegese.module");
const hermeneutica_module_1 = require("./modules/hermeneutica/hermeneutica.module");
const teologia_module_1 = require("./modules/teologia/teologia.module");
const historia_module_1 = require("./modules/historia/historia.module");
const geografia_module_1 = require("./modules/geografia/geografia.module");
const arqueologia_module_1 = require("./modules/arqueologia/arqueologia.module");
const grego_module_1 = require("./modules/grego/grego.module");
const hebraico_module_1 = require("./modules/hebraico/hebraico.module");
const cronologia_module_1 = require("./modules/cronologia/cronologia.module");
const personagens_module_1 = require("./modules/personagens/personagens.module");
const referencias_module_1 = require("./modules/referencias/referencias.module");
const comentarios_module_1 = require("./modules/comentarios/comentarios.module");
const ia_module_1 = require("./modules/ia/ia.module");
const autenticacao_module_1 = require("./modules/autenticacao/autenticacao.module");
const usuario_module_1 = require("./modules/usuario/usuario.module");
const admin_module_1 = require("./modules/admin/admin.module");
const plano_leitura_module_1 = require("./modules/plano-leitura/plano-leitura.module");
const favoritos_module_1 = require("./modules/favoritos/favoritos.module");
const notas_module_1 = require("./modules/notas/notas.module");
const dicionario_module_1 = require("./modules/dicionario/dicionario.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST') || config.get('PGHOST') || 'localhost',
                    port: parseInt(config.get('DB_PORT') || config.get('PGPORT') || '5432'),
                    username: config.get('DB_USER') || config.get('PGUSER') || 'sola_scriptura',
                    password: config.get('DB_PASSWORD') || config.get('PGPASSWORD') || 'sola_scriptura',
                    database: config.get('DB_NAME') || config.get('PGDATABASE') || 'sola_scriptura',
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    ssl: config.get('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
                }),
            }),
            event_emitter_1.EventEmitterModule.forRoot({ wildcard: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            biblia_module_1.BibliaModule,
            exegese_module_1.ExegeseModule,
            hermeneutica_module_1.HermeneuticaModule,
            teologia_module_1.TeologiaModule,
            historia_module_1.HistoriaModule,
            geografia_module_1.GeografiaModule,
            arqueologia_module_1.ArqueologiaModule,
            grego_module_1.GregoModule,
            hebraico_module_1.HebraicoModule,
            cronologia_module_1.CronologiaModule,
            personagens_module_1.PersonagensModule,
            referencias_module_1.ReferenciasModule,
            comentarios_module_1.ComentariosModule,
            ia_module_1.IaModule,
            autenticacao_module_1.AutenticacaoModule,
            usuario_module_1.UsuarioModule,
            admin_module_1.AdminModule,
            plano_leitura_module_1.PlanoLeituraModule,
            favoritos_module_1.FavoritosModule,
            notas_module_1.NotasModule,
            dicionario_module_1.DicionarioModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map