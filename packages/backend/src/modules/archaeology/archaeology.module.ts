import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchaeologyService } from './application/archaeology.service';
import { ArchaeologyController } from './interface/archaeology.controller';
import { ArchaeologicalFind } from '../../infrastructure/database/entities/archaeology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArchaeologicalFind])],
  controllers: [ArchaeologyController],
  providers: [ArchaeologyService],
  exports: [ArchaeologyService],
})
export class ArchaeologyModule {}
