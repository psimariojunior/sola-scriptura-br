import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty({ description: 'Endpoint do push subscription' })
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty({ description: 'Chave pública P256DH do subscription' })
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @ApiProperty({ description: 'Chave de autenticação do subscription' })
  @IsString()
  @IsNotEmpty()
  auth: string;

  @ApiPropertyOptional({ description: 'User agent do dispositivo' })
  @IsOptional()
  @IsString()
  userAgent?: string;

  @ApiPropertyOptional({ description: 'Plataforma do dispositivo' })
  @IsOptional()
  @IsString()
  plataforma?: string;
}

export class UnsubscribeDto {
  @ApiProperty({ description: 'Endpoint do push subscription para remover' })
  @IsString()
  @IsNotEmpty()
  endpoint: string;
}

export class SendDailyVerseDto {
  @ApiPropertyOptional({ description: 'ID do usuário específico (opcional, envia para todos se vazio)' })
  @IsOptional()
  @IsString()
  usuarioId?: string;
}

export class SendStreakReminderDto {
  @ApiProperty({ description: 'ID do usuário para enviar lembrete' })
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @ApiProperty({ description: 'Sequência atual do usuário' })
  @IsNotEmpty()
  streak: number;
}

export class SendTestDto {
  @ApiProperty({ description: 'Endpoint do subscription para enviar teste' })
  @IsOptional()
  @IsString()
  endpoint?: string;
}
