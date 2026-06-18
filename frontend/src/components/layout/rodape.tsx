export function Rodapé() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl font-semibold text-foreground mb-3">
              Sola Scriptura
            </h3>
            <p className="font-serif-body text-muted-foreground text-base leading-relaxed max-w-md">
              Cinco solas. Tradição reformada. Tecnologia a serviço da Palavra.
              Um instrumento para o estudo rigoroso das Escrituras Sagradas.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Estudos
            </h4>
            <ul className="space-y-2">
              {['Bíblia', 'Grego & Hebraico', 'Teologia Sistemática', 'Exegese'].map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">
              Recursos
            </hh>
            <ul className="space-y-2">
              {['Atlas Bíblico', 'Cronologia', 'Arqueologia', 'Personagens'].map((i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ornamento mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground tracking-wide">
            © {new Date().getFullYear()} Sola Scriptura BR — Soli Deo Gloria
          </p>
          <p className="font-display italic text-sm text-muted-foreground">
            &laquo;A fé vem pela audição, e a audição pela palavra de Cristo&raquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
