import { Module } from '@nestjs/common';
import { HermeneuticsService } from './application/hermeneutics.service';
import { HermeneuticsController } from './interface/hermeneutics.controller';
import { BibleModule } from '../bible/bible.module';

@Module({
  imports: [BibleModule],
  controllers: [HermeneuticsController],
  providers: [HermeneuticsService],
  exports: [HermeneuticsService],
})
export class HermeneuticsModule {}
