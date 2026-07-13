'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Users, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export default function QuizMultiplayerPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/quiz" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Quiz
          </Link>

          <ScrollReveal>
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-4xl font-light mb-4">
                Quiz <span className="text-primary italic">Multiplayer</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                Desafie seus amigos em tempo real! Crie uma sala, compartilhe o código e competem quem sabe mais sobre a Bíblia.
              </p>

              <div className="glass-card p-8 rounded-2xl max-w-sm mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-lg font-medium">Em breve</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estamos trabalhando nessa funcionalidade. Em breve você poderá jogar com seus amigos!
                </p>
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href="/quiz/classico"
                  className="block w-full max-w-xs mx-auto py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all"
                >
                  Quiz Clássico
                </Link>
                <Link
                  href="/quiz/livro"
                  className="block w-full max-w-xs mx-auto py-3 border border-border rounded-xl font-medium hover:bg-muted/50 transition-all"
                >
                  Quiz por Livro
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
