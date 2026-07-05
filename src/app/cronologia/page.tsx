'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cronologia } from '@/data/biblia';

const tipoCores: Record<string, string> = {
  criacao: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  patriarca: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  lei: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  reis: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  profeta: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  exilio: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  vinda: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  igreja: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
};

const tipoLabels: Record<string, string> = {
  criacao: 'Criação',
  patriarca: 'Patriarcas',
  lei: 'Lei',
  reis: 'Reis',
  profeta: 'Profetas',
  exilio: 'Exílio',
  vinda: 'Vinda de Cristo',
  igreja: 'Igreja Primitiva',
};

export default function CronologiaPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-light mb-2">Cronologia Bíblica</h1>
            <p className="text-muted-foreground">Linha do tempo da criação à igreja primitiva</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {cronologia.map((evento, i) => (
                <div key={i} className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="sola-card p-5">
                      <div className={`flex items-center gap-2 mb-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tipoCores[evento.tipo]}`}>
                          {tipoLabels[evento.tipo]}
                        </span>
                      </div>
                      <p className="font-mono text-sm text-primary mb-1">{evento.ano}</p>
                      <h3 className="font-semibold mb-1">{evento.evento}</h3>
                      <p className="text-xs text-muted-foreground">{evento.referencia}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
