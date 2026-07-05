import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './application/person.service';
import { PersonController } from './interface/person.controller';
import { BiblePerson } from '../../infrastructure/database/entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiblePerson])],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
