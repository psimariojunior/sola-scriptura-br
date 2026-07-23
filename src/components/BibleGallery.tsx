'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, X, ChevronLeft, ChevronRight, Share2, Download, Heart, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface GalleryArt {
  id: string;
  title: string;
  artist: string;
  year: string;
  period: string;
  description: string;
  tags: string[];
  imageUrl: string;
  verseRef: string;
}

const BIBLE_ART: GalleryArt[] = [
  { id: 'a1', title: 'A Criação de Adão', artist: 'Michelangelo', year: '1508-1512', period: 'Renascimento',
    description: 'Parte do teto da Capela Sistina, mostrando Deus dando vida a Adão.',
    tags: ['Criação', 'Gênesis', 'Gênesis 1:27'], imageUrl: '/art/creation-of-adam.jpg', verseRef: 'Gênesis 1:27' },
  { id: 'a2', title: 'A Última Ceia', artist: 'Leonardo da Vinci', year: '1495-1498', period: 'Renascimento',
    description: 'A cena da última refeição de Jesus com seus discípulos.',
    tags: ['Eucaristia', 'Mateus', 'Mateus 26:26'], imageUrl: '/art/last-supper.jpg', verseRef: 'Mateus 26:26' },
  { id: 'a3', title: 'Moisés e as Tábuas da Lei', artist: 'Rembrandt', year: '1659', period: 'Barroco',
    description: 'Moisés segurando as tábuas dos Dez Mandamentos.',
    tags: ['Lei', 'Êxodo', 'Êxodo 20:1'], imageUrl: '/art/moses-tablets.jpg', verseRef: 'Êxodo 20:1' },
  { id: 'a4', title: 'A Vitória de Judite', artist: 'Caravaggio', year: '1598-1599', period: 'Barroco',
    description: 'Judite derrotando Holofernes para salvar seu povo.',
    tags: ['Judite', 'Coragem', 'Judite 13:8'], imageUrl: '/art/judith.jpg', verseRef: 'Judite 13:8' },
  { id: 'a5', title: 'Noé e a Arca', artist: 'Edward Hicks', year: '1846', period: 'Arte Popular',
    description: 'Noé levando os animais para a arca antes do dilúvio.',
    tags: ['Dilúvio', 'Gênesis', 'Gênesis 6:14'], imageUrl: '/art/noahs-ark.jpg', verseRef: 'Gênesis 6:14' },
  { id: 'a6', title: 'Davi e Golias', artist: 'Caravaggio', year: '1599-1600', period: 'Barroco',
    description: 'O jovem Davi derrotando o gigante Golias com uma funda.',
    tags: ['Davi', 'Golias', '1 Samuel 17:49'], imageUrl: '/art/david-goliath.jpg', verseRef: '1 Samuel 17:49' },
  { id: 'a7', title: 'A Anunciação', artist: 'Fra Angelico', year: '1440-1450', period: 'Renascimento',
    description: 'O arcanjo Gabriel anunciando a Maria que ela conceberá Jesus.',
    tags: ['Anunciação', 'Lucas', 'Lucas 1:28'], imageUrl: '/art/annunciation.jpg', verseRef: 'Lucas 1:28' },
  { id: 'a8', title: 'A Ressurreição', artist: 'Rafael', year: '1515-1516', period: 'Renascimento',
    description: 'Jesus ressuscitando dos mortos, vencendo a morte.',
    tags: ['Ressurreição', 'Mateus', 'Mateus 28:6'], imageUrl: '/art/resurrection.jpg', verseRef: 'Mateus 28:6' },
];

export function BibleGallery() {
  const [selectedArt, setSelectedArt] = useState<GalleryArt | null>(null);
  const [filter, setFilter] = useState<string>('Todos');
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const tags = ['Todos', ...new Set(BIBLE_ART.flatMap(a => a.tags))];
  const filtered = filter === 'Todos' ? BIBLE_ART : BIBLE_ART.filter(a => a.tags.includes(filter));

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-[var(--border)]/40">
        <div className="flex items-center gap-2 mb-1">
          <ImageIcon className="w-5 h-5 text-[var(--brand)]" />
          <h2 className="font-bold text-lg">Galeria de Arte Bíblica</h2>
        </div>
        <p className="text-xs text-[var(--content-muted)]">Obras-primas que retratam cenas bíblicas ao longo da história.</p>
      </div>

      {/* Tags */}
      <div className="flex gap-1.5 p-3 overflow-x-auto">
        {tags.map(tag => (
          <button key={tag} onClick={() => setFilter(tag)}
            className={cn('px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all',
              filter === tag ? 'bg-[var(--brand)] text-white' : 'bg-[var(--surface-raised)] text-[var(--content-muted)] hover:bg-[var(--surface-sunken)]')}>
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-2 p-3">
          {filtered.map((art, idx) => (
            <motion.button key={art.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedArt(art)}
              className="rounded-xl overflow-hidden bg-[var(--surface-raised)] border border-[var(--border)]/40 text-left hover:border-[var(--brand)]/50 transition-all group">
              <div className="aspect-[4/3] bg-gradient-to-br from-[var(--brand)]/10 to-[var(--brand)]/5 flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-[var(--content-muted)]/20" />
              </div>
              <div className="p-2">
                <div className="text-xs font-bold truncate">{art.title}</div>
                <div className="text-[10px] text-[var(--content-muted)] truncate">{art.artist}, {art.year}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </ScrollArea>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedArt && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-[var(--surface-base)] rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[var(--brand)]/10 to-[var(--brand)]/5 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-[var(--content-muted)]/20" />
                <button onClick={() => setSelectedArt(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{selectedArt.title}</h3>
                <p className="text-sm text-[var(--brand)]">{selectedArt.artist} — {selectedArt.year}</p>
                <p className="text-xs text-[var(--content-muted)] mt-1 mb-3">{selectedArt.description}</p>
                <div className="rounded-lg bg-[var(--brand)]/5 border border-[var(--brand)]/20 p-3 mb-3">
                  <p className="text-xs text-[var(--brand)] font-medium">{selectedArt.verseRef}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toggleLike(selectedArt.id)}
                    className={cn('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-all',
                      liked.has(selectedArt.id) ? 'bg-red-500/10 text-red-500' : 'bg-[var(--surface-raised)] text-[var(--content-muted)]')}>
                    <Heart className={cn('w-3.5 h-3.5', liked.has(selectedArt.id) && 'fill-current')} /> Favoritar
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--surface-raised)] text-[var(--content-muted)] text-xs font-medium">
                    <Share2 className="w-3.5 h-3.5" /> Compartilhar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
