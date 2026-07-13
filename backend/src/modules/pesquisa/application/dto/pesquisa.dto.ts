import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min, Max, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum TipoPesquisa {
  ALL = 'all',
  VERSICULOS = 'versiculos',
  PERSONAGENS = 'personagens',
  DOCTRINAS = 'doutrinas',
  HISTORIA = 'historia',
  GEOGRAFIA = 'geografia',
  GREGO = 'grego',
  HEBRAICO = 'hebraico',
  DICIONARIO = 'dicionario',
}

export class PesquisaGeralDto {
  @ApiProperty({ example: 'graça', description: 'Termo de busca' })
  @IsString()
  @IsNotEmpty()
  q: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ enum: TipoPesquisa, default: TipoPesquisa.ALL })
  @IsOptional()
  @IsEnum(TipoPesquisa)
  tipo?: TipoPesquisa = TipoPesquisa.ALL;
}

export class PesquisaAvancadaDto extends PesquisaGeralDto {
  @ApiPropertyOptional({ example: 'romanos', description: 'Nome ou slug do livro' })
  @IsOptional()
  @IsString()
  livro?: string;

  @ApiPropertyOptional({ example: 'nt', description: 'AT ou NT' })
  @IsOptional()
  @IsString()
  testamento?: string;

  @ApiPropertyOptional({ example: 'Paulo' })
  @IsOptional()
  @IsString()
  autor?: string;

  @ApiPropertyOptional({ example: 'primeiro seculo' })
  @IsOptional()
  @IsString()
  periodo?: string;

  @ApiPropertyOptional({ example: 'soteriologia' })
  @IsOptional()
  @IsString()
  categoria?: string;

  @ApiPropertyOptional({ example: 'nvi', description: 'Sigla da tradução' })
  @IsOptional()
  @IsString()
  traducao?: string;

  @ApiPropertyOptional({ description: 'Data inicial (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({ description: 'Data final (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  dataFim?: string;
}

export class AutocompleteDto {
  @ApiProperty({ example: 'gra', description: 'Início do termo para autocomplete' })
  @IsString()
  @IsNotEmpty()
  q: string;

  @ApiPropertyOptional({ default: 8, maximum: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(10)
  limite?: number = 8;
}
