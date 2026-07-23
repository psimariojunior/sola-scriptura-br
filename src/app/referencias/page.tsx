'use client';

import { useState, useMemo, useCallback } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { GitBranch, Search, X, ChevronRight, Layers } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import { cn } from '@/lib/utils';
import { crossReferencesMap } from '@/data/biblia/crossReferences';

interface ChainNode {
  ref: string;
  children: string[];
  depth: number;
}

// Build a simple lookup from the crossReferencesMap
const allRefs = Object.keys(crossReferencesMap);

function getRefsForVerse(ref: string): string[] {
  const refs = crossReferencesMap[ref] || [];
  return refs.map(r => r.to);
}

export default function CadeiaRefPage() {
  const [searchRef, setSearchRef] = useState('');
  const [chain, setChain] = useState<ChainNode[]>([]);
  const [maxDepth, setMaxDepth] = useState(3);

  const suggestions = useMemo(() => {
    if (!searchRef || searchRef.length < 2) return [];
    const termo = searchRef.toLowerCase();
    return allRefs.filter(r => r.toLowerCase().includes(termo)).slice(0, 10);
  }, [searchRef]);

  const buildChain = useCallback((startRef: string, depth: number = 0): ChainNode => {
    const refs = getRefsForVerse(startRef);
    return { ref: startRef, children: refs.slice(0, 5), depth };
  }, []);

  const startChain = useCallback((ref: string) => {
    const root = buildChain(ref, 0);
    const chainNodes: ChainNode[] = [root];

    let currentLevel = [ref];
    for (let d = 1; d < maxDepth; d++) {
      const nextLevel: string[] = [];
      for (const r of currentLevel) {
        const refs = getRefsForVerse(r);
        for (const child of refs.slice(0, 3)) {
          if (!chainNodes.find(n => n.ref === child)) {
            chainNodes.push(buildChain(child, d));
            nextLevel.push(child);
          }
        }
      }
      currentLevel = nextLevel;
    }

    setChain(chainNodes);
    setSearchRef(ref);
  }, [buildChain, maxDepth]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center border border-indigo-500/20">
                <GitBranch className="w-10 h-10 text-indigo-500" />
              </div>
              <h1 className="font-display text-4xl font-light mb-3">Cadeia de <span className="text-primary italic">Referências</span></h1>
              <p className="text-muted-foreground max-w-lg mx-auto">
            {allRefs.length.toLocaleString()} referências cruzadas TSK — siga fios teológicos entre versículos
          </p>
            </div>
          </ScrollReveal>

          <div className="max-w-lg mx-auto mb-8">
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" value={searchRef} onChange={e => setSearchRef(e.target.value)}
                placeholder="Digite uma referência (ex: Gn 1:1, Jo 3:16)..."
                className="w-full pl-11 pr-10 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
              {searchRef && <button onClick={() => { setSearchRef(''); setChain([]); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50">
                <X className="w-4 h-4" /></button>}
            </div>

            {suggestions.length > 0 && chain.length === 0 && (
              <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
                {suggestions.map(s => (
                  <button key={s} onClick={() => startChain(s)}
                    className="w-full text-left px-4 py-2.5 hover:bg-muted/50 transition-colors text-sm border-b border-border/50 last:border-0">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <label className="text-xs text-muted-foreground">Profundidade:</label>
              <div className="flex gap-1">
                {[2, 3, 4, 5].map(d => (
                  <button key={d} onClick={() => setMaxDepth(d)}
                    className={cn('w-7 h-7 rounded-lg text-xs font-medium',
                      maxDepth === d ? 'bg-primary text-primary-foreground' : 'border border-border')}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {chain.length > 0 && (
            <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
              <h2 className="font-display text-lg font-medium mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Cadeia de Referências
              </h2>
              <div className="space-y-3">
                {chain.filter(n => n.depth === 0).map(node => (
                  <ChainNodeComponent key={node.ref} node={node} chain={chain} depth={0} maxDepth={maxDepth} onSelect={startChain} />
                ))}
              </div>
            </div>
          )}

          {chain.length === 0 && (
            <div className="text-center py-12">
              <GitBranch className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-sm">Digite uma referência bíblica para explorar suas conexões</p>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {['Jo 3:16', 'Rm 8:28', 'Sl 23:1', 'Ef 2:8', 'Fp 4:13', 'Gn 1:1'].map(ref => {
                  if (allRefs.includes(ref)) {
                    return (
                      <button key={ref} onClick={() => startChain(ref)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border hover:bg-muted/50 transition-all">
                        {ref}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ChainNodeComponent({ node, chain, depth, maxDepth, onSelect }: {
  node: ChainNode; chain: ChainNode[]; depth: number; maxDepth: number; onSelect: (ref: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const children = chain.filter(n => node.children.includes(n.ref));

  return (
    <div className={cn('pl-4', depth > 0 && 'border-l-2 border-primary/20 ml-2')}>
      <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
        depth === 0 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-muted/30')}>
        <button onClick={() => onSelect(node.ref)}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
          {depth > 0 && <ChevronRight className="w-3 h-3" />}
          {node.ref}
        </button>
        {children.length > 0 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-muted-foreground ml-auto">
            {expanded ? '−' : '+'} {children.length}
          </button>
        )}
      </div>
      {expanded && children.length > 0 && depth < maxDepth && (
        <div className="mt-1 space-y-1">
          {children.map(child => (
            <ChainNodeComponent key={child.ref} node={child} chain={chain} depth={depth + 1} maxDepth={maxDepth} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  );
}
