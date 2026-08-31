import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ColaborativoService } from './colaborativo.service';

interface RoomParticipant {
  socketId: string;
  participantId: string;
  displayName: string;
}

interface SignalingRoom {
  code: string;
  participants: Map<string, RoomParticipant>;
}

@WebSocketGateway({
  cors: {
    origin: [
      'https://solascripturabr.com.br',
      'https://www.solascripturabr.com.br',
      'https://sola-scriptura-br.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3012',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3012',
    ],
    credentials: true,
    methods: ['GET', 'POST'],
  },
  path: '/socket.io/',
})
export class ColaborativoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ColaborativoGateway');
  private rooms = new Map<string, SignalingRoom>();
  private typingTimers = new Map<string, ReturnType<typeof setTimeout>>();

  constructor(private readonly colaborativoService: ColaborativoService) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('bible-navigation')
  handleBibleNavigation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; livro: string; capitulo: number; traducao: string },
  ) {
    client.to(data.code).emit('bible-navigation', {
      livro: data.livro,
      capitulo: data.capitulo,
      traducao: data.traducao,
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.handleTypingStopBySocket(client);
    this.removeParticipantFromAllRooms(client.id);
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId: string; displayName: string },
  ) {
    const { code, participantId, displayName } = data;
    const MAX_PARTICIPANTS = 20;

    if (!this.rooms.has(code)) {
      this.rooms.set(code, { code, participants: new Map() });
    }

    const room = this.rooms.get(code)!;

    if (room.participants.size >= MAX_PARTICIPANTS) {
      client.emit('room-full', { code, maxParticipants: MAX_PARTICIPANTS });
      this.logger.warn(`${displayName} rejected from room ${code} (full: ${room.participants.size}/${MAX_PARTICIPANTS})`);
      return;
    }

    room.participants.set(client.id, {
      socketId: client.id,
      participantId,
      displayName,
    });

    client.join(code);

    const participantList = Array.from(room.participants.values());

    this.logger.log(`${displayName} joined room ${code} (${participantList.length}/${MAX_PARTICIPANTS} participants)`);

    this.server.to(code).emit('room-participants', {
      code,
      participants: participantList,
      maxParticipants: MAX_PARTICIPANTS,
    });

    const otherParticipants = participantList.filter(p => p.socketId !== client.id);
    if (otherParticipants.length > 0) {
      client.emit('existing-participants', otherParticipants);
    }

    await this.colaborativoService.addParticipant(code, {
      id: participantId,
      name: displayName,
      joinedAt: new Date(),
    });
  }

  @SubscribeMessage('leave-room')
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId?: string },
  ) {
    this.removeParticipantFromRoom(client, data.code);

    if (data.participantId) {
      await this.colaborativoService.removeParticipant(data.code, data.participantId);
    }
  }

  @SubscribeMessage('signal')
  handleSignal(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      code: string;
      to: string;
      type: 'offer' | 'answer' | 'ice-candidate';
      payload: unknown;
    },
  ) {
    this.server.to(data.to).emit('signal', {
      from: client.id,
      type: data.type,
      payload: data.payload,
    });
  }

  @SubscribeMessage('chat-message')
  async handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      code: string;
      id: string;
      participantId: string;
      displayName: string;
      message: string;
      timestamp: number;
    },
  ) {
    client.to(data.code).emit('chat-message', data);

    await this.colaborativoService.addMessage(data.code, {
      id: data.id,
      userId: data.participantId,
      userName: data.displayName,
      text: data.message,
      timestamp: new Date(data.timestamp),
      type: 'chat',
    });
  }

  @SubscribeMessage('verse-shared-ws')
  async handleVerseSharedWs(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      code: string;
      id: string;
      participantId: string;
      displayName: string;
      verse: string;
      livro: string;
      capitulo: number;
      versiculo: number;
      texto: string;
      message?: string;
      timestamp: number;
    },
  ) {
    client.to(data.code).emit('verse-shared-ws', data);

    await this.colaborativoService.addMessage(data.code, {
      id: data.id,
      userId: data.participantId,
      userName: data.displayName,
      text: `${data.verse} - ${data.texto}${data.message ? `\n${data.message}` : ''}`,
      timestamp: new Date(data.timestamp),
      type: 'verse',
    });
  }

  @SubscribeMessage('typing-start')
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId: string; displayName: string },
  ) {
    client.to(data.code).emit('typing-start', data);

    const key = `${data.code}:${data.participantId}`;
    if (this.typingTimers.has(key)) {
      clearTimeout(this.typingTimers.get(key)!);
    }
    this.typingTimers.set(key, setTimeout(() => {
      this.emitTypingStop(data.code, data.participantId);
      this.typingTimers.delete(key);
    }, 3000));
  }

  @SubscribeMessage('typing-stop')
  handleTypingStopWs(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId: string },
  ) {
    this.server.to(data.code).emit('typing-stop', { code: data.code, participantId: data.participantId });
  }

  private emitTypingStop(code: string, participantId: string) {
    this.server.to(code).emit('typing-stop', { code, participantId });
  }

  private handleTypingStopBySocket(client: Socket) {
    for (const [code] of this.rooms.entries()) {
      const room = this.rooms.get(code);
      if (room) {
        const participant = room.participants.get(client.id);
        if (participant) {
          this.emitTypingStop(code, participant.participantId);
          const key = `${code}:${participant.participantId}`;
          if (this.typingTimers.has(key)) {
            clearTimeout(this.typingTimers.get(key)!);
            this.typingTimers.delete(key);
          }
        }
      }
    }
  }

  @SubscribeMessage('call-invite')
  handleCallInvite(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      code: string;
      callerId: string;
      callerName: string;
      callType: 'video' | 'voice';
    },
  ) {
    client.to(data.code).emit('call-invite', {
      ...data,
      callerSocketId: client.id,
    });
  }

  @SubscribeMessage('call-accept')
  handleCallAccept(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; targetSocketId: string; callerName: string },
  ) {
    this.server.to(data.targetSocketId).emit('call-accept', {
      code: data.code,
      acceptorSocketId: client.id,
      callerName: data.callerName,
    });
  }

  @SubscribeMessage('call-reject')
  handleCallReject(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; targetSocketId: string; callerName: string },
  ) {
    this.server.to(data.targetSocketId).emit('call-reject', {
      code: data.code,
      rejectorName: data.callerName,
    });
  }

  @SubscribeMessage('presentation-sync')
  handlePresentationSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: {
      code: string;
      action: 'navigate' | 'fontSize' | 'mirror' | 'stop';
      livro?: string;
      capitulo?: number;
      versiculo?: number;
      texto?: string;
      fontSize?: number;
      mirror?: boolean;
      presentedBy?: string;
    },
  ) {
    client.to(data.code).emit('presentation-sync', data);
  }

  @SubscribeMessage('quiz-start')
  handleQuizStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; questions: unknown[] },
  ) {
    client.to(data.code).emit('quiz-start', { questions: data.questions });
    this.logger.log(`Quiz started in room ${data.code} (${data.questions.length} questions)`);
  }

  @SubscribeMessage('quiz-answer')
  handleQuizAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; answer: unknown },
  ) {
    client.to(data.code).emit('quiz-answer', { answer: data.answer });
  }

  @SubscribeMessage('quiz-sync')
  handleQuizSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; currentQuestion: number; status: string },
  ) {
    client.to(data.code).emit('quiz-sync', {
      currentQuestion: data.currentQuestion,
      currentQuestionIndex: data.currentQuestion,
      status: data.status,
    });
  }

  @SubscribeMessage('note-sync')
  handleNoteSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; notes?: unknown; action?: string; noteId?: string },
  ) {
    client.to(data.code).emit('note-sync', data);
  }

  @SubscribeMessage('theme-sync')
  handleThemeSync(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; theme: string },
  ) {
    client.to(data.code).emit('theme-sync', { theme: data.theme });
  }

  @SubscribeMessage('cursor-move')
  handleCursorMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId: string; participantName: string; color: string; verseIndex: number; timestamp: number },
  ) {
    client.to(data.code).emit('cursor-move', {
      participantId: data.participantId,
      participantName: data.participantName,
      color: data.color,
      verseIndex: data.verseIndex,
      timestamp: data.timestamp,
    });
  }

  private removeParticipantFromRoom(client: Socket, code: string) {
    const room = this.rooms.get(code);
    if (!room) return;

    const participant = room.participants.get(client.id);
    room.participants.delete(client.id);
    client.leave(code);

    if (participant) {
      this.logger.log(`${participant.displayName} left room ${code}`);
      const key = `${code}:${participant.participantId}`;
      if (this.typingTimers.has(key)) {
        clearTimeout(this.typingTimers.get(key)!);
        this.typingTimers.delete(key);
      }
    }

    if (room.participants.size === 0) {
      this.rooms.delete(code);
      this.logger.log(`Room ${code} deleted (empty)`);
    } else {
      this.server.to(code).emit('room-participants', {
        code,
        participants: Array.from(room.participants.values()),
      });
      this.server.to(code).emit('peer-left', { socketId: client.id });
    }
  }

  private removeParticipantFromAllRooms(socketId: string) {
    for (const [code] of this.rooms.entries()) {
      const room = this.rooms.get(code);
      if (room && room.participants.has(socketId)) {
        const participant = room.participants.get(socketId);
        room.participants.delete(socketId);

        if (participant) {
          this.logger.log(`${participant.displayName} disconnected from room ${code}`);
          const key = `${code}:${participant.participantId}`;
          if (this.typingTimers.has(key)) {
            clearTimeout(this.typingTimers.get(key)!);
            this.typingTimers.delete(key);
          }
        }

        if (room.participants.size === 0) {
          this.rooms.delete(code);
          this.logger.log(`Room ${code} deleted (empty)`);
        } else {
          this.server.to(code).emit('room-participants', {
            code,
            participants: Array.from(room.participants.values()),
          });
          this.server.to(code).emit('peer-left', { socketId });
        }
      }
    }
  }
}
