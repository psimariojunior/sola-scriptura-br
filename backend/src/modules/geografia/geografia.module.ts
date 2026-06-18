import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeografiaController } from './presentation/geografia.controller';
import { GeografiaService } from './application/geografia.service';
import { Localizacao } from './domain/localizacao.entity';
import { Rota } from './domain/rota.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localizacao, Rota])],
  controllers: [GeografiaController],
  providers: [GeografiaService],
  exports: [GeografiaService],
})
export class GeografiaModule {}
