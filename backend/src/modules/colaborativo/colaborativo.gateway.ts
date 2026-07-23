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
  namespace: '/colaborativo',
})
export class ColaborativoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ColaborativoGateway');
  private rooms = new Map<string, SignalingRoom>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
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

  private removeParticipantFromRoom(client: Socket, code: string) {
    const room = this.rooms.get(code);
    if (!room) return;

    const participant = room.participants.get(client.id);
    room.participants.delete(client.id);
    client.leave(code);

    if (participant) {
      this.logger.log(`${participant.displayName} left room ${code}`);
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
    for (const [code, room] of this.rooms.entries()) {
      if (room.participants.has(socketId)) {
        this.removeParticipantFromRoom(
          { id: socketId, leave: () => {}, join: () => {} } as Socket,
          code,
        );
      }
    }
  }
}
