import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferenceService } from './application/reference.service';
import { ReferenceController } from './interface/reference.controller';
import { CrossReference } from '../../infrastructure/database/entities/cross-reference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrossReference])],
  controllers: [ReferenceController],
  providers: [ReferenceService],
  exports: [ReferenceService],
})
export class ReferenceModule {}
