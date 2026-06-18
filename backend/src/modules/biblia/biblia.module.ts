import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibliaController } from './presentation/biblia.controller';
import { BibliaService } from './application/biblia.service';
import { Livro } from './domain/livro.entity';
import { Capitulo } from './domain/capitulo.entity';
import { Versiculo } from './domain/versiculo.entity';
import { Palavra } from './domain/palavra.entity';
import { Traducao } from './domain/traducao.entity';
import { Testamento } from './domain/testamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livro, Capitulo, Versiculo, Palavra, Traducao, Testamento]),
  ],
  controllers: [BibliaController],
  providers: [BibliaService],
  exports: [BibliaService],
})
export class BibliaModule {}
