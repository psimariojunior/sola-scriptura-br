'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { personagens } from '@/data/biblia';
import { Users } from 'lucide-react';

export default function PersonagensPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Personagens Bíblicos</h1>
            <p className="text-muted-foreground">Biografias, significados dos nomes e contribuições</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personagens.map((p) => (
              <div key={p.nome} className="sola-card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{p.nome}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      p.testamento === 'AT' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {p.testamento}
                    </span>
                  </div>
                </div>

                {(p.nomeHebraico || p.nomeGrego) && (
                  <p className="text-sm text-muted-foreground italic mb-1">
                    {p.nomeHebraico || p.nomeGrego}
                  </p>
                )}
                <p className="text-xs text-primary font-medium mb-3">Significado: {p.significado}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{p.resumo}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
