import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeographyService } from './application/geography.service';
import { GeographyController } from './interface/geography.controller';
import { BibleLocation } from '../../infrastructure/database/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BibleLocation])],
  controllers: [GeographyController],
  providers: [GeographyService],
  exports: [GeographyService],
})
export class GeographyModule {}
