'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { doutrinas } from '@/data/biblia';

export default function TeologiaPage() {
  const categorias = [...new Set(doutrinas.map((d) => d.categoria))];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Teologia Sistemática</h1>
            <p className="text-muted-foreground">Doutrinas fundamentais da fé cristã bíblica</p>
          </div>

          {categorias.map((cat) => (
            <div key={cat} className="mb-12">
              <h2 className="font-display text-2xl font-light mb-6 text-primary">{cat}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doutrinas.filter((d) => d.categoria === cat).map((d) => (
                  <div key={d.slug} className="sola-card p-6">
                    <h3 className="font-semibold text-lg mb-3">{d.nome}</h3>
                    <p className="font-serif-body text-sm leading-relaxed text-foreground/80 mb-4">{d.definicao}</p>
                    <div className="flex flex-wrap gap-2">
                      {d.passagens.map((ref) => (
                        <span key={ref} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm">{ref}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Traditions */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-light mb-6 text-primary">Tradições Teológicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Reformada</h3>
                <p className="text-sm text-muted-foreground">Sola Gratia, Sola Fide, Sola Scriptura, Solus Christus, Soli Deo Gloria. Soberania de Deus na salvação.</p>
              </div>
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Arminiana</h3>
                <p className="text-sm text-muted-foreground">Liberdade humana, graça resistível, previsão condicional. Destaque para a responsabilidade humana.</p>
              </div>
              <div className="sola-card p-6">
                <h3 className="font-semibold mb-2">Batista</h3>
                <p className="text-sm text-muted-foreground">Autoridade da Escritura, regeneração pessoal, credismo, separação igreja/estado.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
