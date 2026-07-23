import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataController } from './user-data.controller';
import { UserDataService } from './user-data.service';
import { UserFavorite } from './entities/user-favorite.entity';
import { UserNote } from './entities/user-note.entity';
import { UserCollection } from './entities/user-collection.entity';
import { UserProgress } from './entities/user-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavorite, UserNote, UserCollection, UserProgress])],
  controllers: [UserDataController],
  providers: [UserDataService],
  exports: [UserDataService],
})
export class UserDataModule {}
