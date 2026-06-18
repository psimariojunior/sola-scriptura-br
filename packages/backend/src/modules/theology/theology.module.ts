import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheologyService } from './application/theology.service';
import { TheologyController } from './interface/theology.controller';
import { Doctrine } from '../../infrastructure/database/entities/doctrine.entity';
import { BibleModule } from '../bible/bible.module';
import { ReferenceModule } from '../reference/reference.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctrine]), BibleModule, ReferenceModule],
  controllers: [TheologyController],
  providers: [TheologyService],
  exports: [TheologyService],
})
export class TheologyModule {}
