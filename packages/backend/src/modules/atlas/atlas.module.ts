import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtlasService } from './application/atlas.service';
import { AtlasController } from './interface/atlas.controller';
import { BibleLocation } from '../../infrastructure/database/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BibleLocation])],
  controllers: [AtlasController],
  providers: [AtlasService],
  exports: [AtlasService],
})
export class AtlasModule {}
