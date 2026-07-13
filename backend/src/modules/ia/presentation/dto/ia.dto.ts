import { IsString, IsNotEmpty, IsArray, IsOptional, MinLength, IsEnum, IsNumber, Min, Max } from 'class-validator';
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

export class PerguntaStreamDto {
  @ApiProperty({ example: 'Qual o significado de graça em Romanos?' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  pergunta: string;

  @ApiPropertyOptional({ example: 'reformada' })
  @IsOptional()
  @IsString()
  tradicao?: string;

  @ApiPropertyOptional({ example: 'Contexto adicional sobre a pergunta' })
  @IsOptional()
  @IsString()
  contexto?: string;
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

export enum TipoEntidadeEmbedding {
  VERSICULO = 'versiculo',
  DOCTRINA = 'doutrina',
  PERSONAGEM = 'personagem',
  GREGO = 'grego',
  HEBRAICO = 'hebraico',
  HISTORIA = 'historia',
  GEOGRAFIA = 'geografia',
  DICIONARIO = 'dicionario',
}

export class GerarEmbeddingsDto {
  @ApiProperty({ enum: TipoEntidadeEmbedding, example: TipoEntidadeEmbedding.VERSICULO })
  @IsEnum(TipoEntidadeEmbedding)
  tipo: TipoEntidadeEmbedding;

  @ApiPropertyOptional({ example: [1, 2, 3], description: 'IDs específicos. Vazio = processar todos' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  ids?: number[];
}

export class EmbeddingTextoDto {
  @ApiProperty({ example: 'Texto para gerar embedding' })
  @IsString()
  @IsNotEmpty()
  texto: string;
}

export class EmbeddingsStatusDto {
  @ApiProperty()
  status: Record<string, {
    total: number;
    comEmbedding: number;
    percentual: number;
  }>;
}
