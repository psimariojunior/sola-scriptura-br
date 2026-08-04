'use client';

import Link from 'next/link';

const features = [
  {
    icon: '📖',
    title: 'Bíblia em 10 Traduções',
    description: 'ARC, ARA, ACF, KJV, NVI, WEB, NVT, KJA, AA, NBV — compare traduções lado a lado.',
  },
  {
    icon: '🔤',
    title: 'Léxico Grego e Hebraico',
    description: '5.526 palavras gregas + 8.674 hebraicas com Strong, morfologia e concordância.',
  },
  {
    icon: '🤖',
    title: 'IA para Estudo Bíblico',
    description: 'Exegese automática, modo socrático e respostas contextuais via Groq AI.',
  },
  {
    icon: '🗺️',
    title: 'Atlas Bíblico Interativo',
    description: '20 locais bíblicos com mapa OpenStreetMap e coordenadas geográficas.',
  },
  {
    icon: '🎵',
    title: 'Áudio com Karaoke',
    description: 'Edge TTS gratuito, sincronização versículo-a-versículo, pré-carregamento automático.',
  },
  {
    icon: '📊',
    title: 'Referências Cruzadas',
    description: '29.000+ referências TSK com visualização em árvore interativa.',
  },
  {
    icon: '🔍',
    title: 'Busca Semântica',
    description: '50 grupos de sinônimos bíblicos para encontrar versículos por conceito.',
  },
  {
    icon: '📱',
    title: 'PWA Offline',
    description: 'Funciona sem internet. Leia, estude e ouça em qualquer lugar.',
  },
  {
    icon: '🎯',
    title: 'Modo Imersivo',
    description: 'Leitura cinematográfica com narração automática e 5 temas visuais.',
  },
  {
    icon: '🧠',
    title: 'Modo Socrático',
    description: 'Estudo guiado por perguntas que estimulam o raciocínio bíblico.',
  },
  {
    icon: '🔥',
    title: 'Jornada Emocional',
    description: 'Heatmap emocional de 40 livros bíblicos com 6 emoções.',
  },
  {
    icon: '✨',
    title: '100% Gratuito',
    description: 'Sem anúncios, sem assinatura, sem limite de uso. Estudo bíblico para todos.',
  },
];

const comparisons = [
  { feature: 'Bíblia 10 traduções', logos: true, youversion: true, sola: true },
  { feature: 'Léxico hebraico 8.674', logos: '💰', youversion: 'Básico', sola: true },
  { feature: 'Léxico grego 5.526', logos: '💰', youversion: 'Básico', sola: true },
  { feature: 'Interlinear palavra-a-palavra', logos: '💰', youversion: false, sola: true },
  { feature: 'Criador de imagem social', logos: '💰', youversion: true, sola: true },
  { feature: 'Atlas bíblico interativo', logos: '💰', youversion: false, sola: true },
  { feature: 'Comentários inline (4.911)', logos: '💰', youversion: false, sola: true },
  { feature: 'Referências cruzadas visuais', logos: '💰', youversion: false, sola: true },
  { feature: 'Busca semântica', logos: '💰', youversion: false, sola: true },
  { feature: 'IA para estudo bíblico', logos: '💰', youversion: false, sola: true },
  { feature: 'Exegese automática', logos: false, youversion: false, sola: true },
  { feature: 'Modo imersivo', logos: false, youversion: false, sola: true },
  { feature: 'Modo socrático', logos: false, youversion: false, sola: true },
  { feature: '5 temas visuais', logos: false, youversion: false, sola: true },
  { feature: 'PWA offline', logos: 'App nativo', youversion: 'App nativo', sola: true },
  { feature: '100% gratuito', logos: '💰', youversion: '💰', sola: true },
];

const stats = [
  { value: '10', label: 'Traduções' },
  { value: '14.200', label: 'Palavras originais' },
  { value: '4.911', label: 'Comentários' },
  { value: '29.000', label: 'Referências cruzadas' },
  { value: '102', label: 'Páginas interativas' },
  { value: '0', label: 'Anúncios' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23]">
      {/* Hero */}
      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium">
            Estudo Bíblico Acadêmico com IA
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Sola Scriptura
            <span className="block text-amber-400">BR</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            A plataforma mais completa para estudo bíblico. 10 traduções, léxico original, IA, exegese automática — e 100% gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/biblia"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl text-lg hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
            >
              Começar Agora →
            </Link>
            <Link
              href="/socratico"
              className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl text-lg hover:bg-white/5 transition-all"
            >
              Experimentar Modo Socrático
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-16 border-y border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400">{stat.value}</div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Tudo que você precisa</h2>
          <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">
            Ferramentas profissionais que outros apps cobram — aqui é gratuito.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-24 border-y border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Por que Sola Scriptura?</h2>
          <p className="text-white/60 text-center mb-12">Comparação com os apps mais populares</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/70 font-medium">Feature</th>
                  <th className="py-3 px-4 text-white/50 font-medium">Logos</th>
                  <th className="py-3 px-4 text-white/50 font-medium">YouVersion</th>
                  <th className="py-3 px-4 text-amber-400 font-medium">Sola Scriptura</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c) => (
                  <tr key={c.feature} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-white/80">{c.feature}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={c.logos === true ? 'text-green-400' : 'text-white/40'}>
                        {c.logos === true ? '✓' : c.logos === false ? '✗' : c.logos}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={c.youversion === true ? 'text-green-400' : 'text-white/40'}>
                        {c.youversion === true ? '✓' : c.youversion === false ? '✗' : c.youversion}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={c.sola === true ? 'text-amber-400 font-bold' : 'text-white/40'}>
                        {c.sola === true ? '✓' : c.sola === false ? '✗' : c.sola}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Comece hoje</h2>
          <p className="text-xl text-white/60 mb-10">
            Junte-se a milhares de pessoas que estudam a Bíblia de forma mais profunda.
          </p>
          <Link
            href="/biblia"
            className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl text-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
          >
            Abrir Bíblia →
          </Link>
          <p className="text-white/40 text-sm mt-6">Não precisa de cadastro. Comece a ler agora.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10 text-center">
        <p className="text-white/40 text-sm">
          Sola Scriptura BR — Estudo Bíblico Acadêmico Gratuito
        </p>
        <p className="text-white/30 text-xs mt-2">
          © {new Date().getFullYear()} Sola Scriptura. Feito com ❤️ para a glória de Deus.
        </p>
      </footer>
    </div>
  );
}
