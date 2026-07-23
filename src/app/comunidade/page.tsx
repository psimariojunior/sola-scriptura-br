'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Users, Hash, Bell, BellOff, Settings } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { createWebRTCService, type WebRTCService } from '@/lib/webrtc';

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  channel: string;
  timestamp: number;
}

const CANAIS = [
  { id: 'geral', nome: 'Geral', descricao: 'Conversa geral sobre a Bíblia', icon: '💬' },
  { id: 'estudo', nome: 'Estudo', descricao: 'Discussões sobre passagens bíblicas', icon: '📖' },
  { id: 'oracao', nome: 'Oração', descricao: 'Pedidos e agradecimentos de oração', icon: '🙏' },
  { id: 'duvidas', nome: 'Dúvidas', descricao: 'Tire suas dúvidas sobre a Bíblia', icon: '❓' },
  { id: 'devocional', nome: 'Devocional', descricao: 'Compartilhe suas reflexões diárias', icon: '✨' },
];

function getUserName(): string {
  if (typeof window === 'undefined') return 'Anônimo';
  const stored = localStorage.getItem('ssb_chat_username');
  if (stored) return stored;
  const names = ['Pedro', 'Paulo', 'Tiago', 'João', 'André', 'Filipe', 'Ana', 'Maria', 'Rute', 'Ester'];
  const name = names[Math.floor(Math.random() * names.length)];
  localStorage.setItem('ssb_chat_username', name);
  return name;
}

function getUserId(): string {
  if (typeof window === 'undefined') return 'user-0';
  const stored = localStorage.getItem('ssb_chat_user_id');
  if (stored) return stored;
  const id = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem('ssb_chat_user_id', id);
  return id;
}

export default function ComunidadePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [activeChannel, setActiveChannel] = useState('geral');
  const [userId] = useState(getUserId);
  const [userName, setUserName] = useState('');
  const [editingName, setEditingName] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
  const svcRef = useRef<WebRTCService | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = getUserName();
    setUserName(name);
  }, []);

  // WebSocket connection
  useEffect(() => {
    const svc = createWebRTCService();
    svcRef.current = svc;

    svc.onChatMessage((msg) => {
      const chatMsg: ChatMessage = {
        id: msg.id,
        userId: msg.participantId,
        userName: msg.displayName,
        message: msg.message,
        channel: 'geral',
        timestamp: msg.timestamp,
      };
      setMessages(prev => prev.some(m => m.id === msg.id) ? prev : [...prev, chatMsg]);
    });

    svc.onParticipants((participants) => {
      setOnlineCount(participants.length);
    });

    svc.connect('comunidade-chat', userId, userName || getUserName());

    return () => { svc.disconnect(); svcRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId, userName: userName || getUserName(),
      message: input.trim(), channel: activeChannel, timestamp: Date.now(),
    };
    setMessages(prev => [...prev, msg]);
    svcRef.current?.sendChatMessage(msg.id, userId, userName || getUserName(), input.trim());
    setInput('');
  }, [input, userId, userName, activeChannel]);

  const filteredMessages = messages.filter(m => m.channel === activeChannel);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-0 h-screen flex flex-col">
        <div className="px-4 py-3 border-b border-border/40 bg-background/95 backdrop-blur z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h1 className="font-display text-lg font-light">Comunidade</h1>
                <p className="text-[10px] text-muted-foreground">{onlineCount} online agora</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {editingName ? (
                <input type="text" value={userName} onChange={e => setUserName(e.target.value)}
                  onBlur={() => { localStorage.setItem('ssb_chat_username', userName); setEditingName(false); }}
                  onKeyDown={e => e.key === 'Enter' && (localStorage.setItem('ssb_chat_username', userName), setEditingName(false))}
                  autoFocus
                  className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20" />
              ) : (
                <button onClick={() => setEditingName(true)}
                  className="text-sm text-muted-foreground hover:text-foreground">
                  {userName || 'Definir nome'}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden max-w-6xl mx-auto w-full">
          {/* Sidebar - Canais */}
          <div className="w-56 border-r border-border/40 bg-background/50 overflow-y-auto hidden md:block">
            <div className="p-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Canais</p>
              {CANAIS.map(canal => (
                <button key={canal.id} onClick={() => setActiveChannel(canal.id)}
                  className={cn('w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all mb-1',
                    activeChannel === canal.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50')}>
                  <span className="text-base">{canal.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{canal.nome}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{canal.descricao}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            {/* Header do canal */}
            <div className="px-4 py-2.5 border-b border-border/40 bg-background/50">
              <div className="flex items-center gap-2">
                <span className="text-base">{CANAIS.find(c => c.id === activeChannel)?.icon}</span>
                <div>
                  <p className="text-sm font-medium">{CANAIS.find(c => c.id === activeChannel)?.nome}</p>
                  <p className="text-[10px] text-muted-foreground">{CANAIS.find(c => c.id === activeChannel)?.descricao}</p>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <MessageCircle className="w-8 h-8 text-primary/50" />
                  </div>
                  <p className="text-sm font-medium mb-1">Nenhuma mensagem ainda</p>
                  <p className="text-xs text-muted-foreground">Seja o primeiro a escrever algo!</p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className={cn('flex gap-3',
                      msg.userId === userId && 'flex-row-reverse')}>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                      {msg.userName.charAt(0)}
                    </div>
                    <div className={cn('max-w-[70%]',
                      msg.userId === userId ? 'text-right' : '')}>
                      <div className="flex items-center gap-2 mb-0.5" style={{ flexDirection: msg.userId === userId ? 'row-reverse' : 'row' }}>
                        <span className="text-xs font-medium">{msg.userId === userId ? 'Você' : msg.userName}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className={cn('px-3 py-2 rounded-xl text-sm',
                        msg.userId === userId ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted rounded-tl-sm')}>
                        {msg.message}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/40 bg-background/50">
              <div className="flex gap-2">
                <input type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={`Mensagem em #${CANAIS.find(c => c.id === activeChannel)?.nome}...`}
                  className="flex-1 px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <motion.button onClick={sendMessage} disabled={!input.trim()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className={cn('px-4 py-2.5 rounded-xl transition-all',
                    input.trim() ? 'bg-primary text-primary-foreground' : 'opacity-50 bg-muted')}>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
