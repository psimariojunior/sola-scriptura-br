import { IsString, IsNotEmpty, IsArray, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PerguntaDto {
  @ApiProperty({ example: 'Qual o significado de graça em Romanos?' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  consulta: string;

  @ApiPropertyOptional({ example: 'reformada' })
  @IsOptional()
  @IsString()
  tradicao?: string;
}

export class ExegeseIaDto {
  @ApiProperty({ example: 'uuid-do-versiculo' })
  @IsString()
  @IsNotEmpty()
  versiculoId: string;

  @ApiProperty({ example: 'Texto grego do versículo' })
  @IsString()
  @IsNotEmpty()
  texto: string;
}

export class AnaliseGregoDto {
  @ApiProperty({ example: 'ἀγάπη' })
  @IsString()
  @IsNotEmpty()
  texto: string;
}

export class CompararPassagensDto {
  @ApiProperty({ example: ['João 3:16', 'Romanos 5:8'] })
  @IsArray()
  @IsString({ each: true })
  passagens: string[];
}

export class GrafoDto {
  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  profundidade?: number;
}
