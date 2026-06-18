"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const notas_controller_1 = require("./presentation/notas.controller");
const notas_service_1 = require("./application/notas.service");
const nota_entity_1 = require("./domain/nota.entity");
let NotasModule = class NotasModule {
};
exports.NotasModule = NotasModule;
exports.NotasModule = NotasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([nota_entity_1.Nota])],
        controllers: [notas_controller_1.NotasController],
        providers: [notas_service_1.NotasService],
        exports: [notas_service_1.NotasService],
    })
], NotasModule);
//# sourceMappingURL=notas.module.js.map