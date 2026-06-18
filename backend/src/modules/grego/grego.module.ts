import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GregoController } from './presentation/grego.controller';
import { GregoService } from './application/grego.service';
import { PalavraGrega } from './domain/palavra-grega.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PalavraGrega])],
  controllers: [GregoController],
  providers: [GregoService],
  exports: [GregoService],
})
export class GregoModule {}
