import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description:
    'Conheça a missão, a metodologia e a declaração doutrinária do Sola Scriptura BR — estudo bíblico com fidelidade ao texto original.',
  alternates: { canonical: 'https://solascripturabr.com.br/sobre' },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero */}
        <section className="mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[var(--content-primary)] mb-6">
            Sobre o Sola Scriptura
          </h1>
          <p className="text-lg text-[var(--content-secondary)] leading-relaxed">
            Uma iniciativa brasileira para estudar as Escrituras com fidelidade ao texto original,
            usando tecnologia a serviço da Palavra — sem barreiras financeiras, sem anúncios
            intrusivos, sem a necessidade de formação acadêmica prévia.
          </p>
        </section>

        {/* Missão */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-4">
            Nossa Missão
          </h2>
          <p className="text-[var(--content-secondary)] leading-relaxed mb-4">
            Tornar o estudo das Escrituras com fidelidade ao texto original acessível a todo
            cristão que deseja compreender a Palavra com o cuidado que ela merece — sem
            barreiras financeiras, sem anúncios intrusivos, sem a necessidade de formação
            acadêmica prévia.
          </p>
          <p className="text-[var(--content-secondary)] leading-relaxed">
            Acreditamos que a Palavra de Deus merece ser estudada com o melhor que a
            tecnologia e a tradição teológica podem oferecer. Por isso, reunimos ferramentas
            que honram a riqueza do texto bíblico.
          </p>
        </section>

        {/* O que oferecemos */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-4">
            Recursos para o Estudo
          </h2>
          <ul className="space-y-3 text-[var(--content-secondary)]">
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Bíblia em 10 traduções</strong> — ARC, ARA, ACF, NVI, KJV, WEB e mais, com comparação lado a lado.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Léxico original</strong> — 8.674 palavras hebraicas e 5.526 gregas com Strong&apos;s, morfologia e definição.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Exegese em 12 dimensões</strong> — análise textual, histórica, literária, teológica, gramatical, arqueológica, geográfica, canônica, pastoral, comparativa, contextual e síntese.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Teologia sistemática</strong> — 91 doutrinas em 13 categorias, apresentando posições Reformada, Arminiana e Batista.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Biblioteca de clássicos</strong> — 41 obras-primas da teologia cristã, do século I ao século XX, com fichas históricas.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Atlas bíblico</strong> — 158 locais e 21 rotas em mapa interativo.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>4.911 comentários</strong> de teólogos clássicos consolidados em português.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">•</span>
              <span><strong>Inteligência artificial</strong> — exegese automática, busca semântica e assistente teológico.</span>
            </li>
          </ul>
        </section>

        {/* Declaração Doutrinária */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-4">
            Declaração Doutrinária
          </h2>
          <div className="rounded-2xl bg-[var(--surface-raised)] border border-[var(--border)]/50 p-6 sm:p-8">
            <p className="text-[var(--content-secondary)] leading-relaxed mb-4">
              O Sola Scriptura BR é uma plataforma protestante que se fundamenta na Escritura
              Sagrada como a única autoridade infalível para fé e prática. Seguimos a tradição
              reformada do <em>Sola Scriptura</em>, reconhecendo que a Bíblia é suficiente, clara
              e o juiz final de toda doutrina.
            </p>
            <p className="text-[var(--content-secondary)] leading-relaxed mb-4">
              Ao mesmo tempo, buscamos honestidade intelectual ao apresentar diferentes posições
              teológicas relevantes. Na Teologia Sistemática, indicamos claramente as tradições
              Reformada, Arminiana e Batista, sem impor uma como a única legítima.
            </p>
            <p className="text-[var(--content-secondary)] leading-relaxed">
              A Inteligência Artificial é uma ferramenta complementar ao estudo — auxilia com
              análise, referências e contexto, mas não substitui a leitura pessoal das Escrituras,
              a oração, a comunhão da igreja e o julgamento maduro do crente.
            </p>
          </div>
        </section>

        {/* Metodologia */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-4">
            Metodologia
          </h2>
          <p className="text-[var(--content-secondary)] leading-relaxed mb-4">
            Todo o conteúdo do Sola Scriptura BR segue estes princípios:
          </p>
          <ul className="space-y-3 text-[var(--content-secondary)]">
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">1.</span>
              <span><strong>Fundamento bíblico</strong> — cada afirmação teológica é acompanhada de referências bíblicas diretas.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">2.</span>
              <span><strong>Transparência da IA</strong> — quando a IA gera uma análise, indicamos quais fontes foram consultadas e quando algo é interpretação vs. consenso histórico.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">3.</span>
              <span><strong>Fontes acadêmicas</strong> — os comentários e estudos são baseados em teólogos reconhecidos pela igreja ao longo dos séculos.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">4.</span>
              <span><strong>Pluralidade de vozes</strong> — apresentamos diferentes tradições teológicas quando há divergência legítima entre cristãos fiéis.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--brand-default)] mt-1">5.</span>
              <span><strong>Acessibilidade</strong> — todo conteúdo é gratuito, responsivo e funciona offline.</span>
            </li>
          </ul>
        </section>

        {/* Contato */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[var(--content-primary)] mb-4">
            Contato
          </h2>
          <p className="text-[var(--content-secondary)] leading-relaxed mb-4">
            Dúvidas, sugestões ou contribuições? Entre em contato:
          </p>
          <p className="text-[var(--content-secondary)]">
            <strong>Email:</strong>{' '}
            <a
              href="mailto:contato@solascripturabr.com.br"
              className="text-[var(--brand-default)] hover:underline"
            >
              contato@solascripturabr.com.br
            </a>
          </p>
        </section>

        {/* Links */}
        <section className="flex flex-wrap gap-4 text-sm">
          <Link href="/privacidade" className="text-[var(--brand-default)] hover:underline">
            Política de Privacidade
          </Link>
          <Link href="/ofertas" className="text-[var(--brand-default)] hover:underline">
            Ofertas
          </Link>
          <a
            href="https://github.com/psimariojunior/sola-scriptura-br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand-default)] hover:underline"
          >
            Código-fonte (GitHub)
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
