import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronologiaController } from './presentation/cronologia.controller';
import { CronologiaService } from './application/cronologia.service';
import { EventoHistorico } from './domain/evento-historico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventoHistorico])],
  controllers: [CronologiaController],
  providers: [CronologiaService],
  exports: [CronologiaService],
})
export class CronologiaModule {}
