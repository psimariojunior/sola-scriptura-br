"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GregoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const grego_controller_1 = require("./presentation/grego.controller");
const grego_service_1 = require("./application/grego.service");
const palavra_grega_entity_1 = require("./domain/palavra-grega.entity");
let GregoModule = class GregoModule {
};
exports.GregoModule = GregoModule;
exports.GregoModule = GregoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([palavra_grega_entity_1.PalavraGrega])],
        controllers: [grego_controller_1.GregoController],
        providers: [grego_service_1.GregoService],
        exports: [grego_service_1.GregoService],
    })
], GregoModule);
//# sourceMappingURL=grego.module.js.map