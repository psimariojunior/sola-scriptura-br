'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageHero } from '@/components/layout/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, CheckCircle2, BookOpen, ChevronRight, Flame, ArrowRight, Sparkles,
  Plus, Share2, Trash2, Copy, Check, Church, Leaf, Music, PenLine, GraduationCap, type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent, getSummary } from '@/lib/gamificationTracker';
import PlanoPersonalizadoCriar, {
  encodePlano,
  type PlanoPersonalizadoData,
  carregarPlanosCustom,
  salvarPlanosCustom,
} from '@/components/PlanoPersonalizadoCriar';

interface DiaLeitura { dia: number; titulo: string; passagens: { livro: string; capitulo: number }[]; }
interface PlanoLeitura { id: string; titulo: string; descricao: string; duracao: number; nivel: string; icone: LucideIcon; dias: DiaLeitura[]; }

function gerarPlanoBiblia1Ano(): DiaLeitura[] {
  const livros: { a: string; c: number }[] = [
    {a:'Gn',c:50},{a:'Ex',c:40},{a:'Lv',c:27},{a:'Nm',c:36},{a:'Dt',c:34},{a:'Js',c:24},{a:'Jz',c:21},{a:'Rt',c:4},
    {a:'1Sm',c:31},{a:'2Sm',c:24},{a:'1Rs',c:22},{a:'2Rs',c:25},{a:'1Cr',c:29},{a:'2Cr',c:36},{a:'Ed',c:10},{a:'Ne',c:13},
    {a:'Et',c:10},{a:'Jó',c:42},{a:'Sl',c:150},{a:'Pv',c:31},{a:'Ec',c:12},{a:'Ct',c:8},{a:'Is',c:66},{a:'Jr',c:52},
    {a:'Lm',c:5},{a:'Ez',c:48},{a:'Dn',c:12},{a:'Os',c:14},{a:'Jl',c:3},{a:'Am',c:9},{a:'Ob',c:1},{a:'Jn',c:4},
    {a:'Mq',c:7},{a:'Na',c:3},{a:'Hc',c:3},{a:'Sf',c:3},{a:'Ag',c:2},{a:'Zc',c:14},{a:'Ml',c:4},
    {a:'Mt',c:28},{a:'Mc',c:16},{a:'Lc',c:24},{a:'Jo',c:21},{a:'At',c:28},{a:'Rm',c:16},{a:'1Co',c:16},{a:'2Co',c:13},
    {a:'Gl',c:6},{a:'Ef',c:6},{a:'Fp',c:4},{a:'Cl',c:4},{a:'1Ts',c:5},{a:'2Ts',c:3},{a:'1Tm',c:6},{a:'2Tm',c:4},
    {a:'Tt',c:3},{a:'Fm',c:1},{a:'Hb',c:13},{a:'Tg',c:5},{a:'1Pe',c:5},{a:'2Pe',c:3},{a:'1Jo',c:5},{a:'2Jo',c:1},
    {a:'3Jo',c:1},{a:'Jd',c:1},{a:'Ap',c:22},
  ];
  const total = livros.reduce((s, l) => s + l.c, 0);
  const capsPorDia = Math.ceil(total / 365);
  const dias: DiaLeitura[] = [];
  let cap = 0;
  for (let d = 1; d <= 365; d++) {
    const pass: { livro: string; capitulo: number }[] = [];
    let rest = capsPorDia;
    while (rest > 0 && cap < total) {
      let acc = 0;
      for (const l of livros) {
        if (acc + l.c > cap) { pass.push({ livro: l.a, capitulo: cap - acc + 1 }); cap++; rest--; break; }
        acc += l.c;
      }
    }
    dias.push({ dia: d, titulo: d === 1 ? 'O Início' : d === 365 ? 'O Fim da Jornada' : `Dia ${d}`, passagens: pass });
  }
  return dias;
}

const PLANOS: PlanoLeitura[] = [
  { id: 'fichas-40', titulo: '40 dias nas fichas profundas', descricao: 'Um capítulo/dia com ficha escrita: contexto, teologia e pergunta', duracao: 40, nivel: 'intermediario', icone: GraduationCap, dias: [
    { dia: 1, titulo: 'Deus fala e o mundo existe', passagens: [{ livro: 'gn', capitulo: 1 }] },
    { dia: 2, titulo: 'O jardim e a aliança', passagens: [{ livro: 'gn', capitulo: 2 }] },
    { dia: 3, titulo: 'A queda e o protoevangelho', passagens: [{ livro: 'gn', capitulo: 3 }] },
    { dia: 4, titulo: 'A arca da graça', passagens: [{ livro: 'gn', capitulo: 6 }] },
    { dia: 5, titulo: 'O chamado de Abrão', passagens: [{ livro: 'gn', capitulo: 12 }] },
    { dia: 6, titulo: 'Justiça pela fé', passagens: [{ livro: 'gn', capitulo: 15 }] },
    { dia: 7, titulo: 'O Cordeiro provido', passagens: [{ livro: 'gn', capitulo: 22 }] },
    { dia: 8, titulo: 'Eu Sou o que Sou', passagens: [{ livro: 'ex', capitulo: 3 }] },
    { dia: 9, titulo: 'A Páscoa', passagens: [{ livro: 'ex', capitulo: 12 }] },
    { dia: 10, titulo: 'O mar se abre', passagens: [{ livro: 'ex', capitulo: 14 }] },
    { dia: 11, titulo: 'Os Dez Mandamentos', passagens: [{ livro: 'ex', capitulo: 20 }] },
    { dia: 12, titulo: 'O Dia da Expiação', passagens: [{ livro: 'lv', capitulo: 16 }] },
    { dia: 13, titulo: 'O Shema', passagens: [{ livro: 'dt', capitulo: 6 }] },
    { dia: 14, titulo: 'Sê forte: a Palavra', passagens: [{ livro: 'js', capitulo: 1 }] },
    { dia: 15, titulo: 'Lealdade no amargor', passagens: [{ livro: 'rt', capitulo: 1 }] },
    { dia: 16, titulo: 'Davi e Golias', passagens: [{ livro: '1sm', capitulo: 17 }] },
    { dia: 17, titulo: 'A aliança davídica', passagens: [{ livro: '2sm', capitulo: 7 }] },
    { dia: 18, titulo: 'Os dois caminhos', passagens: [{ livro: 'sl', capitulo: 1 }] },
    { dia: 19, titulo: 'O Rei no Sião', passagens: [{ livro: 'sl', capitulo: 2 }] },
    { dia: 20, titulo: 'O servo sofredor (Sl 22)', passagens: [{ livro: 'sl', capitulo: 22 }] },
    { dia: 21, titulo: 'O Senhor é o meu pastor', passagens: [{ livro: 'sl', capitulo: 23 }] },
    { dia: 22, titulo: 'Cria em mim um coração puro', passagens: [{ livro: 'sl', capitulo: 51 }] },
    { dia: 23, titulo: 'Bendize, ó minha alma', passagens: [{ livro: 'sl', capitulo: 103 }] },
    { dia: 24, titulo: 'O Senhor diz ao meu Senhor', passagens: [{ livro: 'sl', capitulo: 110 }] },
    { dia: 25, titulo: 'Santo, santo, santo', passagens: [{ livro: 'is', capitulo: 6 }] },
    { dia: 26, titulo: 'O Servo ferido', passagens: [{ livro: 'is', capitulo: 53 }] },
    { dia: 27, titulo: 'A nova aliança', passagens: [{ livro: 'jr', capitulo: 31 }] },
    { dia: 28, titulo: 'O Filho do Homem', passagens: [{ livro: 'dn', capitulo: 7 }] },
    { dia: 29, titulo: 'As bem-aventuranças', passagens: [{ livro: 'mt', capitulo: 5 }] },
    { dia: 30, titulo: 'O filho perdido', passagens: [{ livro: 'lc', capitulo: 15 }] },
    { dia: 31, titulo: 'O Verbo se fez carne', passagens: [{ livro: 'jo', capitulo: 1 }] },
    { dia: 32, titulo: 'Nascer do alto', passagens: [{ livro: 'jo', capitulo: 3 }] },
    { dia: 33, titulo: 'Eis o Homem', passagens: [{ livro: 'jo', capitulo: 19 }] },
    { dia: 34, titulo: 'Pentecostes', passagens: [{ livro: 'at', capitulo: 2 }] },
    { dia: 35, titulo: 'Todos pecaram', passagens: [{ livro: 'rm', capitulo: 3 }] },
    { dia: 36, titulo: 'Nenhuma condenação', passagens: [{ livro: 'rm', capitulo: 8 }] },
    { dia: 37, titulo: 'Mortos, vivificados', passagens: [{ livro: 'ef', capitulo: 2 }] },
    { dia: 38, titulo: 'A fé que vê o invisível', passagens: [{ livro: 'hb', capitulo: 11 }] },
    { dia: 39, titulo: 'Deus é amor', passagens: [{ livro: '1jo', capitulo: 4 }] },
    { dia: 40, titulo: 'Céus novos, terra nova', passagens: [{ livro: 'ap', capitulo: 21 }] },
  ] },
  { id: 'biblia-1-ano', titulo: 'Bíblia em 1 Ano', descricao: '365 dias, ~3-4 capítulos/dia', duracao: 365, nivel: 'intermediario', icone: BookOpen, dias: gerarPlanoBiblia1Ano() },
  { id: 'nt-90', titulo: 'Novo Testamento em 90 Dias', descricao: '3 capítulos/dia', duracao: 90, nivel: 'iniciante', icone: Church, dias: Array.from({length:90},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:[{livro:'Mt',capitulo:i+1}]})) },
  { id: 'evangelhos-60', titulo: '4 Evangelhos em 60 Dias', descricao: '1-2 capítulos/dia', duracao: 60, nivel: 'iniciante', icone: Leaf, dias: Array.from({length:60},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:[{livro:['Mt','Mc','Lc','Jo'][i%4],capitulo:Math.floor(i/4)+1}]})) },
  { id: 'salmos-30', titulo: 'Salmos em 30 Dias', descricao: '5 salmos/dia', duracao: 30, nivel: 'iniciante', icone: Music, dias: Array.from({length:30},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:Array.from({length:5},(_,j)=>({livro:'Sl',capitulo:i*5+j+1}))})) },
];

function customToPlanoLeitura(c: PlanoPersonalizadoData): PlanoLeitura {
  return {
    id: `custom-${c.id}`,
    titulo: c.titulo,
    descricao: c.descricao || `${c.dias.length} dias`,
    duracao: c.dias.length,
    nivel: c.nivel,
    icone: PenLine,
    dias: c.dias.map((d, i) => ({
      dia: i + 1,
      titulo: d.titulo,
      passagens: d.passagens,
    })),
  };
}

export default function PlanosPage() {
  const [planoSel, setPlanoSel] = useState<PlanoLeitura | null>(null);
  const [diasConcluidos, setDiasConcluidos] = useState<Set<number>>(new Set());
  const [streak, setStreak] = useState(0);
  const [planosCustom, setPlanosCustom] = useState<PlanoPersonalizadoData[]>([]);
  const [showCriarModal, setShowCriarModal] = useState(false);
  const [editandoPlano, setEditandoPlano] = useState<PlanoPersonalizadoData | null>(null);
  const [copiado, setCopiado] = useState<string | null>(null);

  useEffect(() => {
    setPlanosCustom(carregarPlanosCustom());
    const id = new URLSearchParams(window.location.search).get('plano');
    if (!id) return;
    const found = PLANOS.find((p) => p.id === id);
    if (found) setPlanoSel(found);
  }, []);

  useEffect(() => {
    if (planoSel) {
      const s = localStorage.getItem(`ssb_plano_${planoSel.id}`);
      if (s) setDiasConcluidos(new Set(JSON.parse(s)));
    }
  }, [planoSel]);

  useEffect(() => { setStreak(getSummary().streakAtual); }, []);

  const toggleDia = useCallback((dia: number) => {
    setDiasConcluidos(prev => {
      const next = new Set(prev);
      if (next.has(dia)) next.delete(dia); else next.add(dia);
      if (planoSel) localStorage.setItem(`ssb_plano_${planoSel.id}`, JSON.stringify([...next]));
      trackEvent('plano_lido', 1, { plano: planoSel?.id, dia });
      return next;
    });
  }, [planoSel]);

  const progresso = useMemo(() => planoSel ? Math.round((diasConcluidos.size / planoSel.duracao) * 100) : 0, [diasConcluidos, planoSel]);
  const diaAtual = useMemo(() => {
    if (!planoSel) return 1;
    for (let i = 1; i <= planoSel.duracao; i++) if (!diasConcluidos.has(i)) return i;
    return planoSel.duracao;
  }, [diasConcluidos, planoSel]);

  const handleSalvarCustom = useCallback((plano: PlanoPersonalizadoData) => {
    setPlanosCustom(prev => {
      const idx = prev.findIndex(p => p.id === plano.id);
      const next = idx >= 0 ? prev.map((p, i) => i === idx ? plano : p) : [...prev, plano];
      salvarPlanosCustom(next);
      return next;
    });
  }, []);

  const handleRemoverCustom = useCallback((id: string) => {
    setPlanosCustom(prev => {
      const next = prev.filter(p => p.id !== id);
      salvarPlanosCustom(next);
      return next;
    });
    setPlanoSel(null);
  }, []);

  const handleCompartilhar = useCallback((plano: PlanoLeitura) => {
    const custom = planosCustom.find(c => `custom-${c.id}` === plano.id);
    if (!custom) return;
    const encoded = encodePlano(custom);
    const url = `${window.location.origin}/planos/compartilhar?id=${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiado(plano.id);
      setTimeout(() => setCopiado(null), 2000);
    });
  }, [planosCustom]);

  if (planoSel) {
    const IconePlano = planoSel.icone;
    return (
      <PageShell maxWidth="3xl" className="pb-32">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-6">
            <button onClick={()=>setPlanoSel(null)} className="ssb-hit text-sm text-muted-foreground hover:text-primary mb-3 flex items-center gap-1">← Voltar</button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl tile-brand flex items-center justify-center shrink-0">
                <IconePlano className="w-5 h-5" />
              </div>
              <div className="flex-1"><h1 className="font-display text-3xl sm:text-4xl font-normal tracking-tight">{planoSel.titulo}</h1>
                <p className="text-sm text-muted-foreground">{planoSel.descricao}</p></div>
              {planoSel.id.startsWith('custom-') && (
                <div className="flex gap-2">
                  <button onClick={() => {
                    const c = planosCustom.find(p => `custom-${p.id}` === planoSel.id);
                    if (c) { setEditandoPlano(c); setPlanoSel(null); setShowCriarModal(true); }
                  }} className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs">
                    Editar
                  </button>
                  <button onClick={() => handleCompartilhar(planoSel)}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                    {copiado === planoSel.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleRemoverCustom(planoSel.id.replace('custom-', ''))}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
            className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-amber-500/5 p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative"><svg width="60" height="60">
                  <circle cx="30" cy="30" r="25" fill="none" stroke="var(--border)" strokeWidth="5" opacity={0.3} />
                  <motion.circle cx="30" cy="30" r="25" fill="none" stroke="hsl(var(--primary))" strokeWidth="5"
                    strokeLinecap="round" strokeDasharray={157}
                    initial={{strokeDashoffset:157}} animate={{strokeDashoffset:157-(progresso/100)*157}}
                    transition={{duration:1,ease:'easeOut'}} transform="rotate(-90 30 30)" />
                </svg><div className="absolute inset-0 flex items-center justify-center"><span className="text-sm font-bold">{progresso}%</span></div></div>
                <div><p className="text-lg font-bold">{diasConcluidos.size} / {planoSel.duracao}</p><p className="text-xs text-muted-foreground">dias concluídos</p></div>
              </div>
              <div className="text-right"><div className="flex items-center gap-1 text-orange-500"><Flame className="w-4 h-4" /><span className="text-sm font-bold">{streak} dias</span></div><p className="text-[10px] text-muted-foreground">streak</p></div>
            </div>
            <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full" initial={{width:0}} animate={{width:`${progresso}%`}} transition={{duration:1}} />
            </div>
          </motion.div>

          {diaAtual <= planoSel.duracao && (
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}}
              className="rounded-2xl border border-primary/30 bg-primary/5 p-5 mb-6">
              <div className="flex items-center gap-2 mb-2"><Sparkles className="w-5 h-5 text-primary" /><h2 className="font-display text-lg font-medium">Hoje — Dia {diaAtual}</h2></div>
              <div className="space-y-2">{planoSel.dias[diaAtual-1]?.passagens.map((p,i)=>(
                <div key={i} className="space-y-1.5">
                <Link href={`/biblia?livro=${p.livro}&capitulo=${p.capitulo}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all group">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" /><span className="text-sm font-medium">{p.livro} {p.capitulo} — ler</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" /></Link>
                {planoSel.id === 'fichas-40' && (
                  <Link href={`/guia?livro=${p.livro}&capitulo=${p.capitulo}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all group">
                    <GraduationCap className="w-4 h-4 text-primary shrink-0" /><span className="text-sm font-medium">Abrir a ficha profunda</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" /></Link>
                )}
                </div>
              ))}</div>
              <button onClick={()=>toggleDia(diaAtual)}
                className="mt-3 w-full min-h-[44px] py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Marcar dia {diaAtual} como concluído</button>
            </motion.div>
          )}

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
            <h2 className="font-display text-lg font-medium mb-3">Todos os Dias</h2>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">{planoSel.dias.map(dia=>{
              const c=diasConcluidos.has(dia.dia), a=dia.dia===diaAtual;
              return (<motion.button key={dia.dia} onClick={()=>toggleDia(dia.dia)}
                className={cn('w-full text-left rounded-xl border p-3 min-h-[44px] transition-all flex items-center gap-3',
                  c?'bg-primary/5 border-primary/20':a?'border-primary/30 bg-primary/5 ring-1 ring-primary/20':'border-border/30 hover:border-primary/20 bg-card/50')}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  c?'bg-primary text-white':a?'bg-primary/10 text-primary':'bg-muted/30 text-muted-foreground')}>
                  {c?<CheckCircle2 className="w-4 h-4"/>:<span className="text-xs font-bold">{dia.dia}</span>}</div>
                <div className="flex-1 min-w-0"><p className={cn('text-sm font-medium',c&&'text-primary')}>{dia.titulo}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{dia.passagens.map(p=>`${p.livro} ${p.capitulo}`).join(' · ')}</p></div>
                {a&&!c&&<ArrowRight className="w-4 h-4 text-primary shrink-0"/>}</motion.button>);
            })}</div>
          </motion.div>
      </PageShell>
      );
  }

  return (
    <PageShell maxWidth="4xl" className="pb-16">
          <PageHero
            icon={Calendar}
            align="left"
            title={<>Planos de <span className="italic text-primary">Leitura</span></>}
            subtitle="Escolha um plano ou crie o seu próprio"
            className="mb-8"
          >
            <button onClick={() => { setEditandoPlano(null); setShowCriarModal(true); }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-[filter]">
              <Plus className="w-4 h-4" /> Criar Plano
            </button>
          </PageHero>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{PLANOS.map((plano,i)=>(
          <motion.button key={plano.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            onClick={()=>setPlanoSel(plano)}
            className={cn(
              'text-left rounded-2xl border p-5 hover:border-primary/30 transition-all group min-h-[112px] ssb-hit',
              plano.id === 'fichas-40'
                ? 'border-primary/40 bg-primary/8 ring-1 ring-primary/20'
                : 'border-border/50 bg-card/50',
            )}>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl tile-brand flex items-center justify-center shrink-0">
                <plano.icone className="w-5 h-5" />
              </div>
              <div>
                {plano.id === 'fichas-40' && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary mb-1">Recomendado</p>
                )}
                <h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors">{plano.titulo}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plano.descricao}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{plano.duracao} dias</span>
              <span className="capitalize">{plano.nivel}</span>
            </div>
          </motion.button>
        ))}</div>

        {planosCustom.length > 0 && (
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mt-10">
            <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Meus Planos Personalizados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planosCustom.map((c) => {
                const pl = customToPlanoLeitura(c);
                return (
                  <motion.div key={c.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
                    className="text-left rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-primary/30 transition-all group">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl tile-cool flex items-center justify-center shrink-0">
                        <PenLine className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <button onClick={() => setPlanoSel(pl)} className="w-full text-left">
                          <h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors">{c.titulo}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{c.descricao || `${c.dias.length} dias`}</p>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{c.dias.length} dias</span>
                      <span className="capitalize">{c.nivel}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setPlanoSel(pl)}
                        className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                        Abrir
                      </button>
                      <button onClick={() => handleCompartilhar(pl)}
                        className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        title="Compartilhar">
                        {copiado === pl.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => { setEditandoPlano(c); setShowCriarModal(true); }}
                        className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-xs">
                        Editar
                      </button>
                      <button onClick={() => handleRemoverCustom(c.id)}
                        className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

      <AnimatePresence>
        {showCriarModal && (
          <PlanoPersonalizadoCriar
            onFechar={() => { setShowCriarModal(false); setEditandoPlano(null); }}
            planoExistente={editandoPlano}
            aoSalvar={handleSalvarCustom}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}
