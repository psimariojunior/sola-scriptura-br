import { Module } from '@nestjs/common';
import { RagModule } from '../rag/rag.module';
import { KnowledgeGraphModule } from '../knowledge-graph/knowledge-graph.module';
import { BibleModule } from '../bible/bible.module';
import { AiService } from './application/ai.service';

@Module({
  imports: [RagModule, KnowledgeGraphModule, BibleModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
