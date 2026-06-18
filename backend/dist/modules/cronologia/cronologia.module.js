"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronologiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cronologia_controller_1 = require("./presentation/cronologia.controller");
const cronologia_service_1 = require("./application/cronologia.service");
const evento_historico_entity_1 = require("./domain/evento-historico.entity");
let CronologiaModule = class CronologiaModule {
};
exports.CronologiaModule = CronologiaModule;
exports.CronologiaModule = CronologiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([evento_historico_entity_1.EventoHistorico])],
        controllers: [cronologia_controller_1.CronologiaController],
        providers: [cronologia_service_1.CronologiaService],
        exports: [cronologia_service_1.CronologiaService],
    })
], CronologiaModule);
//# sourceMappingURL=cronologia.module.js.map