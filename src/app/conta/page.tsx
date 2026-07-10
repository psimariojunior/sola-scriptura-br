'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { 
  BookOpen, Heart, StickyNote, LogOut, User, Settings,
  Mail, Calendar, Crown, ExternalLink, Sparkles, Clock,
  TrendingUp, Award, ArrowRight
} from 'lucide-react';
import { authService, type Usuario } from '@/lib/auth';
import { listarMarcas, type MarcaBiblia } from '@/lib/estudos';
import { livroPorAbreviacao } from '@/data/biblia';

export default function ContaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [marcas, setMarcas] = useState<MarcaBiblia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const user = authService.getUsuario();
    if (!user) {
      router.push('/auth/login');
      return;
    }
    setUsuario(user);
    setMarcas(listarMarcas());
    setCarregando(false);
  }, [router]);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };

  if (carregando) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center py-16">
            <div className="animate-spin w-10 h-10 border-2 border-primary border-t-transparent rounded-full mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!usuario) return null;

  const favoritos = marcas.filter(m => m.favorito);
  const anotacoes = marcas.filter(m => m.anotacao);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <User className="w-4 h-4" />
                Minha Conta
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-light mb-4">
                Bem-vindo, <span className="text-primary italic">{usuario.nome?.split(' ')[0]}</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Gerencie seu perfil, estudos e favoritos
              </p>
            </div>
          </ScrollReveal>

          {/* Profile Card */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl overflow-hidden mb-8">
              {/* Banner */}
              <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 relative">
                <div className="absolute inset-0 bg-[url('/patterns/cross.svg')] opacity-10" />
              </div>
              
              {/* Profile */}
              <div className="px-6 pb-6 -mt-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white text-3xl font-display shadow-lg">
                    {usuario.nome?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl font-semibold">{usuario.nome}</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {usuario.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border/50 rounded-xl hover:bg-muted/50 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-5 rounded-2xl text-center group hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <p className="font-display text-3xl font-light text-primary">{favoritos.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Favoritos</p>
              </div>
              <div className="glass-card p-5 rounded-2xl text-center group hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <StickyNote className="w-6 h-6 text-amber-500" />
                </div>
                <p className="font-display text-3xl font-light text-primary">{anotacoes.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Anotações</p>
              </div>
              <div className="glass-card p-5 rounded-2xl text-center group hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <p className="font-display text-3xl font-light text-primary">{marcas.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Total</p>
              </div>
              <div className="glass-card p-5 rounded-2xl text-center group hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <p className="font-display text-lg font-light text-primary">Gratuito</p>
                <p className="text-xs text-muted-foreground mt-1">Plano atual</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link href="/estudos" className="glass-card p-6 rounded-2xl group hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Meus Estudos</h3>
                    <p className="text-sm text-muted-foreground">Acesse seus favoritos e anotações</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link href="/biblia" className="glass-card p-6 rounded-2xl group hover:shadow-lg transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">Ir para Bíblia</h3>
                    <p className="text-sm text-muted-foreground">Continue sua leitura</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </ScrollReveal>

          {/* Upgrade CTA */}
          <ScrollReveal>
            <div className="glass-card rounded-2xl overflow-hidden mb-8">
              <div className="p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-display text-xl font-semibold mb-1">Desbloqueie o Premium</h3>
                    <p className="text-sm text-muted-foreground">
                      Acesse todas as traduções, comentários, estudos avançados e muito mais
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all">
                    Assinar Premium
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Recent Activity */}
          {marcas.length > 0 && (
            <ScrollReveal>
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Atividade Recente
                  </h3>
                  <Link href="/estudos" className="text-sm text-primary hover:underline">
                    Ver tudo
                  </Link>
                </div>
                <div className="space-y-3">
                  {marcas.slice(0, 5).map((m) => {
                    const livro = livroPorAbreviacao.get(m.livro);
                    return (
                      <Link
                        key={`${m.livro}:${m.capitulo}:${m.versiculo}:${m.traducao}`}
                        href={`/biblia?livro=${m.livro}&capitulo=${m.capitulo}`}
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all group"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          m.favorito
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {m.favorito ? (
                            <Heart className="w-5 h-5 fill-current" />
                          ) : (
                            <StickyNote className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {livro?.nome || m.livro} {m.capitulo}:{m.versiculo}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">{m.texto}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase font-mono bg-muted px-2 py-1 rounded-full">
                          {m.traducao}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
