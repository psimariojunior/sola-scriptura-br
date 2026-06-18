import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoriaController } from './presentation/historia.controller';
import { HistoriaService } from './application/historia.service';
import { ContextoHistorico } from './domain/contexto-historico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContextoHistorico])],
  controllers: [HistoriaController],
  providers: [HistoriaService],
  exports: [HistoriaService],
})
export class HistoriaModule {}
