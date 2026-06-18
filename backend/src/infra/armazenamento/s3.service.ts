import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private client: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get('AWS_REGION', 'us-east-1'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY', ''),
      },
    });
    this.bucket = this.configService.get('AWS_S3_BUCKET', 'sola-scriptura');
  }

  async upload(caminho: string, arquivo: Buffer, tipoMime: string): Promise<string> {
    const comando = new PutObjectCommand({
      Bucket: this.bucket,
      Key: caminho,
      Body: arquivo,
      ContentType: tipoMime,
    });
    await this.client.send(comando);
    return `https://${this.bucket}.s3.amazonaws.com/${caminho}`;
  }

  async getUrl(caminho: string, expiracao = 3600): Promise<string> {
    const comando = new GetObjectCommand({ Bucket: this.bucket, Key: caminho });
    return getSignedUrl(this.client, comando, { expiresIn: expiracao });
  }

  async remover(caminho: string): Promise<void> {
    const comando = new DeleteObjectCommand({ Bucket: this.bucket, Key: caminho });
    await this.client.send(comando);
  }
}
