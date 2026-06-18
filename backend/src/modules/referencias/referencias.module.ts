import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenciasController } from './presentation/referencias.controller';
import { ReferenciasService } from './application/referencias.service';
import { ReferenciaCruzada } from './domain/referencia-cruzada.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferenciaCruzada])],
  controllers: [ReferenciasController],
  providers: [ReferenciasService],
  exports: [ReferenciasService],
})
export class ReferenciasModule {}
