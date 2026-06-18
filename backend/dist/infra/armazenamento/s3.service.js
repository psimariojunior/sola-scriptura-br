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
var S3Service_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = S3Service_1 = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(S3Service_1.name);
        this.client = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION', 'us-east-1'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', ''),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', ''),
            },
        });
        this.bucket = this.configService.get('AWS_S3_BUCKET', 'sola-scriptura');
    }
    async upload(caminho, arquivo, tipoMime) {
        const comando = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: caminho,
            Body: arquivo,
            ContentType: tipoMime,
        });
        await this.client.send(comando);
        return `https://${this.bucket}.s3.amazonaws.com/${caminho}`;
    }
    async getUrl(caminho, expiracao = 3600) {
        const comando = new client_s3_1.GetObjectCommand({ Bucket: this.bucket, Key: caminho });
        return (0, s3_request_presigner_1.getSignedUrl)(this.client, comando, { expiresIn: expiracao });
    }
    async remover(caminho) {
        const comando = new client_s3_1.DeleteObjectCommand({ Bucket: this.bucket, Key: caminho });
        await this.client.send(comando);
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], S3Service);
//# sourceMappingURL=s3.service.js.map