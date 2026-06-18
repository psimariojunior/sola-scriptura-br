"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeologiaModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teologia_controller_1 = require("./presentation/teologia.controller");
const teologia_service_1 = require("./application/teologia.service");
const doutrina_entity_1 = require("./domain/doutrina.entity");
const categoria_doutrina_entity_1 = require("./domain/categoria-doutrina.entity");
const doutrina_versiculo_entity_1 = require("./domain/doutrina-versiculo.entity");
let TeologiaModule = class TeologiaModule {
};
exports.TeologiaModule = TeologiaModule;
exports.TeologiaModule = TeologiaModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([doutrina_entity_1.Doutrina, categoria_doutrina_entity_1.CategoriaDoutrina, doutrina_versiculo_entity_1.DoutrinaVersiculo])],
        controllers: [teologia_controller_1.TeologiaController],
        providers: [teologia_service_1.TeologiaService],
        exports: [teologia_service_1.TeologiaService],
    })
], TeologiaModule);
//# sourceMappingURL=teologia.module.js.map