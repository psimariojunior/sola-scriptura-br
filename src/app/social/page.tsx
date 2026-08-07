'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Heart, MessageCircle, Share2, Trophy, Users, Target,
  Flame, Search, UserPlus, Crown, Medal, Star, CheckCircle2, Clock,
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';

type Tab = 'feed' | 'desafios' | 'leaderboard' | 'amigos';

interface Activity {
  id: string;
  user: string;
  avatar: string;
  action: string;
  verse?: string;
  verseRef?: string;
  likes: number;
  comments: number;
  time: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  participants: number;
  progress: number;
  days: number;
  prize: string;
}

interface LeaderboardUser {
  position: number;
  name: string;
  points: number;
  streak: number;
  chapters: number;
  isMe?: boolean;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  streak: number;
}

const TABS: { key: Tab; label: string }[] = [
  { key: 'feed', label: 'Atividades' },
  { key: 'desafios', label: 'Desafios' },
  { key: 'leaderboard', label: 'Ranking' },
  { key: 'amigos', label: 'Amigos' },
];

const ACTIVITIES: Activity[] = [
  { id: '1', user: 'Ana Clara', avatar: '👩', action: 'leu João 3:16-21', verse: 'Porque Deus amou o mundo de tal maneira...', verseRef: 'João 3:16', likes: 12, comments: 3, time: '2 min atrás' },
  { id: '2', user: 'Pedro Santos', avatar: '👨', action: 'compartilhou um versículo', verse: 'Posso todas as coisas naquele que me fortalece.', verseRef: 'Filipenses 4:13', likes: 24, comments: 5, time: '15 min atrás' },
  { id: '3', user: 'Maria Lima', avatar: '👩‍🦰', action: 'completou o desafio "Salmos em 30 dias"', likes: 45, comments: 8, time: '1 hora atrás' },
  { id: '4', user: 'José Oliveira', avatar: '🧔', action: 'anotou uma reflexão sobre Romanos 8:28', verse: 'E sabemos que todas as coisas contribuem juntamente...', verseRef: 'Romanos 8:28', likes: 18, comments: 2, time: '3 horas atrás' },
  { id: '5', user: 'Lucia Ferreira', avatar: '👩‍🦳', action: 'começou o plano "Novo Testamento em 90 dias"', likes: 8, comments: 1, time: '5 horas atrás' },
];

const CHALLENGES: Challenge[] = [
  { id: '1', title: '30 Dias de Salmos', description: 'Leia 5 Salmos por dia durante 30 dias', icon: '🎵', participants: 234, progress: 45, days: 30, prize: 'Insignia de Louvor' },
  { id: '2', title: 'Evangelhos em 7 Dias', description: 'Leia Mateus, Marcos, Lucas e João em uma semana', icon: '✝️', participants: 189, progress: 60, days: 7, prize: 'Insignia de Discipulo' },
  { id: '3', title: 'Provérbios Diários', description: 'Leia 1 capitulo de Provérbios por 31 dias', icon: '💡', participants: 312, progress: 30, days: 31, prize: 'Insignia de Sabedoria' },
  { id: '4', title: 'Novo Testamento em 90 Dias', description: 'Leia todo o NT com estudo diário', icon: '📚', participants: 156, progress: 20, days: 90, prize: 'Insignia de Erudito' },
];

const LEADERBOARD: LeaderboardUser[] = [
  { position: 1, name: 'Ana Clara', points: 2450, streak: 45, chapters: 312 },
  { position: 2, name: 'Pedro Santos', points: 2180, streak: 32, chapters: 287 },
  { position: 3, name: 'Maria Lima', points: 1920, streak: 28, chapters: 245 },
  { position: 4, name: 'Voce', points: 1650, streak: 21, chapters: 198, isMe: true },
  { position: 5, name: 'Jose Oliveira', points: 1420, streak: 18, chapters: 176 },
  { position: 6, name: 'Lucia Ferreira', points: 1280, streak: 15, chapters: 154 },
  { position: 7, name: 'Carlos Souza', points: 980, streak: 12, chapters: 112 },
  { position: 8, name: 'Julia Costa', points: 850, streak: 9, chapters: 98 },
];

const FRIENDS: Friend[] = [
  { id: '1', name: 'Ana Clara', avatar: '👩', online: true, streak: 45 },
  { id: '2', name: 'Pedro Santos', avatar: '👨', online: true, streak: 32 },
  { id: '3', name: 'Maria Lima', avatar: '👩‍🦰', online: false, streak: 28 },
  { id: '4', name: 'Jose Oliveira', avatar: '🧔', online: true, streak: 18 },
  { id: '5', name: 'Lucia Ferreira', avatar: '👩‍🦳', online: false, streak: 15 },
];

const MEDALS = ['🥇', '🥈', '🥉'];

export default function SocialPage() {
  const [tab, setTab] = useState<Tab>('feed');
  const [friendSearch, setFriendSearch] = useState('');
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedActivities(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20">
                <Users className="w-10 h-10 text-purple-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Leitura <span className="text-primary italic">Social</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">Conecte-se com outros estudantes da Palavra</p>
            </div>
          </ScrollReveal>

          <div className="flex gap-2 justify-center mb-8 flex-wrap">
            {TABS.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  tab === t.key ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:bg-muted/50')}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }}>

              {tab === 'feed' && (
                <div className="space-y-4">
                  {ACTIVITIES.map((a, i) => (
                    <ScrollReveal key={a.id}>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="glass-card p-5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-xl flex-shrink-0">{a.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-sm">{a.user}</span>
                              <span className="text-xs text-muted-foreground">{a.time}</span>
                              {a.likes > 20 && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">Popular</span>}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{a.action}</p>
                            {a.verse && (
                              <div className="mt-3 p-3 rounded-xl bg-muted/30 border border-border/50">
                                <p className="text-xs text-muted-foreground italic">&ldquo;{a.verse}&rdquo;</p>
                                <p className="text-xs text-primary font-medium mt-1">{a.verseRef}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-3">
                              <button onClick={() => toggleLike(a.id)}
                                className={cn('flex items-center gap-1 text-xs transition-colors',
                                  likedActivities.has(a.id) ? 'text-red-500' : 'text-muted-foreground hover:text-red-500')}>
                                <Heart className="w-4 h-4" fill={likedActivities.has(a.id) ? 'currentColor' : 'none'} />
                                {a.likes + (likedActivities.has(a.id) ? 1 : 0)}
                              </button>
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <MessageCircle className="w-4 h-4" /> {a.comments}
                              </button>
                              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                                <Share2 className="w-4 h-4" /> Compartilhar
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {tab === 'desafios' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CHALLENGES.map((c, i) => (
                    <ScrollReveal key={c.id}>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="glass-card p-5 hover:border-primary/30 transition-all">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">{c.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm">{c.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {c.days} dias</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {c.participants}</span>
                          <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {c.prize}</span>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{c.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                              initial={{ width: 0 }} animate={{ width: `${c.progress}%` }} transition={{ duration: 0.5 }} />
                          </div>
                        </div>
                        <button className="w-full py-2 rounded-xl border border-border text-xs font-medium hover:bg-muted/50 transition-all">
                          Participar
                        </button>
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              )}

              {tab === 'leaderboard' && (
                <div className="glass-card p-5">
                  <div className="flex items-center gap-3 mb-6">
                    <Crown className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl">Ranking Semanal</h2>
                  </div>
                  <div className="space-y-3">
                    {LEADERBOARD.map((u, i) => (
                      <motion.div key={u.position} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                        className={cn('flex items-center gap-3 p-3 rounded-xl transition-all',
                          u.isMe ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/30')}>
                        <div className="w-8 text-center text-lg font-bold">
                          {i < 3 ? MEDALS[i] : <span className="text-muted-foreground text-sm">{u.position}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn('text-sm font-medium', u.isMe && 'text-primary')}>{u.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {u.points} pts</span>
                            <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {u.streak} dias</span>
                            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {u.chapters} caps</span>
                          </div>
                        </div>
                        {u.isMe && <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Voce</span>}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'amigos' && (
                <div className="space-y-4">
                  <div className="glass-card p-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" placeholder="Buscar amigos..." value={friendSearch} onChange={e => setFriendSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary/50" />
                    </div>
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-5 h-5 text-primary" />
                      <h3 className="font-medium text-sm">Amigos ({FRIENDS.length})</h3>
                    </div>
                    <div className="space-y-3">
                      {FRIENDS.filter(f => f.name.toLowerCase().includes(friendSearch.toLowerCase())).map((f, i) => (
                        <motion.div key={f.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-all">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-xl">{f.avatar}</div>
                            <div className={cn('absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
                              f.online ? 'bg-green-500' : 'bg-gray-400')} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{f.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-muted-foreground">{f.online ? 'Online' : 'Offline'}</span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Flame className="w-3 h-3 text-orange-500" /> {f.streak} dias
                              </span>
                            </div>
                          </div>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-xs font-medium hover:bg-muted/50 transition-all">
                            <MessageCircle className="w-3 h-3" /> Mensagem
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <UserPlus className="w-5 h-5 text-primary" />
                      <h3 className="font-medium text-sm">Sugestoes</h3>
                    </div>
                    <div className="space-y-3">
                      {[{ name: 'Gabriel Martins', avatar: '👦', streak: 14 }, { name: 'Rafaela Dias', avatar: '👧', streak: 8 }].map((s, i) => (
                        <motion.div key={s.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-all">
                          <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-xl">{s.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Flame className="w-3 h-3 text-orange-500" /> {s.streak} dias de estudo
                            </p>
                          </div>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-all">
                            <UserPlus className="w-3 h-3" /> Adicionar
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
