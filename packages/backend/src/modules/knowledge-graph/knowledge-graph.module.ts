import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnowledgeGraphService } from './application/knowledge-graph.service';
import { KnowledgeGraphController } from './interface/knowledge-graph.controller';
import { KnowledgeGraphEntity, KnowledgeGraphRelationship } from '../../infrastructure/database/entities/knowledge-graph.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KnowledgeGraphEntity, KnowledgeGraphRelationship])],
  controllers: [KnowledgeGraphController],
  providers: [KnowledgeGraphService],
  exports: [KnowledgeGraphService],
})
export class KnowledgeGraphModule {}
