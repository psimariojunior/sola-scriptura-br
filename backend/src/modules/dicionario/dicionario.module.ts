import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DicionarioController } from './presentation/dicionario.controller';
import { DicionarioService } from './application/dicionario.service';
import { Verbete } from './domain/verbete.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verbete])],
  controllers: [DicionarioController],
  providers: [DicionarioService],
  exports: [DicionarioService],
})
export class DicionarioModule {}
