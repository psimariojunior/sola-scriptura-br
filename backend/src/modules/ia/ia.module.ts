import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IaController } from './presentation/ia.controller';
import { IaService } from './application/ia.service';
import { RAGService } from '../../infra/ia/rag.service';
import { LLMService } from '../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../infra/ia/knowledge-graph.service';

@Module({
  imports: [],
  controllers: [IaController],
  providers: [IaService, RAGService, LLMService, KnowledgeGraphService],
  exports: [IaService, RAGService, LLMService, KnowledgeGraphService],
})
export class IaModule {}
