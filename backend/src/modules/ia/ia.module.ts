import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IaController } from './presentation/ia.controller';
import { IaService } from './application/ia.service';
import { RAGService } from '../../infra/ia/rag.service';
import { LLMService } from '../../infra/ia/llm.service';
import { KnowledgeGraphService } from '../../infra/ia/knowledge-graph.service';

import { Versiculo } from '../biblia/domain/versiculo.entity';
import { Livro } from '../biblia/domain/livro.entity';
import { Doutrina } from '../teologia/domain/doutrina.entity';
import { PalavraGrega } from '../grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../hebraico/domain/palavra-hebraica.entity';
import { Personagem } from '../personagens/domain/personagem.entity';
import { ContextoHistorico } from '../historia/domain/contexto-historico.entity';
import { Localizacao } from '../geografia/domain/localizacao.entity';
import { Verbete } from '../dicionario/domain/verbete.entity';
import { ReferenciaCruzada } from '../referencias/domain/referencia-cruzada.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Versiculo,
      Livro,
      Doutrina,
      PalavraGrega,
      PalavraHebraica,
      Personagem,
      ContextoHistorico,
      Localizacao,
      Verbete,
      ReferenciaCruzada,
    ]),
  ],
  controllers: [IaController],
  providers: [IaService, RAGService, LLMService, KnowledgeGraphService],
  exports: [IaService, RAGService, LLMService, KnowledgeGraphService],
})
export class IaModule {}
