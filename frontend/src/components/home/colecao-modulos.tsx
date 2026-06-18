import Link from 'next/link';

const modulos = [
  {
    categoria: 'Texto Sagrado',
    itens: [
      { titulo: 'Bíblia', desc: 'Leitura com múltiplas traduções em paralelo, navegação fluida por livros e capítulos.', href: '/biblia', icone: 'I' },
      { titulo: 'Línguas Originais', desc: 'Grego Koiné e Hebraico Bíblico com Strong, léxicos BDAG, BDB, HALOT e análise morfológica.', href: '/idiomas', icone: 'Ω' },
      { titulo: 'Traduções Paralelas', desc: 'NVI, ARA, ACF, NTLH, KJV e Reina-Valera lado a lado para comparação textual.', href: '/biblia', icone: '≡' },
    ],
  },
  {
    categoria: 'Interpretação',
    itens: [
      { titulo: 'Exegese', desc: 'Contexto imediato, do capítulo, do livro, do testamento e canônico. Estrutura literária e análise sintática.', href: '/exegese', icone: 'Σ' },
      { titulo: 'Hermenêutica', desc: 'Identificação de gênero literário — narrativa, profecia, poesia, sabedoria, epístola, apocalíptica.', href: '/hermeneutica', icone: 'Φ' },
      { titulo: 'Teologia Sistemática', desc: 'Bibliologia, Cristologia, Soteriologia, Escatologia. Perspectivas arminiana, reformada, batista, pentecostal.', href: '/teologia', icone: 'Θ' },
    ],
  },
  {
    categoria: 'Contexto',
    itens: [
      { titulo: 'História Bíblica', desc: 'Autoria, datas, contexto político, religioso e econômico. Impérios e governantes envolvidos.', href: '/historia', icone: 'Χ' },
      { titulo: 'Geografia & Atlas', desc: 'Mapas interativos com coordenadas de cidades, regiões, rotas missionárias e do êxodo.', href: '/historia', icone: 'Π' },
      { titulo: 'Arqueologia', desc: 'Artefatos, inscrições, manuscritos e evidências históricas que corroboram o texto sagrado.', href: '/historia', icone: 'Α' },
    ],
  },
  {
    categoria: 'Ferramentas',
    itens: [
      { titulo: 'Referências Cruzadas', desc: 'Passagens paralelas, profecias e cumprimentos, citações e alusões em grafo visual.', href: '/biblia', icone: '⇄' },
      { titulo: 'Cronologia', desc: 'Linha do tempo de patriarcas, juízes, reis, profetas, Cristo e a igreja primitiva.', href: '/cronologia', icone: '◷' },
      { titulo: 'IA Especialista', desc: 'Assistente com RAG alimentado por léxicos, comentários e biblioteca teológica.', href: '/ia', icone: '✦' },
    ],
  },
];

export function ColecaoModulos() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground mb-4">
            A Plataforma
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Um instrumento completo para o estudo das Escrituras
          </h2>
        </div>

        <div className="space-y-20">
          {modulos.map((secao) => (
            <div key={secao.categoria}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display text-2xl font-medium text-primary whitespace-nowrap">
                  {secao.categoria}
                </h3>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/40 border border-border/40">
                {secao.itens.map((item) => (
                  <Link
                    key={item.titulo}
                    href={item.href}
                    className="group bg-card p-8 hover:bg-secondary/50 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-display text-3xl text-primary/70 group-hover:text-primary transition-colors leading-none mt-1">
                        {item.icone}
                      </span>
                      <div>
                        <h4 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {item.titulo}
                        </h4>
                        <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
