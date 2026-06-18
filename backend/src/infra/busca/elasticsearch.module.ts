import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchService } from './elasticsearch.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    ElasticsearchService,
    {
      provide: 'ELASTICSEARCH_CLIENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        node: config.get('ELASTICSEARCH_URL', 'http://localhost:9200'),
        auth: {
          username: config.get('ELASTICSEARCH_USER', 'elastic'),
          password: config.get('ELASTICSEARCH_PASSWORD', ''),
        },
        maxRetries: 5,
        requestTimeout: 60000,
        sniffOnStart: true,
      }),
    },
  ],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
