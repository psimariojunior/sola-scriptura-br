'use client';

import { io, Socket } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const WS_URL = API_URL.replace('/api/v1', '');

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

export interface PeerStream {
  participantId: string;
  displayName: string;
  stream: MediaStream;
  socketId: string;
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SignalingParticipant {
  socketId: string;
  participantId: string;
  displayName: string;
}

export interface ChatMessage {
  id: string;
  participantId: string;
  displayName: string;
  message: string;
  timestamp: number;
}

export interface VerseSharedEvent {
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
}

export interface TypingEvent {
  participantId: string;
  displayName: string;
}

export interface CallInviteEvent {
  callerSocketId: string;
  callerId: string;
  callerName: string;
  callType: 'video' | 'voice';
  code: string;
}

export interface PresentationSyncEvent {
  action: 'navigate' | 'fontSize' | 'mirror' | 'stop';
  livro?: string;
  capitulo?: number;
  versiculo?: number;
  texto?: string;
  fontSize?: number;
  mirror?: boolean;
  presentedBy?: string;
}

export class WebRTCService {
  private socket: Socket | null = null;
  private peers = new Map<string, RTCPeerConnection>();
  private localStream: MediaStream | null = null;
  private onPeerStreamCallback: ((peers: PeerStream[]) => void) | null = null;
  private onStatusCallback: ((status: ConnectionStatus) => void) | null = null;
  private onParticipantsCallback: ((participants: SignalingParticipant[]) => void) | null = null;
  private onChatMessageCallback: ((msg: ChatMessage) => void) | null = null;
  private onVerseSharedCallback: ((verse: VerseSharedEvent) => void) | null = null;
  private onTypingStartCallback: ((data: TypingEvent) => void) | null = null;
  private onTypingStopCallback: ((participantId: string) => void) | null = null;
  private onCallInviteCallback: ((data: CallInviteEvent) => void) | null = null;
  private onCallAcceptCallback: ((data: { code: string; acceptorSocketId: string }) => void) | null = null;
  private onCallRejectCallback: ((data: { code: string; rejectorName: string }) => void) | null = null;
  private onPresentationSyncCallback: ((data: PresentationSyncEvent) => void) | null = null;
  private onBibleNavigationCallback: ((data: { livro: string; capitulo: number; traducao: string }) => void) | null = null;
  private peerStreams: PeerStream[] = [];
  private mySocketId = '';
  private roomCode = '';

  get socketId(): string {
    return this.mySocketId;
  }

  async getLocalStream(video = true, audio = true): Promise<MediaStream> {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video ? { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } : false,
      audio,
    });
    this.localStream = stream;
    return stream;
  }

  connect(roomCode: string, participantId: string, displayName: string) {
    this.roomCode = roomCode;
    this.socket = io(WS_URL, {
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      this.mySocketId = this.socket!.id!;
      this.onStatusCallback?.('connected');
      this.socket!.emit('join-room', {
        code: roomCode,
        participantId,
        displayName,
      });
    });

    this.socket.on('disconnect', () => {
      this.onStatusCallback?.('disconnected');
    });

    this.socket.on('connect_error', () => {
      this.onStatusCallback?.('error');
    });

    this.socket.on('room-participants', (data: { participants: SignalingParticipant[] }) => {
      this.onParticipantsCallback?.(data.participants);
    });

    this.socket.on('existing-participants', async (participants: SignalingParticipant[]) => {
      for (const p of participants) {
        await this.createOffer(p.socketId);
      }
    });

    this.socket.on('signal', async (data: { from: string; type: string; payload: unknown }) => {
      if (data.type === 'offer') {
        await this.handleOffer(data.from, data.payload as RTCSessionDescriptionInit);
      } else if (data.type === 'answer') {
        await this.handleAnswer(data.from, data.payload as RTCSessionDescriptionInit);
      } else if (data.type === 'ice-candidate') {
        await this.handleIceCandidate(data.from, data.payload as RTCIceCandidateInit);
      }
    });

    this.socket.on('peer-left', (data: { socketId: string }) => {
      this.removePeer(data.socketId);
    });

    this.socket.on('chat-message', (data: ChatMessage) => {
      this.onChatMessageCallback?.(data);
    });

    this.socket.on('verse-shared-ws', (data: VerseSharedEvent) => {
      this.onVerseSharedCallback?.(data);
    });

    this.socket.on('typing-start', (data: TypingEvent) => {
      this.onTypingStartCallback?.(data);
    });

    this.socket.on('typing-stop', (data: { participantId: string }) => {
      this.onTypingStopCallback?.(data.participantId);
    });

    this.socket.on('bible-navigation', (data: { livro: string; capitulo: number; traducao: string }) => {
      this.onBibleNavigationCallback?.(data);
    });

    this.socket.on('call-invite', (data: CallInviteEvent) => {
      this.onCallInviteCallback?.(data);
    });

    this.socket.on('call-accept', (data: { code: string; acceptorSocketId: string }) => {
      this.onCallAcceptCallback?.(data);
    });

    this.socket.on('call-reject', (data: { code: string; rejectorName: string }) => {
      this.onCallRejectCallback?.(data);
    });

    this.socket.on('presentation-sync', (data: PresentationSyncEvent) => {
      this.onPresentationSyncCallback?.(data);
    });
  }

  sendChatMessage(id: string, participantId: string, displayName: string, message: string) {
    if (!this.socket || !this.roomCode) return;
    const data = {
      code: this.roomCode,
      id,
      participantId,
      displayName,
      message,
      timestamp: Date.now(),
    };
    this.socket.emit('chat-message', data);
  }

  sendVerseShared(data: VerseSharedEvent) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('verse-shared-ws', { ...data, code: this.roomCode });
  }

  sendBibleNavigation(data: { livro: string; capitulo: number; traducao: string }) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('bible-navigation', { ...data, code: this.roomCode });
  }

  sendTypingStart(participantId: string, displayName: string) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('typing-start', { code: this.roomCode, participantId, displayName });
  }

  sendTypingStop(participantId: string) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('typing-stop', { code: this.roomCode, participantId });
  }

  sendCallInvite(callerId: string, callerName: string, callType: 'video' | 'voice') {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('call-invite', {
      code: this.roomCode,
      callerId,
      callerName,
      callType,
    });
  }

  sendCallAccept(targetSocketId: string, callerName: string) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('call-accept', {
      code: this.roomCode,
      targetSocketId,
      callerName,
    });
  }

  sendCallReject(targetSocketId: string, callerName: string) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('call-reject', {
      code: this.roomCode,
      targetSocketId,
      callerName,
    });
  }

  sendPresentationSync(data: PresentationSyncEvent) {
    if (!this.socket || !this.roomCode) return;
    this.socket.emit('presentation-sync', { ...data, code: this.roomCode });
  }

  private async createOffer(targetSocketId: string) {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peers.set(targetSocketId, pc);

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream!));
    }

    pc.ontrack = (event) => {
      this.updatePeerStream(targetSocketId, event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket?.emit('signal', {
          code: '',
          to: targetSocketId,
          type: 'ice-candidate',
          payload: event.candidate.toJSON(),
        });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        this.removePeer(targetSocketId);
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    this.socket?.emit('signal', {
      code: '',
      to: targetSocketId,
      type: 'offer',
      payload: offer,
    });
  }

  private async handleOffer(fromSocketId: string, offer: RTCSessionDescriptionInit) {
    const pc = new RTCPeerConnection(ICE_SERVERS);
    this.peers.set(fromSocketId, pc);

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream!));
    }

    pc.ontrack = (event) => {
      this.updatePeerStream(fromSocketId, event.streams[0]);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket?.emit('signal', {
          code: '',
          to: fromSocketId,
          type: 'ice-candidate',
          payload: event.candidate.toJSON(),
        });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
        this.removePeer(fromSocketId);
      }
    };

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    this.socket?.emit('signal', {
      code: '',
      to: fromSocketId,
      type: 'answer',
      payload: answer,
    });
  }

  private async handleAnswer(fromSocketId: string, answer: RTCSessionDescriptionInit) {
    const pc = this.peers.get(fromSocketId);
    if (pc) {
      await pc.setRemoteDescription(answer);
    }
  }

  private async handleIceCandidate(fromSocketId: string, candidate: RTCIceCandidateInit) {
    const pc = this.peers.get(fromSocketId);
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private updatePeerStream(socketId: string, stream: MediaStream) {
    const existing = this.peerStreams.find(p => p.socketId === socketId);
    if (existing) {
      existing.stream = stream;
    }
    this.onPeerStreamCallback?.([...this.peerStreams]);
  }

  private removePeer(socketId: string) {
    const pc = this.peers.get(socketId);
    if (pc) {
      pc.close();
      this.peers.delete(socketId);
    }
    this.peerStreams = this.peerStreams.filter(p => p.socketId !== socketId);
    this.onPeerStreamCallback?.([...this.peerStreams]);
  }

  toggleAudio() {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(t => { t.enabled = !t.enabled; });
      return this.localStream.getAudioTracks().every(t => t.enabled);
    }
    return false;
  }

  toggleVideo() {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(t => { t.enabled = !t.enabled; });
      return this.localStream.getVideoTracks().every(t => t.enabled);
    }
    return false;
  }

  onPeerStream(cb: (peers: PeerStream[]) => void) {
    this.onPeerStreamCallback = cb;
  }

  onStatus(cb: (status: ConnectionStatus) => void) {
    this.onStatusCallback = cb;
  }

  onParticipants(cb: (participants: SignalingParticipant[]) => void) {
    this.onParticipantsCallback = cb;
  }

  onChatMessage(cb: (msg: ChatMessage) => void) {
    this.onChatMessageCallback = cb;
  }

  onVerseShared(cb: (verse: VerseSharedEvent) => void) {
    this.onVerseSharedCallback = cb;
  }

  onTypingStart(cb: (data: TypingEvent) => void) {
    this.onTypingStartCallback = cb;
  }

  onTypingStop(cb: (participantId: string) => void) {
    this.onTypingStopCallback = cb;
  }

  onBibleNavigation(cb: (data: { livro: string; capitulo: number; traducao: string }) => void) {
    this.onBibleNavigationCallback = cb;
  }

  onCallInvite(cb: (data: CallInviteEvent) => void) {
    this.onCallInviteCallback = cb;
  }

  onCallAccept(cb: (data: { code: string; acceptorSocketId: string }) => void) {
    this.onCallAcceptCallback = cb;
  }

  onCallReject(cb: (data: { code: string; rejectorName: string }) => void) {
    this.onCallRejectCallback = cb;
  }

  onPresentationSync(cb: (data: PresentationSyncEvent) => void) {
    this.onPresentationSyncCallback = cb;
  }

  disconnect() {
    this.peers.forEach(pc => pc.close());
    this.peers.clear();
    this.peerStreams = [];
    this.localStream?.getTracks().forEach(t => t.stop());
    this.localStream = null;
    this.socket?.emit('leave-room', {});
    this.socket?.disconnect();
    this.socket = null;
    this.onPeerStreamCallback = null;
    this.onStatusCallback = null;
    this.onParticipantsCallback = null;
    this.onChatMessageCallback = null;
    this.onVerseSharedCallback = null;
    this.onTypingStartCallback = null;
    this.onTypingStopCallback = null;
    this.onCallInviteCallback = null;
    this.onCallAcceptCallback = null;
    this.onCallRejectCallback = null;
    this.onBibleNavigationCallback = null;
    this.onPresentationSyncCallback = null;
  }
}

export function createWebRTCService() {
  return new WebRTCService();
}
