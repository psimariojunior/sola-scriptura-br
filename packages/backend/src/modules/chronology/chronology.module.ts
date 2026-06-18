import { Module } from '@nestjs/common';
import { ChronologyService } from './application/chronology.service';
import { ChronologyController } from './interface/chronology.controller';

@Module({
  controllers: [ChronologyController],
  providers: [ChronologyService],
  exports: [ChronologyService],
})
export class ChronologyModule {}
