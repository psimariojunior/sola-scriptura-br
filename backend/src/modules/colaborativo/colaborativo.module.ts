import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyRoom } from './entities/study-room.entity';
import { ColaborativoGateway } from './colaborativo.gateway';
import { ColaborativoService } from './colaborativo.service';
import { ColaborativoController } from './colaborativo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudyRoom])],
  controllers: [ColaborativoController],
  providers: [ColaborativoGateway, ColaborativoService],
  exports: [ColaborativoGateway, ColaborativoService],
})
export class ColaborativoModule {}
