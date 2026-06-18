export function Lantejoulas() {
  const dados = [
    { numero: '66', rotulo: 'Livros' },
    { numero: '31.102', rotulo: 'Versículos' },
    { numero: '5.624', rotulo: 'Palavras Gregas (Strong)' },
    { numero: '8.674', rotulo: 'Palavras Hebraicas (Strong)' },
  ];

  return (
    <section className="border-y border-border/40 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {dados.map((d) => (
            <div key={d.rotulo} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-light text-primary">
                {d.numero}
              </p>
              <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
                {d.rotulo}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
