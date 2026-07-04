'use client';

import { useState, useEffect, useRef } from 'react';
import { BookOpen, Sparkles, MapPin, Scroll, Users, Clock, Search, Bookmark, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api-production-bb96.up.railway.app/api/v1';

interface Estatisticas {
  totalLivros: number;
  totalCapitulos: number;
  totalVersiculos: number;
  totalPalavrasGregas: number;
  totalPalavrasHebraicas: number;
  totalDoutrinas: number;
  totalLocalizacoes: number;
  totalEventosCronologia: number;
}

interface AtalhoRapido {
  icone: any;
  titulo: string;
  descricao: string;
  href: string;
  cor: string;
}

interface VersiculoDia {
  referencia: string;
  texto: string;
  contexto?: string;
}

export function Dashboard() {
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [versiculoDia, setVersiculoDia] = useState<VersiculoDia | null>(null);
  const [carregando, setCarregando] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/biblia/estatisticas`).then(r => r.json()).catch(() => ({})),
      fetch(`${API}/biblia/versiculo-dia`).then(r => r.json()).catch(() => ({})),
    ]).then(([stats, vd]) => {
      setEstatisticas(stats as Estatisticas);
      setVersiculoDia(vd as VersiculoDia);
      setCarregando(false);
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: any[] = [];
    const edges: any[] = [];
    
    // Criar nós representando livros da Bíblia
    const livrosNT = ['Mt', 'Mc', 'Lc', 'Jo', 'At', 'Rm', '1Co', '2Co', 'Gl', 'Ef', 'Fp', 'Cl', '1Ts', '2Ts', '1Tm', '2Tm', 'Tt', 'Fm', 'Hb', 'Tg', '1Pe', '2Pe', '1Jo', '2Jo', '3Jo', 'Jd', 'Ap'];
    const livrosAT = ['Gn', 'Êx', 'Lv', 'Nm', 'Dt', 'Js', 'Jz', 'Rt', '1Sm', '2Sm', '1Rs', '2Rs', '1Cr', '2Cr', 'Ed', 'Ne', 'Et', 'Jó', 'Sl', 'Pv', 'Ec', 'Ct', 'Is', 'Jr', 'Lm', 'Ez', 'Dn', 'Os', 'Jl', 'Am', 'Ob', 'Jn', 'Mq', 'Na', 'Hc', 'Sf', 'Ag', 'Zc', 'Ml'];

    // Posicionar nós em círculo
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;

    [...livrosAT, ...livrosNT].forEach((livro, i) => {
      const angle = (i / (livrosAT.length + livrosNT.length)) * Math.PI * 2 - Math.PI / 2;
      const isNT = i >= livrosAT.length;
      nodes.push({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        nome: livro,
        testamento: isNT ? 'NT' : 'AT',
        conexoes: []
      });
    });

    // Criar algumas conexões aleatórias para simular referências cruzadas
    for (let i = 0; i < 80; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      const to = Math.floor(Math.random() * nodes.length);
      if (from !== to) {
        edges.push({ from, to, weight: Math.random() });
      }
    }

    // Desenhar arestas
    edges.forEach(edge => {
      const fromNode = nodes[edge.from];
      const toNode = nodes[edge.to];
      
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = `rgba(180, 100, 80, ${0.1 + edge.weight * 0.2})`;
      ctx.lineWidth = 0.5 + edge.weight * 1.5;
      ctx.stroke();
    });

    // Desenhar nós
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.testamento === 'NT' ? 10 : 8, 0, Math.PI * 2);
      ctx.fillStyle = node.testamento === 'NT' 
        ? 'rgba(180, 100, 80, 0.8)' 
        : 'rgba(100, 120, 140, 0.8)';
      ctx.fill();
      
      ctx.font = '10px Cormorant Garamond, serif';
      ctx.fillStyle = 'rgba(60, 40, 30, 0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.nome, node.x, node.y);
    });

    // Animação suave
    let animationFrameId: number;
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Redesenha tudo
      edges.forEach(edge => {
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = `rgba(180, 100, 80, ${0.1 + edge.weight * 0.2})`;
        ctx.lineWidth = 0.5 + edge.weight * 1.5;
        ctx.stroke();
      });

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.testamento === 'NT' ? 10 : 8, 0, Math.PI * 2);
        ctx.fillStyle = node.testamento === 'NT' 
          ? 'rgba(180, 100, 80, 0.8)' 
          : 'rgba(100, 120, 140, 0.8)';
        ctx.fill();
        
        ctx.font = '10px Cormorant Garamond, serif';
        ctx.fillStyle = 'rgba(60, 40, 30, 0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.nome, node.x, node.y);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const atalhos: AtalhoRapido[] = [
    { icone: BookOpen, titulo: 'Bíblia', descricao: 'Leitura e estudo', href: '/biblia', cor: 'text-primary' },
    { icone: Sparkles, titulo: 'IA Assistente', descricao: 'Exegese inteligente', href: '/ia', cor: 'text-[hsl(var(--gold))]' },
    { icone: MapPin, titulo: 'Mapas', descricao: 'Geografia bíblica', href: '/historia', cor: 'text-[hsl(var(--sage))]' },
    { icone: Scroll, titulo: 'Línguas', descricao: 'Grego e Hebraico', href: '/idiomas', cor: 'text-[hsl(var(--burgundy))]' },
    { icone: Users, titulo: 'Teologia', descricao: 'Doutrinas sistemáticas', href: '/teologia', cor: 'text-accent' },
    { icone: Clock, titulo: 'Cronologia', descricao: 'Linha do tempo', href: '/cronologia', cor: 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-16">
      {/* Grafo de Conexões */}
      <section className="relative">
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Conexões Escriturísticas
          </p>
          <h2 className="font-display text-3xl font-light text-foreground">
            A Bíblia como um Todo Coerente
          </h2>
          <p className="font-serif-body text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Visualize as interconexões entre os 66 livros — Antigo e Novo Testamento unidos por milhares de referências cruzadas, profecias e cumprimentos.
          </p>
        </div>
        
        <div className="relative h-[400px] w-full bg-gradient-to-br from-secondary/30 to-card rounded-sm border border-border/40 overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--burgundy))]/80" />
              <span className="text-muted-foreground">Antigo Testamento</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="text-muted-foreground">Novo Testamento</span>
            </div>
          </div>
        </div>
      </section>

      {/* Versículo do Dia */}
      {versiculoDia && (
        <section className="sola-card p-10 md:p-14 bg-gradient-to-br from-primary/5 to-burgundy/5 border-primary/20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Versículo do Dia
            </p>
            <blockquote className="font-serif-body text-2xl md:text-3xl text-foreground leading-relaxed italic mb-6">
              &ldquo;{versiculoDia.texto}&rdquo;
            </blockquote>
            <p className="font-display text-lg text-primary font-semibold mb-4">
              {versiculoDia.referencia}
            </p>
            {versiculoDia.contexto && (
              <p className="font-serif-body text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {versiculoDia.contexto}
              </p>
            )}
            <Link
              href="/biblia"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-primary border-b border-primary pb-0.5 hover:text-primary/80 transition-colors"
            >
              Estudar este versículo <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* Acesso Rápido */}
      <section>
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
            Ferramentas de Estudo
          </p>
          <h2 className="font-display text-3xl font-light text-foreground">
            Comece Sua Pesquisa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/40">
          {atalhos.map((atalho) => (
            <Link
              key={atalho.href}
              href={atalho.href}
              className="group bg-card p-8 hover:bg-secondary/40 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-sm bg-secondary/50 ${atalho.cor}`}>
                  <atalho.icone className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {atalho.titulo}
                  </h3>
                  <p className="font-serif-body text-sm text-muted-foreground mt-1">
                    {atalho.descricao}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Estatísticas */}
      {!carregando && estatisticas && (
        <section className="border-t border-border/40 pt-16">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Acervo Digital
            </p>
            <h2 className="font-display text-3xl font-light text-foreground">
              Dimensões da Plataforma
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { rotulo: 'Livros', valor: estatisticas.totalLivros || 66 },
              { rotulo: 'Capítulos', valor: estatisticas.totalCapitulos || 1189 },
              { rotulo: 'Versículos', valor: estatisticas.totalVersiculos || 31102 },
              { rotulo: 'Strong Grego', valor: estatisticas.totalPalavrasGregas || 5624 },
              { rotulo: 'Strong Hebraico', valor: estatisticas.totalPalavrasHebraicas || 8674 },
              { rotulo: 'Doutrinas', valor: estatisticas.totalDoutrinas || 0 },
            ].map((item) => (
              <div key={item.rotulo} className="text-center p-6 sola-card">
                <p className="font-display text-3xl font-light text-primary">
                  {item.valor.toLocaleString('pt-BR')}
                </p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
                  {item.rotulo}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
