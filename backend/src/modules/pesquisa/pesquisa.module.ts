import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PesquisaController } from './presentation/pesquisa.controller';
import { PesquisaService } from './application/pesquisa.service';
import { PesquisaIndexService } from './application/pesquisa-index.service';
import { PesquisaHistorico } from './domain/pesquisa-historico.entity';
import { PesquisaSugestao } from './domain/pesquisa-sugestao.entity';

import { Livro } from '../biblia/domain/livro.entity';
import { Versiculo } from '../biblia/domain/versiculo.entity';
import { Personagem } from '../personagens/domain/personagem.entity';
import { Doutrina } from '../teologia/domain/doutrina.entity';
import { ContextoHistorico } from '../historia/domain/contexto-historico.entity';
import { Localizacao } from '../geografia/domain/localizacao.entity';
import { PalavraGrega } from '../grego/domain/palavra-grega.entity';
import { PalavraHebraica } from '../hebraico/domain/palavra-hebraica.entity';
import { Verbete } from '../dicionario/domain/verbete.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PesquisaHistorico,
      PesquisaSugestao,
      Livro,
      Versiculo,
      Personagem,
      Doutrina,
      ContextoHistorico,
      Localizacao,
      PalavraGrega,
      PalavraHebraica,
      Verbete,
    ]),
  ],
  controllers: [PesquisaController],
  providers: [PesquisaService, PesquisaIndexService],
  exports: [PesquisaService, PesquisaIndexService],
})
export class PesquisaModule {}
