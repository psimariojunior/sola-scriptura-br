'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const periodos = [
  {
    titulo: 'Período Patriarcal (~2000-1500 a.C.)',
    desc: 'Abraão, Isaque, Jacó e José. A formação do povo de Deus.',
    eventos: ['Chamado de Abraão (Gn 12)', 'Aliança com Abraão (Gn 15)', 'Jacó e seus 12 filhos (Gn 35-50)', 'José no Egito (Gn 37-50)'],
  },
  {
    titulo: 'Período da Lei (~1500-1020 a.C.)',
    desc: 'Êxodo, Sinai, a terra prometida e os juízes.',
    eventos: ['Êxodo do Egito (Ex 12-14)', 'Dar da Lei no Sinai (Ex 19-20)', 'Conquista de Canaã (Js 1-12)', 'Período dos Juízes (Jz 1-21)'],
  },
  {
    titulo: 'Período dos Reis (~1020-586 a.C.)',
    desc: 'Monarquia unificada, reinos divididos e profetas.',
    eventos: ['Saul, primeiro rei (1 Sm 10)', 'Davi e o reino unificado (2 Sm 5)', 'Salomão e o Templo (1 Rs 6)', 'Divisão do reino (1 Rs 12)'],
  },
  {
    titulo: 'Período do Exílio (586-516 a.C.)',
    desc: 'Destruição de Jerusalém, cativeiro na Babilônia e retorno.',
    eventos: ['Destruição do Templo (2 Rs 25)', 'Cativeiro na Babilônia (Dt 28)', 'Profecias de Jeremias e Ezequiel', 'Retorno e reconstrução (Ed 1-6)'],
  },
  {
    titulo: 'Período Intertestamentário (516 a.C. - 4 d.C.)',
    desc: 'Domínio persa, grego e romano. Formação do judaísmo.',
    eventos: ['Domínio persa (539-332 a.C.)', 'Conquista de Alexandre (332 a.C.)', 'Revolta dos Macabeus (167 a.C.)', 'Domínio romano (63 a.C.)'],
  },
  {
    titulo: 'Vida de Cristo (~4-30 d.C.)',
    desc: 'Nascimento, ministério, crucificação e ressurreição de Jesus.',
    eventos: ['Nascimento em Belém (Mt 1-2)', 'Batismo e ministério (Mc 1-10)', 'Crucificação (Mc 14-15)', 'Ressurreição (Mc 16)'],
  },
  {
    titulo: 'Período da Igreja Primitiva (30-100 d.C.)',
    desc: 'Expansão do evangelho, epístolas e formação do cânon.',
    eventos: ['Pentecostes (At 2)', 'Missões de Paulo (At 13-28)', 'Epístolas apostólicas', 'Mártires e perseguições'],
  },
];

export default function HistoriaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">História Bíblica</h1>
            <p className="text-muted-foreground">Contexto histórico, cultural e geográfico das Escrituras</p>
          </div>

          <div className="space-y-8">
            {periodos.map((p, i) => (
              <div key={i} className="sola-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg mb-1">{p.titulo}</h2>
                    <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {p.eventos.map((e, j) => (
                        <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
