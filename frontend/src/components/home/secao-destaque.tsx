import Link from 'next/link';

export function SecaoDestaque() {
  return (
    <section className="py-32 px-6 bg-secondary/20 border-y border-border/40">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display italic text-5xl md:text-7xl font-light text-foreground leading-tight mb-8">
          &laquo;Toda a Escritura é divinamente inspirada<br />
          e proveitosa para ensinar&raquo;
        </p>
        <p className="text-sm tracking-widest uppercase text-muted-foreground mb-16">
          2 Timóteo 3:16
        </p>

        <div className="ornamento w-32 mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div>
            <span className="font-display text-5xl text-primary/60 block mb-3">01</span>
            <h4 className="font-display text-xl font-semibold mb-2">Central de Estudos</h4>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
              Clique em qualquer palavra, versículo, nome ou cidade da Bíblia e
              abra uma central completa com Strong, léxico, exegese, teologia e história.
            </p>
          </div>

          <div>
            <span className="font-display text-5xl text-primary/60 block mb-3">02</span>
            <h4 className="font-display text-xl font-semibold mb-2">RAG + Knowledge Graph</h4>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
              A IA não responde apenas com o modelo — ela busca em léxicos, comentários
              e bibliotecas teológicas indexadas, sempre citando fontes.
            </p>
          </div>

          <div>
            <span className="font-display text-5xl text-primary/60 block mb-3">03</span>
            <h4 className="font-display text-xl font-semibold mb-2">Modo Offline</h4>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">
              Bíblia, notas e favoritos disponíveis sem conexão. Sincronização
              automática quando a internet retorna.
            </p>
          </div>
        </div>

        <Link
          href="/biblia"
          className="inline-block mt-16 font-display text-lg text-primary border-b border-primary/40 hover:border-primary transition-colors pb-1"
        >
          Comece a estudar agora →
        </Link>
      </div>
    </section>
  );
}
