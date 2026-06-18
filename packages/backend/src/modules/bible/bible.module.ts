import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleService } from './application/bible.service';
import { BibleController } from './interface/bible.controller';
import { BibleRepository } from './infrastructure/bible.repository';
import { BibleVersion } from '../../infrastructure/database/entities/bible-version.entity';
import { BibleBook } from '../../infrastructure/database/entities/bible-book.entity';
import { BibleChapter } from '../../infrastructure/database/entities/bible-chapter.entity';
import { BibleVerse } from '../../infrastructure/database/entities/bible-verse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BibleVersion, BibleBook, BibleChapter, BibleVerse]),
  ],
  controllers: [BibleController],
  providers: [BibleService, BibleRepository],
  exports: [BibleService, BibleRepository],
})
export class BibleModule {}
