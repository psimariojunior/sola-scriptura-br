"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermeneuticaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hermeneutica_controller_1 = require("./presentation/hermeneutica.controller");
const hermeneutica_service_1 = require("./application/hermeneutica.service");
const analise_hermeneutica_entity_1 = require("./domain/analise-hermeneutica.entity");
let HermeneuticaModule = class HermeneuticaModule {
};
exports.HermeneuticaModule = HermeneuticaModule;
exports.HermeneuticaModule = HermeneuticaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([analise_hermeneutica_entity_1.AnaliseHermeneutica])],
        controllers: [hermeneutica_controller_1.HermeneuticaController],
        providers: [hermeneutica_service_1.HermeneuticaService],
        exports: [hermeneutica_service_1.HermeneuticaService],
    })
], HermeneuticaModule);
//# sourceMappingURL=hermeneutica.module.js.map