import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonagensController } from './presentation/personagens.controller';
import { PersonagensService } from './application/personagens.service';
import { Personagem } from './domain/personagem.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Personagem])],
  controllers: [PersonagensController],
  providers: [PersonagensService],
  exports: [PersonagensService],
})
export class PersonagensModule {}
