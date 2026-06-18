import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatService } from '../application/chat.service';

@ApiTags('Chat IA')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('enviar')
  @ApiOperation({ summary: 'Enviar mensagem para o chat IA' })
  async enviarMensagem(
    @Body('sessaoId') sessaoId: string,
    @Body('mensagem') mensagem: string,
    @Body('tradicao') tradicao?: string,
  ) {
    return this.chatService.enviarMensagem(sessaoId, mensagem, tradicao);
  }

  @Get('historico/:sessaoId')
  @ApiOperation({ summary: 'Obter histórico da sessão' })
  async historico(@Param('sessaoId') sessaoId: string) {
    return this.chatService.historico(sessaoId);
  }

  @Post('nova-sessao')
  @ApiOperation({ summary: 'Criar nova sessão de chat' })
  async novaSessao() {
    const id = await this.chatService.novaSessao();
    return { sessaoId: id };
  }
}
