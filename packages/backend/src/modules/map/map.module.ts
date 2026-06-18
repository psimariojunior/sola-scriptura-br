import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapService } from './application/map.service';
import { MapController } from './interface/map.controller';
import { BibleLocation } from '../../infrastructure/database/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BibleLocation])],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
