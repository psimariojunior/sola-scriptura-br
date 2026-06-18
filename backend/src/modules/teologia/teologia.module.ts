import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeologiaController } from './presentation/teologia.controller';
import { TeologiaService } from './application/teologia.service';
import { Doutrina } from './domain/doutrina.entity';
import { CategoriaDoutrina } from './domain/categoria-doutrina.entity';
import { DoutrinaVersiculo } from './domain/doutrina-versiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doutrina, CategoriaDoutrina, DoutrinaVersiculo])],
  controllers: [TeologiaController],
  providers: [TeologiaService],
  exports: [TeologiaService],
})
export class TeologiaModule {}
