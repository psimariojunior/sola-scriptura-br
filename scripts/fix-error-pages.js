const fs = require('fs');
const path = require('path');

const base = 'src/app';

const files = [
  { rel: 'admin/error.tsx', fn: 'AdminError', emoji: '⚙️', title: 'Erro no painel administrativo', desc: 'Ocorreu um erro ao carregar o painel. Verifique suas permissões e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'auth/login/error.tsx', fn: 'LoginError', emoji: '🔐', title: 'Erro no Login', desc: 'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'auth/cadastro/error.tsx', fn: 'CadastroError', emoji: '🔐', title: 'Erro no Cadastro', desc: 'Não foi possível realizar o cadastro. Verifique os dados e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'biblia/error.tsx', fn: 'BibliaError', emoji: '📖', title: 'Erro ao carregar a Bíblia', desc: 'Não foi possível carregar o texto bíblico. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'comparar/error.tsx', fn: 'CompararError', emoji: '🔄', title: 'Erro ao Comparar', desc: 'Não foi possível comparar as traduções. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'compartilhar/error.tsx', fn: 'CompartilharError', emoji: '📤', title: 'Erro ao Compartilhar', desc: 'Não foi possível compartilhar. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'comunidade/error.tsx', fn: 'ComunidadeError', emoji: '👥', title: 'Erro na Comunidade', desc: 'Não foi possível carregar a comunidade. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'conta/error.tsx', fn: 'ContaError', emoji: '👤', title: 'Erro na Conta', desc: 'Não foi possível carregar sua conta. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'cronologia/error.tsx', fn: 'CronologiaError', emoji: '📅', title: 'Erro ao carregar Cronologia', desc: 'Não foi possível carregar a linha do tempo. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'devocional/error.tsx', fn: 'DevocionalError', emoji: '🙏', title: 'Erro ao carregar Devocional', desc: 'Não foi possível carregar o devocional. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'devocional/guia/error.tsx', fn: 'GuiaDevocionalError', emoji: '📖', title: 'Erro ao carregar Guia Devocional', desc: 'Não foi possível carregar o guia devocional. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estatisticas/error.tsx', fn: 'EstatisticasError', emoji: '📊', title: 'Erro ao carregar Estatísticas', desc: 'Não foi possível carregar as estatísticas. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estatisticas/gamificacao/error.tsx', fn: 'GamificacaoError', emoji: '🎮', title: 'Erro ao carregar Gamificação', desc: 'Não foi possível carregar a gamificação. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estudo/error.tsx', fn: 'EstudoError', emoji: '📚', title: 'Erro ao carregar Estudo', desc: 'Não foi possível carregar o estudo detalhado. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estudo-ia/error.tsx', fn: 'EstudoIaError', emoji: '🤖', title: 'Erro no Estudo com IA', desc: 'Não foi possível gerar o estudo com IA. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estudos/error.tsx', fn: 'EstudosError', emoji: '📚', title: 'Erro ao carregar Estudos', desc: 'Não foi possível carregar os estudos. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'estudos/manuais/error.tsx', fn: 'ManuaisError', emoji: '📖', title: 'Erro ao carregar Manuais', desc: 'Não foi possível carregar os manuais. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'exegese/error.tsx', fn: 'ExegeseError', emoji: '🔍', title: 'Erro na Exegese', desc: 'Não foi possível realizar a análise exegética. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'ferramentas/error.tsx', fn: 'FerramentasError', emoji: '🛠️', title: 'Erro ao carregar Ferramentas', desc: 'Não foi possível carregar as ferramentas. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'ferramentas/concordancia/error.tsx', fn: 'ConcordanciaError', emoji: '📋', title: 'Erro na Concordância', desc: 'Não foi possível carregar a concordância. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'ferramentas/critica-textual/error.tsx', fn: 'CriticaTextualError', emoji: '📜', title: 'Erro na Crítica Textual', desc: 'Não foi possível carregar a crítica textual. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'ferramentas/introducoes/error.tsx', fn: 'IntroducoesError', emoji: '📖', title: 'Erro ao carregar Introduções', desc: 'Não foi possível carregar as introduções. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'flashcards/error.tsx', fn: 'FlashcardsError', emoji: '🃏', title: 'Erro ao carregar Flashcards', desc: 'Não foi possível carregar os flashcards. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'harmonia/error.tsx', fn: 'HarmoniaError', emoji: '🎵', title: 'Erro na Harmonia', desc: 'Não foi possível carregar a harmonia sinótica. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'historia/error.tsx', fn: 'HistoriaError', emoji: '🏛️', title: 'Erro ao carregar História', desc: 'Não foi possível carregar o contexto histórico. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'historia/atlas/error.tsx', fn: 'AtlasError', emoji: '🗺️', title: 'Erro ao carregar Atlas', desc: 'Não foi possível carregar o atlas. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'ia/error.tsx', fn: 'IAError', emoji: '🤖', title: 'Erro no assistente IA', desc: 'O assistente de IA encontrou um problema. Limpe o chat e tente novamente.', href: '/ia', link: 'Limpar chat' },
  { rel: 'idiomas/error.tsx', fn: 'IdiomasError', emoji: '🌐', title: 'Erro ao carregar Idiomas', desc: 'Não foi possível carregar os dados linguísticos. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'idiomas/dicionario/error.tsx', fn: 'DicionarioError', emoji: '📖', title: 'Erro ao carregar Dicionário', desc: 'Não foi possível carregar o dicionário. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'literatura/error.tsx', fn: 'LiteraturaError', emoji: '📚', title: 'Erro ao carregar Literatura', desc: 'Não foi possível carregar a literatura bíblica. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'milagres/error.tsx', fn: 'MilagresError', emoji: '✨', title: 'Erro ao carregar Milagres', desc: 'Não foi possível carregar os milagres de Jesus. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'parabolas/error.tsx', fn: 'ParabolasError', emoji: '📖', title: 'Erro ao carregar Parábolas', desc: 'Não foi possível carregar as parábolas de Jesus. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'pericopes/error.tsx', fn: 'PericopesError', emoji: '📖', title: 'Erro ao carregar Pericopes', desc: 'Não foi possível carregar as perícopas. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'personagens/error.tsx', fn: 'PersonagensError', emoji: '👤', title: 'Erro ao carregar Personagens', desc: 'Não foi possível carregar os personagens bíblicos. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'pesquisa/error.tsx', fn: 'PesquisaError', emoji: '🔍', title: 'Erro na pesquisa', desc: 'Não foi possível realizar a busca. Verifique sua consulta e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'planos/error.tsx', fn: 'PlanosError', emoji: '📅', title: 'Erro ao carregar Planos', desc: 'Não foi possível carregar os planos de leitura. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'quiz/error.tsx', fn: 'QuizError', emoji: '❓', title: 'Erro ao carregar Quiz', desc: 'Não foi possível carregar o quiz. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'quiz/classico/error.tsx', fn: 'QuizClassicoError', emoji: '🏆', title: 'Erro no Quiz Clássico', desc: 'Não foi possível carregar o quiz clássico. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'quiz/livro/error.tsx', fn: 'QuizLivroError', emoji: '📖', title: 'Erro no Quiz por Livro', desc: 'Não foi possível carregar o quiz por livro. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'quiz/multiplayer/error.tsx', fn: 'QuizMultiplayerError', emoji: '👥', title: 'Erro no Quiz Multiplayer', desc: 'Não foi possível carregar o quiz multiplayer. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'quiz/temporal/error.tsx', fn: 'QuizTemporalError', emoji: '⏰', title: 'Erro no Quiz Temporal', desc: 'Não foi possível carregar o quiz temporal. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'sermoes/error.tsx', fn: 'SermoesError', emoji: '🎤', title: 'Erro ao carregar Sermões', desc: 'Não foi possível carregar os sermões. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'teologia/error.tsx', fn: 'TeologiaError', emoji: '⛪', title: 'Erro ao carregar Teologia', desc: 'Não foi possível carregar os dados teológicos. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
  { rel: 'topicos/error.tsx', fn: 'TopicosError', emoji: '🏷️', title: 'Erro ao carregar Tópicos', desc: 'Não foi possível carregar os tópicos teológicos. Verifique sua conexão e tente novamente.', href: '/', link: 'Ir para o início' },
];

for (const f of files) {
  const filePath = path.join(base, f.rel);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  const content = `'use client';

import Link from 'next/link';

export default function ${f.fn}({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">${f.emoji}</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">${f.title}</h1>
        <p className="text-muted-foreground mb-6">
          ${f.desc}
        </p>
        {error.digest && <p className="text-xs text-muted-foreground/60 mb-4 font-mono">Erro: {error.digest}</p>}
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Tentar novamente
          </button>
          <Link href="${f.href}" className="px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors">
            ${f.link}
          </Link>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Wrote: ${f.rel}`);
}

console.log(`Done! ${files.length} files regenerated.`);
