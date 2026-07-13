import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ItemPesquisaDto {
  @ApiProperty({ example: 'versiculo' })
  tipo: string;

  @ApiProperty({ example: 'Romanos 8:28' })
  titulo: string;

  @ApiPropertyOptional({ example: 'Paulo - Carta aos Romanos' })
  subtitulo?: string;

  @ApiPropertyOptional({ example: 'Rm 8:28' })
  referencia?: string;

  @ApiProperty({ example: 'E sabemos que todas as coisas contribuem juntamente para o bem...' })
  trecho: string;

  @ApiProperty({ example: 0.95 })
  relevancia: number;

  @ApiPropertyOptional()
  metadata?: Record<string, any>;
}

export class PesquisaResultadoDto {
  @ApiProperty({ type: [ItemPesquisaDto] })
  resultados: ItemPesquisaDto[];

  @ApiProperty({ example: 142 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;

  @ApiProperty({ example: 342 })
  tempo_ms: number;

  @ApiProperty({ example: ['elasticsearch', 'typeorm'] })
  fontes: string[];
}

export class SugestaoDto {
  @ApiProperty({ example: 'graça de Deus' })
  termo: string;

  @ApiProperty({ example: 150 })
  peso: number;

  @ApiProperty({ example: 'tema' })
  categoria: string;
}

export class AutocompleteResultadoDto {
  @ApiProperty({ type: [SugestaoDto] })
  sugestoes: SugestaoDto[];
}
