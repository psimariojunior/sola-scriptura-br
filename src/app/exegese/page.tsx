'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const niveis = [
  {
    titulo: '1. Contexto Histórico',
    desc: 'Quando, onde e por que o texto foi escrito. Situação do autor e dos destinatários.',
    exemplo: 'Romanos foi escrito por Paulo (~57 d.C.) para a igreja em Roma, uma comunidade mista de judeus e gentios.',
  },
  {
    titulo: '2. Contexto Literário',
    desc: 'Gênero literário, estrutura do livro, relação com os textos ao redor.',
    exemplo: 'Gênesis 1-11 é literatura narrativa teológica, não científica. Apresenta verdades sobre Deus e a criação.',
  },
  {
    titulo: '3. Contexto Gramatical',
    desc: 'Análise do texto original: palavras, sintaxe, verbos, construções.',
    exemplo: 'Em João 3:16, "monogenēs" (unigênito) indica único em natureza, não em ordem cronológica.',
  },
  {
    titulo: '4. Contexto Teológico',
    desc: 'Como o texto se conecta com o tema maior da Bíblia: Deus, homem, pecado, salvação.',
    exemplo: 'A expiação em Romanos 3:25 se conecta com o sistema sacrificial do AT e com a obra de Cristo.',
  },
  {
    titulo: '5. Contexto Aplicativo',
    desc: 'Como o texto se aplica à vida do crente hoje, respeitando o contexto original.',
    exemplo: 'Efésios 2:8-9 se aplica hoje como principio de salvação pela graça, não por obras humanas.',
  },
];

const generos = [
  { nome: 'Narrativa', desc: 'Histórias que revelam a ação de Deus na história (Gênesis, Atos)' },
  { nome: 'Lei', desc: 'Instruções e mandamentos (Êxodo, Levítico, Deuteronômio)' },
  { nome: 'Poetry', desc: 'Salmos, Provérbios, Eclesiastes — linguagem figurada e emocional' },
  { nome: 'Profecia', desc: 'Mensagens de Deus para o povo, com denúncia, consolo e predição' },
  { nome: 'Epístola', desc: 'Cartas doutrinárias e práticas (Romanos, Efésios, etc.)' },
  { nome: 'Apocalíptico', desc: 'Símbolos e visões que revelam verdades sobre o futuro e o espiritual' },
];

export default function ExegesePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Exegese Bíblica</h1>
            <p className="text-muted-foreground">Métodos de análise e interpretação das Escrituras</p>
          </div>

          {/* Levels of Context */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-light mb-6 text-primary">Níveis de Contexto</h2>
            <div className="space-y-4">
              {niveis.map((n, i) => (
                <div key={i} className="sola-card p-6">
                  <h3 className="font-semibold text-lg mb-2">{n.titulo}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{n.desc}</p>
                  <div className="bg-muted/50 rounded-sm p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Exemplo</p>
                    <p className="font-serif-body text-sm italic">{n.exemplo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Literary Genres */}
          <div>
            <h2 className="font-display text-2xl font-light mb-6 text-primary">Gêneros Literários</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generos.map((g, i) => (
                <div key={i} className="sola-card p-5">
                  <h3 className="font-semibold mb-1">{g.nome}</h3>
                  <p className="text-sm text-muted-foreground">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
