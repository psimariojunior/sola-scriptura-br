import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArqueologiaController } from './presentation/arqueologia.controller';
import { ArqueologiaService } from './application/arqueologia.service';
import { Artefato } from './domain/artefato.entity';
import { Escavacao } from './domain/escavacao.entity';
import { Manuscrito } from './domain/manuscrito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artefato, Escavacao, Manuscrito])],
  controllers: [ArqueologiaController],
  providers: [ArqueologiaService],
  exports: [ArqueologiaService],
})
export class ArqueologiaModule {}
