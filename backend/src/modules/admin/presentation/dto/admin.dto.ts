import { IsOptional, IsString, IsBoolean, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class AtualizarUsuarioAdminDto {
  @ApiPropertyOptional({ enum: ['user', 'admin'] })
  @IsOptional()
  @IsString()
  @IsIn(['user', 'admin'])
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @ApiPropertyOptional({ enum: ['free', 'premium'] })
  @IsOptional()
  @IsString()
  @IsIn(['free', 'premium'])
  plano?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nome?: string;
}

export class ListarUsuariosAdminDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  pagina?: number;

  @ApiPropertyOptional({ default: 20 })
  @IsOptional()
  limite?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  busca?: string;

  @ApiPropertyOptional({ enum: ['user', 'admin'] })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsIn(['true', 'false'])
  ativo?: string;

  @ApiPropertyOptional({ enum: ['free', 'premium'] })
  @IsOptional()
  @IsString()
  plano?: string;
}
