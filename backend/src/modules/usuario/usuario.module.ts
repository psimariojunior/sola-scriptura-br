import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './presentation/usuario.controller';
import { UsuarioService } from './application/usuario.service';
import { Usuario } from './domain/usuario.entity';
import { PreferenciaUsuario } from './domain/preferencia-usuario.entity';
import { PerfilUsuario } from './domain/perfil-usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, PreferenciaUsuario, PerfilUsuario])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
