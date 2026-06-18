import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HebraicoController } from './presentation/hebraico.controller';
import { HebraicoService } from './application/hebraico.service';
import { PalavraHebraica } from './domain/palavra-hebraica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PalavraHebraica])],
  controllers: [HebraicoController],
  providers: [HebraicoService],
  exports: [HebraicoService],
})
export class HebraicoModule {}
