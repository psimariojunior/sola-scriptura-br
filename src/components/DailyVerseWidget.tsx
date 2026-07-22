'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, RefreshCw } from 'lucide-react';

const DAILY_VERSES = [
  { ref: 'João 3:16', text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.' },
  { ref: 'Salmos 23:1', text: 'O Senhor é o meu pastor; nada me faltará.' },
  { ref: 'Filipenses 4:13', text: 'Posso todas as coisas naquele que me fortalece.' },
  { ref: 'Romanos 8:28', text: 'E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus.' },
  { ref: 'Jeremias 29:11', text: 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.' },
  { ref: 'Isaías 40:31', text: 'Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias.' },
  { ref: 'Provérbios 3:5-6', text: 'Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
  { ref: 'Mateus 11:28', text: 'Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.' },
  { ref: '2 Timóteo 1:7', text: 'Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.' },
  { ref: 'Hebreus 11:1', text: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.' },
  { ref: 'Efésios 2:8-9', text: 'Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.' },
  { ref: 'Salmos 91:1', text: 'Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.' },
  { ref: 'Josué 1:9', text: 'Não to mandei eu? Esforça-te e tem bom ânimo; não pasmes, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.' },
  { ref: 'Salmos 119:105', text: 'Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.' },
  { ref: 'Mateus 6:33', text: 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.' },
];

function getDailyVerse(): { ref: string; text: string } {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}

interface DailyVerseWidgetProps {
  compact?: boolean;
}

export function DailyVerseWidget({ compact = false }: DailyVerseWidgetProps) {
  const [verse, setVerse] = useState<{ ref: string; text: string } | null>(null);

  useEffect(() => {
    setVerse(getDailyVerse());
  }, []);

  const handleRefresh = () => {
    setVerse(getDailyVerse());
  };

  if (!verse) return null;

  if (compact) {
    return (
      <div className="w-full max-w-xs p-4 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2.5">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/80">
            Versículo do Dia
          </span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed italic mb-2">
          &ldquo;{verse.text}&rdquo;
        </p>
        <p className="text-xs font-medium text-primary">— {verse.ref}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-sm relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--primary)) 0%, transparent 60%)' }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary/80">
              Versículo do Dia
            </span>
          </div>
          <button
            onClick={handleRefresh}
            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
            aria-label="Atualizar versículo"
          >
            <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
        <p className="text-base text-foreground/90 leading-relaxed italic mb-3">
          &ldquo;{verse.text}&rdquo;
        </p>
        <p className="text-sm font-semibold text-primary">— {verse.ref}</p>
      </div>
    </motion.div>
  );
}
