import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');

    if (databaseUrl) {
      return {
        type: 'postgres',
        url: databaseUrl,
        entities: [__dirname + '/../../infrastructure/database/entities/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../infrastructure/database/migrations/*{.ts,.js}'],
        synchronize: true,
        logging: false,
        ssl: { rejectUnauthorized: false },
        extra: {
          application_name: 'bible_scholar_ai',
        },
      };
    }

    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USERNAME', 'scholar'),
      password: this.configService.get<string>('DB_PASSWORD', 'scholar_secret'),
      database: this.configService.get<string>('DB_DATABASE', 'bible_scholar'),
      entities: [__dirname + '/../../infrastructure/database/entities/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../infrastructure/database/migrations/*{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
      logging: process.env.NODE_ENV !== 'production',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      extra: {
        application_name: 'bible_scholar_ai',
      },
    };
  }
}
