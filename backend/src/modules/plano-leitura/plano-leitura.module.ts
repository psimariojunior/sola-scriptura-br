import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanoLeituraController } from './presentation/plano-leitura.controller';
import { PlanoLeituraService } from './application/plano-leitura.service';
import { PlanoLeitura } from './domain/plano-leitura.entity';
import { ProgressoLeitura } from './domain/progresso-leitura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanoLeitura, ProgressoLeitura])],
  controllers: [PlanoLeituraController],
  providers: [PlanoLeituraService],
  exports: [PlanoLeituraService],
})
export class PlanoLeituraModule {}
