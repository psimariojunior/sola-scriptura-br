import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './presentation/admin.controller';
import { AdminService } from './application/admin.service';
import { Usuario } from '../usuario/domain/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
