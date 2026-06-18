import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExegeseController } from './presentation/exegese.controller';
import { ExegeseService } from './application/exegese.service';
import { AnaliseExegetica } from './domain/analise-exegetica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnaliseExegetica])],
  controllers: [ExegeseController],
  providers: [ExegeseService],
  exports: [ExegeseService],
})
export class ExegeseModule {}
