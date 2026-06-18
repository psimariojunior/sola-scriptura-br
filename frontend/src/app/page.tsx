import Link from 'next/link';
import { MainNav } from '@/components/layout/main-nav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <MainNav />

      <section className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sola Scriptura
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            A Plataforma de Estudo Bíblico mais Avançada em Português
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            IA, Exegese, Hermenêutica, Grego, Hebraico, Teologia Sistemática,
            História, Geografia, Arqueologia e muito mais em um só lugar.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/biblia"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Começar a Estudar
            </Link>
            <Link
              href="/pesquisa"
              className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-blue-500 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Pesquisar na Bíblia
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {modulos.map((modulo) => (
            <Link
              key={modulo.titulo}
              href={modulo.link}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="text-3xl mb-4">{modulo.icone}</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {modulo.titulo}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {modulo.descricao}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>Sola Scriptura BR &copy; {new Date().getFullYear()} - Soli Deo Gloria</p>
        </div>
      </footer>
    </div>
  );
}

const modulos = [
  {
    titulo: 'Leitura Bíblica',
    descricao: 'Navegue por livros, capítulos e versículos com múltiplas traduções',
    icone: '📖',
    link: '/biblia',
  },
  {
    titulo: 'Grego e Hebraico',
    descricao: 'Análise completa de palavras originais com Strong e léxico',
    icone: '✍️',
    link: '/idiomas',
  },
  {
    titulo: 'Teologia',
    descricao: 'Doutrinas, tradições e interpretações teológicas',
    icone: '📚',
    link: '/teologia',
  },
  {
    titulo: 'IA Especialista',
    descricao: 'Assistente com IA para estudos bíblicos profundos',
    icone: '🤖',
    link: '/ia',
  },
  {
    titulo: 'História e Geografia',
    desricao: 'Contexto histórico, mapas interativos e arqueologia',
    icone: '🗺️',
    link: '/historia',
  },
  {
    titulo: 'Exegese e Hermenêutica',
    descricao: 'Análise exegética e princípios de interpretação',
    icone: '🔍',
    link: '/exegese',
  },
  {
    titulo: 'Personagens',
    descricao: 'Biografías, genealogias e linha do tempo',
    icone: '👤',
    link: '/personagens',
  },
  {
    titulo: 'Ferramentas de Estudo',
    descricao: 'Dicionário, concordância, referências cruzadas',
    icone: '🛠️',
    link: '/ferramentas',
  },
];
