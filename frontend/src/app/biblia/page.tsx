'use client';

import { useState } from 'react';
import { MainNav } from '@/components/layout/main-nav';

export default function BibliaPage() {
  const [livroSlug, setLivroSlug] = useState<string>('');
  const [capitulo, setCapitulo] = useState<number>(1);

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-card rounded-xl p-4 shadow-sm border">
              <h2 className="font-semibold mb-3">Livros</h2>
              <div className="space-y-1">
                {livros.map((livro) => (
                  <button
                    key={livro.slug}
                    onClick={() => setLivroSlug(livro.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      livroSlug === livro.slug
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {livro.nome}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl p-6 shadow-sm border min-h-[60vh]">
              <div className="text-center text-gray-500 mt-20">
                <h3 className="text-2xl font-semibold mb-2">
                  Selecione um livro
                </h3>
                <p>
                  Escolha um livro na barra lateral para começar a ler
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const livros = [
  { nome: 'Gênesis', slug: 'genesis' },
  { nome: 'Êxodo', slug: 'exodo' },
  { nome: 'Levítico', slug: 'levitico' },
  { nome: 'Números', slug: 'numeros' },
  { nome: 'Deuteronômio', slug: 'deuteronomio' },
  { nome: 'Josué', slug: 'josue' },
  { nome: 'Juízes', slug: 'juizes' },
  { nome: 'Rute', slug: 'rute' },
  { nome: '1 Samuel', slug: '1-samuel' },
  { nome: '2 Samuel', slug: '2-samuel' },
  { nome: 'Mateus', slug: 'mateus' },
  { nome: 'Marcos', slug: 'marcos' },
  { nome: 'Lucas', slug: 'lucas' },
  { nome: 'João', slug: 'joao' },
  { nome: 'Atos', slug: 'atos' },
  { nome: 'Romanos', slug: 'romanos' },
];
