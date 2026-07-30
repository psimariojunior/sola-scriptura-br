'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, BookOpen, ChevronRight, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { trackEvent, getSummary } from '@/lib/gamificationTracker';

interface DiaLeitura { dia: number; titulo: string; passagens: { livro: string; capitulo: number }[]; }
interface PlanoLeitura { id: string; titulo: string; descricao: string; duracao: number; nivel: string; icone: string; dias: DiaLeitura[]; }

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
  { id: 'biblia-1-ano', titulo: 'Bíblia em 1 Ano', descricao: '365 dias, ~3-4 capítulos/dia', duracao: 365, nivel: 'intermediario', icone: '📖', dias: gerarPlanoBiblia1Ano() },
  { id: 'nt-90', titulo: 'Novo Testamento em 90 Dias', descricao: '3 capítulos/dia', duracao: 90, nivel: 'iniciante', icone: '✝️', dias: Array.from({length:90},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:[{livro:'Mt',capitulo:i+1}]})) },
  { id: 'evangelhos-60', titulo: '4 Evangelhos em 60 Dias', descricao: '1-2 capítulos/dia', duracao: 60, nivel: 'iniciante', icone: '🌿', dias: Array.from({length:60},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:[{livro:['Mt','Mc','Lc','Jo'][i%4],capitulo:Math.floor(i/4)+1}]})) },
  { id: 'salmos-30', titulo: 'Salmos em 30 Dias', descricao: '5 salmos/dia', duracao: 30, nivel: 'iniciante', icone: '🎵', dias: Array.from({length:30},(_,i)=>({dia:i+1,titulo:`Dia ${i+1}`,passagens:Array.from({length:5},(_,j)=>({livro:'Sl',capitulo:i*5+j+1}))})) },
];

export default function PlanosPage() {
  const [planoSel, setPlanoSel] = useState<PlanoLeitura | null>(null);
  const [diasConcluidos, setDiasConcluidos] = useState<Set<number>>(new Set());
  const [streak, setStreak] = useState(0);

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

  if (planoSel) {
    return (
      <div className="min-h-screen"><Header />
        <main className="pt-20 pb-32 px-4"><div className="max-w-3xl mx-auto">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-6">
            <button onClick={()=>setPlanoSel(null)} className="text-sm text-muted-foreground hover:text-primary mb-3 flex items-center gap-1">← Voltar</button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{planoSel.icone}</span>
              <div><h1 className="font-display text-2xl font-light">{planoSel.titulo}</h1>
                <p className="text-sm text-muted-foreground">{planoSel.descricao}</p></div>
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
                <Link key={i} href={`/biblia?livro=${p.livro}&capitulo=${p.capitulo}`}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all group">
                  <BookOpen className="w-4 h-4 text-primary shrink-0" /><span className="text-sm font-medium">{p.livro} {p.capitulo}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" /></Link>
              ))}</div>
              <button onClick={()=>toggleDia(diaAtual)}
                className="mt-3 w-full py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Marcar dia {diaAtual} como concluído</button>
            </motion.div>
          )}

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
            <h2 className="font-display text-lg font-medium mb-3">Todos os Dias</h2>
            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">{planoSel.dias.map(dia=>{
              const c=diasConcluidos.has(dia.dia), a=dia.dia===diaAtual;
              return (<motion.button key={dia.dia} onClick={()=>toggleDia(dia.dia)}
                className={cn('w-full text-left rounded-xl border p-3 transition-all flex items-center gap-3',
                  c?'bg-primary/5 border-primary/20':a?'border-primary/30 bg-primary/5 ring-1 ring-primary/20':'border-border/30 hover:border-primary/20 bg-card/50')}>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                  c?'bg-primary text-white':a?'bg-primary/10 text-primary':'bg-muted/30 text-muted-foreground')}>
                  {c?<CheckCircle2 className="w-4 h-4"/>:<span className="text-xs font-bold">{dia.dia}</span>}</div>
                <div className="flex-1 min-w-0"><p className={cn('text-sm font-medium',c&&'text-primary')}>{dia.titulo}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{dia.passagens.map(p=>`${p.livro} ${p.capitulo}`).join(' · ')}</p></div>
                {a&&!c&&<ArrowRight className="w-4 h-4 text-primary shrink-0"/>}</motion.button>);
            })}</div>
          </motion.div>
        </div></main><Footer /></div>
      );
  }

  return (
    <div className="min-h-screen"><Header />
      <main className="pt-20 pb-16 px-4"><div className="max-w-4xl mx-auto">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 flex items-center justify-center border border-amber-500/20">
              <Calendar className="w-5 h-5 text-amber-600" /></div>
            <div><h1 className="font-display text-2xl md:text-3xl font-light">Planos de <span className="text-primary italic">Leitura</span></h1>
              <p className="text-xs text-muted-foreground">Escolha um plano e comece sua jornada</p></div>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{PLANOS.map((plano,i)=>(
          <motion.button key={plano.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}}
            onClick={()=>setPlanoSel(plano)}
            className="text-left rounded-2xl border border-border/50 bg-card/50 p-5 hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">{plano.icone}</span>
              <div><h3 className="font-display text-lg font-medium group-hover:text-primary transition-colors">{plano.titulo}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plano.descricao}</p></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{plano.duracao} dias</span>
              <span className="capitalize">{plano.nivel}</span>
            </div>
          </motion.button>
        ))}</div>
      </div></main><Footer /></div>
  );
}
