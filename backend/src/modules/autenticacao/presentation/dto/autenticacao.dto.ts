import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CadastroDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MinhaSenh@123' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  senha: string;
}

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MinhaSenh@123' })
  @IsString()
  @MinLength(1)
  senha: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
