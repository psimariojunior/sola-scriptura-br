'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, VideoOff, Mic, MicOff, PhoneOff, Phone,
  MonitorUp, Maximize2, Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createWebRTCService, type PeerStream, type ConnectionStatus, type WebRTCService } from '@/lib/webrtc';
import { getParticipantLabel } from '@/lib/collaborative';

interface VideoCallProps {
  roomCode: string;
  participantId: string;
  displayName?: string;
  callType?: 'video' | 'voice';
  onEndCall: () => void;
  onServiceReady?: (service: WebRTCService) => void;
}

export function VideoCall({ roomCode, participantId, displayName, callType = 'video', onEndCall, onServiceReady }: VideoCallProps) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerStreams, setPeerStreams] = useState<PeerStream[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(callType === 'video');
  const [minimized, setMinimized] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const serviceRef = useRef<WebRTCService | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const name = displayName || getParticipantLabel(participantId);
  const isVoiceOnly = callType === 'voice';

  const startCall = useCallback(async () => {
    try {
      const service = createWebRTCService();
      serviceRef.current = service;

      service.onStatus(setStatus);
      service.onPeerStream(setPeerStreams);

      const stream = await service.getLocalStream(!isVoiceOnly, true);
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      service.connect(roomCode, participantId, name);
      onServiceReady?.(service);
    } catch (err) {
      console.error('Failed to start call:', err);
      setStatus('error');
    }
  }, [roomCode, participantId, name, isVoiceOnly, onServiceReady]);

  useEffect(() => {
    startCall();
    return () => {
      serviceRef.current?.disconnect();
      screenStreamRef.current?.getTracks().forEach(t => t.stop());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  const toggleAudio = () => {
    const enabled = serviceRef.current?.toggleAudio();
    setAudioEnabled(enabled ?? audioEnabled);
  };

  const toggleVideo = () => {
    const enabled = serviceRef.current?.toggleVideo();
    setVideoEnabled(enabled ?? videoEnabled);
  };

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach(t => t.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
      const stream = await serviceRef.current?.getLocalStream(true, true);
      if (stream) setLocalStream(stream);
      return;
    }
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStreamRef.current = screenStream;
      setIsScreenSharing(true);
      setLocalStream(screenStream);
      screenStream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false);
        serviceRef.current?.getLocalStream(!isVoiceOnly, true).then(s => setLocalStream(s));
      };
    } catch {
      // user cancelled
    }
  };

  const endCall = () => {
    serviceRef.current?.disconnect();
    onEndCall();
  };

  const totalPeers = peerStreams.length;
  const isInCall = status === 'connected';

  if (minimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-4 z-50"
      >
        <button
          onClick={() => setMinimized(false)}
          className={cn(
            'flex items-center gap-2 px-4 py-3 rounded-full shadow-xl border transition-all',
            isInCall
              ? 'bg-green-500/20 border-green-500/40 text-green-600 dark:text-green-400'
              : 'bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-400'
          )}
        >
          <div className="relative">
            {isVoiceOnly ? <Mic className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            {isInCall && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            )}
          </div>
          <span className="text-sm font-medium">
            {totalPeers > 0 ? `${totalPeers + 1} participantes` : isVoiceOnly ? 'Chamada de voz' : 'Chamada ativa'}
          </span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-3 h-3 rounded-full',
            isInCall ? 'bg-green-500 animate-pulse' : status === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
          )} />
          <span className="text-sm font-medium text-[var(--content-primary)]">
            {isVoiceOnly ? '🎙️ Chamada de voz' : '📹 Chamada de vídeo'}
            {isInCall ? ' — Ativa' : status === 'connecting' ? ' — Conectando...' : ' — Desconectado'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--content-muted)]">
            {totalPeers + 1} participante{totalPeers > 0 ? 's' : ''}
          </span>
          <button
            onClick={() => setMinimized(true)}
            className="p-1.5 hover:bg-[var(--surface-raised)] rounded-lg transition-colors text-[var(--content-muted)]"
            title="Minimizar"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video/Audio Grid */}
      <div className="flex-1 overflow-y-auto p-2">
        {isVoiceOnly ? (
          <div className="flex flex-wrap justify-center items-center gap-4 h-full">
            {/* Local participant avatar */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-[var(--brand-default)]/30"
                style={{ backgroundColor: audioEnabled ? 'var(--brand-default)' : '#666' }}>
                {name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs text-[var(--content-muted)]">Você {!audioEnabled && '(mudo)'}</span>
            </div>
            {/* Remote participant avatars */}
            {peerStreams.map((peer) => (
              <div key={peer.socketId} className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-green-500/30 bg-green-500/80">
                  {(peer.displayName || peer.participantId).charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-[var(--content-muted)]">{peer.displayName || peer.participantId.slice(0, 8)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={cn(
            'grid gap-2 h-full',
            totalPeers === 0 ? 'grid-cols-1' : totalPeers === 1 ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'
          )}>
            {/* Local Video */}
            <div className="relative rounded-xl overflow-hidden bg-black/80 border border-[var(--border)]/20">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className={cn(
                  'w-full h-full object-cover',
                  !videoEnabled && 'hidden'
                )}
              />
              {!videoEnabled && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="w-16 h-16 rounded-full bg-[var(--brand-default)]/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[var(--brand-default)]">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium">
                Você
              </div>
              {!audioEnabled && (
                <div className="absolute top-2 right-2 p-1 bg-red-500/80 rounded-full">
                  <MicOff className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Remote Videos */}
            {peerStreams.map((peer) => (
              <RemoteVideo key={peer.socketId} peer={peer} />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 px-4 py-4 border-t border-[var(--border)]/40 bg-[var(--surface-sunken)]/30">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center transition-all',
            audioEnabled
              ? 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-primary)]'
              : 'bg-red-500 text-white'
          )}
          title={audioEnabled ? 'Mudo' : 'Ativar microfone'}
        >
          {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </motion.button>

        {!isVoiceOnly && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleVideo}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-all',
              videoEnabled
                ? 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-primary)]'
                : 'bg-red-500 text-white'
            )}
            title={videoEnabled ? 'Desligar câmera' : 'Ligar câmera'}
          >
            {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </motion.button>
        )}

        {!isVoiceOnly && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleScreenShare}
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center transition-all',
              isScreenSharing
                ? 'bg-blue-500 text-white'
                : 'bg-[var(--surface-raised)] border border-[var(--border)] text-[var(--content-primary)]'
            )}
            title={isScreenSharing ? 'Parar compartilhamento' : 'Compartilhar tela'}
          >
            <MonitorUp className="w-5 h-5" />
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={endCall}
          className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30"
          title="Encerrar chamada"
        >
          <PhoneOff className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
}

function RemoteVideo({ peer }: { peer: PeerStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = peer.stream;
    }
  }, [peer.stream]);

  return (
    <div className={cn(
      'relative rounded-xl overflow-hidden bg-black/80 border border-[var(--border)]/20',
      isFullscreen ? 'col-span-2 row-span-2' : ''
    )}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded text-xs text-white font-medium">
        {peer.displayName || peer.participantId.slice(0, 8)}
      </div>
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-2 right-2 p-1 bg-black/40 hover:bg-black/60 rounded text-white transition-colors"
      >
        {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
      </button>
    </div>
  );
}

interface CallButtonProps {
  roomCode: string;
  participantId: string;
  isCallActive: boolean;
  onStartCall: () => void;
  onEndCall: () => void;
}

export function CallButton({ roomCode, participantId, isCallActive, onStartCall, onEndCall }: CallButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={isCallActive ? onEndCall : onStartCall}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all',
        isCallActive
          ? 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20'
          : 'bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-500/20'
      )}
      title={isCallActive ? 'Encerrar chamada' : 'Iniciar chamada em grupo'}
    >
      {isCallActive ? (
        <>
          <PhoneOff className="w-4 h-4" />
          <span>Encerrar</span>
        </>
      ) : (
        <>
          <Phone className="w-4 h-4" />
          <span>Chamada</span>
        </>
      )}
    </motion.button>
  );
}
