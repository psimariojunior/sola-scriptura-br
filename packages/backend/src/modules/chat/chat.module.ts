import { Module } from '@nestjs/common';
import { AiModule } from '../ai/ai.module';
import { ChatService } from './application/chat.service';
import { ChatController } from './interface/chat.controller';
import { RagModule } from '../rag/rag.module';
import { KnowledgeGraphModule } from '../knowledge-graph/knowledge-graph.module';

@Module({
  imports: [AiModule, RagModule, KnowledgeGraphModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
