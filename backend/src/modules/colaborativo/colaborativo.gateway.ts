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
    origin: '*',
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
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string; participantId: string; displayName: string },
  ) {
    const { code, participantId, displayName } = data;

    if (!this.rooms.has(code)) {
      this.rooms.set(code, { code, participants: new Map() });
    }

    const room = this.rooms.get(code)!;

    room.participants.set(client.id, {
      socketId: client.id,
      participantId,
      displayName,
    });

    client.join(code);

    const participantList = Array.from(room.participants.values());

    this.logger.log(`${displayName} joined room ${code} (${participantList.length} participants)`);

    this.server.to(code).emit('room-participants', {
      code,
      participants: participantList,
    });

    const otherParticipants = participantList.filter(p => p.socketId !== client.id);
    if (otherParticipants.length > 0) {
      client.emit('existing-participants', otherParticipants);
    }
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { code: string },
  ) {
    this.removeParticipantFromRoom(client, data.code);
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
  handleChatMessage(
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
  }

  @SubscribeMessage('verse-shared-ws')
  handleVerseSharedWs(
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
      this.handleTypingStop(data.code, data.participantId);
      this.typingTimers.delete(key);
    }, 3000));
  }

  @SubscribeMessage('typing-stop')
  handleTypingStop(code: string, participantId: string) {
    this.server.to(code).emit('typing-stop', { code, participantId });
  }

  private handleTypingStopBySocket(client: Socket) {
    for (const [code] of this.rooms.entries()) {
      const room = this.rooms.get(code);
      if (room) {
        const participant = room.participants.get(client.id);
        if (participant) {
          this.handleTypingStop(code, participant.participantId);
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
