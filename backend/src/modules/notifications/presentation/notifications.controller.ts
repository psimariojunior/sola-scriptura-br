import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NotificationsService } from '../application/notifications.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { UsuarioAtual } from '../../../common/decorators/usuario-atual.decorator';
import {
  SubscribeDto,
  UnsubscribeDto,
  SendDailyVerseDto,
  SendStreakReminderDto,
  SendTestDto,
} from './dto/subscribe.dto';

@ApiTags('Notificações Push')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar subscription push do usuário' })
  async subscribe(
    @UsuarioAtual('id') usuarioId: string,
    @Body() dto: SubscribeDto,
  ) {
    const subscription = await this.notificationsService.salvarSubscription(
      usuarioId,
      dto.endpoint,
      dto.p256dh,
      dto.auth,
      dto.userAgent,
      dto.plataforma,
    );

    return {
      sucesso: true,
      mensagem: 'Subscription registrada com sucesso',
      id: subscription.id,
    };
  }

  @Post('unsubscribe')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover subscription push' })
  async unsubscribe(@Body() dto: UnsubscribeDto) {
    await this.notificationsService.removerSubscription(dto.endpoint);

    return {
      sucesso: true,
      mensagem: 'Subscription removida com sucesso',
    };
  }

  @Post('send-daily-verse')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar versículo do dia via push' })
  async sendDailyVerse(@Body() dto: SendDailyVerseDto) {
    const resultado = await this.notificationsService.enviarVersiculoDiario(dto.usuarioId);

    return {
      sucesso: true,
      mensagem: 'Versículo do dia enviado',
      ...resultado,
    };
  }

  @Post('send-streak-reminder')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar lembrete de streak' })
  async sendStreakReminder(@Body() dto: SendStreakReminderDto) {
    const enviado = await this.notificationsService.enviarLembreteStreak(
      dto.usuarioId,
      dto.streak,
    );

    return {
      sucesso: enviado,
      mensagem: enviado
        ? 'Lembrete de streak enviado'
        : 'Nenhuma subscription encontrada para o usuário',
    };
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enviar notificação de teste' })
  async sendTest(@Body() dto: SendTestDto) {
    const resultado = await this.notificationsService.enviarNotificacaoTeste(dto.endpoint);

    return {
      sucesso: true,
      mensagem: 'Notificação de teste enviada',
      ...resultado,
    };
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter estatísticas de notificações' })
  async getStats() {
    return this.notificationsService.obterEstatisticas();
  }

  @Get('my-subscriptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar subscriptions do usuário atual' })
  async mySubscriptions(@UsuarioAtual('id') usuarioId: string) {
    const subscriptions = await this.notificationsService.listarSubscriptionsPorUsuario(usuarioId);

    return subscriptions.map((sub) => ({
      id: sub.id,
      plataforma: sub.plataforma,
      ativo: sub.ativo,
      criadoEm: sub.criadoEm,
      ultimoPushEnviado: sub.ultimoPushEnviado,
      totalPushesEnviados: sub.totalPushesEnviados,
    }));
  }
}
