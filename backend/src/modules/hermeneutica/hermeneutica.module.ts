import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HermeneuticaController } from './presentation/hermeneutica.controller';
import { HermeneuticaService } from './application/hermeneutica.service';
import { AnaliseHermeneutica } from './domain/analise-hermeneutica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnaliseHermeneutica])],
  controllers: [HermeneuticaController],
  providers: [HermeneuticaService],
  exports: [HermeneuticaService],
})
export class HermeneuticaModule {}
