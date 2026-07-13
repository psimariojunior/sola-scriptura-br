'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bold, Italic, Underline, Strikethrough, Heading1, Heading2,
  List, ListOrdered, Quote, Code, Link2, Image, Tag,
  Save, Clock, Download, Trash2, Plus, X, Check,
} from 'lucide-react';
import { ExportModal } from '@/components/ExportModal';
import type { ConteudoExport } from '@/lib/exportPdf';
import { useToast } from '@/hooks/useToast';

export interface Nota {
  id: string;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
  dataAtualizacao: string;
  tags: string[];
  imagens: string[];
  versoes: { conteudo: string; data: string }[];
}

interface NotaEditorProps {
  nota?: Nota;
  onSalvar?: (nota: Nota) => void;
  onExcluir?: (id: string) => void;
  autoSalvar?: boolean;
}

const TAGS_SUGERIDAS = [
  'Estudo', 'Oração', 'Devocional', 'Doutrina', 'Histórico',
  'Pregação', 'Pessoal', 'Reflexão', 'Pesquisa', 'Aula',
];

export function NotaEditor({
  nota: notaInicial,
  onSalvar,
  onExcluir,
  autoSalvar = true,
}: NotaEditorProps) {
  const [nota, setNota] = useState<Nota>(
    notaInicial || {
      id: crypto.randomUUID(),
      titulo: '',
      conteudo: '',
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      tags: [],
      imagens: [],
      versoes: [],
    }
  );
  const [salvando, setSalvando] = useState(false);
  const [ultimoSalvamento, setUltimoSalvamento] = useState<string | null>(null);
  const [mostrarTags, setMostrarTags] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [exportAberto, setExportAberto] = useState(false);
  const [editando, setEditando] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const autoSalvarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (notaInicial) setNota(notaInicial);
  }, [notaInicial]);

  const salvar = useCallback(() => {
    setSalvando(true);
    const agora = new Date().toISOString();

    const notaSalva: Nota = {
      ...nota,
      dataAtualizacao: agora,
      versoes: [
        ...nota.versoes.slice(-19),
        { conteudo: nota.conteudo, data: agora },
      ],
    };

    setNota(notaSalva);
    setUltimoSalvamento(new Date().toLocaleTimeString('pt-BR'));
    setSalvando(false);
    setEditando(false);

    try {
      const storage = localStorage.getItem('sola-notas');
      const notas: Nota[] = storage ? JSON.parse(storage) : [];
      const idx = notas.findIndex(n => n.id === notaSalva.id);
      if (idx >= 0) notas[idx] = notaSalva;
      else notas.push(notaSalva);
      localStorage.setItem('sola-notas', JSON.stringify(notas));
      toast({ title: 'Anotação salva', variant: 'success' });
    } catch {
      toast({ title: 'Erro ao salvar', variant: 'error' });
    }

    onSalvar?.(notaSalva);
  }, [nota, onSalvar]);

  useEffect(() => {
    if (!autoSalvar || !editando) return;
    if (autoSalvarTimer.current) clearTimeout(autoSalvarTimer.current);
    autoSalvarTimer.current = setTimeout(salvar, 3000);
    return () => {
      if (autoSalvarTimer.current) clearTimeout(autoSalvarTimer.current);
    };
  }, [nota.conteudo, autoSalvar, editando, salvar]);

  const executarComando = useCallback((comando: string, valor?: string) => {
    document.execCommand(comando, false, valor);
    editorRef.current?.focus();
    setEditando(true);
  }, []);

  const inserirLink = useCallback(() => {
    const url = prompt('URL do link:');
    if (url) executarComando('createLink', url);
  }, [executarComando]);

  const inserirImagem = useCallback(() => {
    const url = prompt('URL da imagem:');
    if (url) executarComando('insertImage', url);
  }, [executarComando]);

  const adicionarTag = useCallback((tag: string) => {
    const t = tag.trim();
    if (t && !nota.tags.includes(t)) {
      setNota(n => ({ ...n, tags: [...n.tags, t] }));
      setEditando(true);
    }
    setTagInput('');
  }, [nota.tags]);

  const removerTag = useCallback((tag: string) => {
    setNota(n => ({ ...n, tags: n.tags.filter(t => t !== tag) }));
    setEditando(true);
  }, []);

  const restaurarVersao = useCallback((idx: number) => {
    const verso = nota.versoes[idx];
    if (verso && confirm('Restaurar esta versão? O conteúdo atual será substituído.')) {
      setNota(n => ({ ...n, conteudo: verso.conteudo }));
      setEditando(true);
      setMostrarHistorico(false);
    }
  }, [nota.versoes]);

  const excluir = useCallback(() => {
    if (confirm('Tem certeza que deseja excluir esta nota?')) {
      onExcluir?.(nota.id);
    }
  }, [nota.id, onExcluir]);

  const handleEditorInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setNota(n => ({ ...n, conteudo: html }));
      setEditando(true);
    }
  }, []);

  const conteudoExport: ConteudoExport[] = [{
    tipo: 'nota',
    titulo: nota.titulo || 'Anotação',
    conteudo: editorRef.current?.innerText || nota.conteudo.replace(/<[^>]*>/g, ''),
  }];

  const BOTOES_FORMATACAO: { cmd: string; val?: string; icon: typeof Bold; label: string }[] = [
    { cmd: 'bold', icon: Bold, label: 'Negrito' },
    { cmd: 'italic', icon: Italic, label: 'Itálico' },
    { cmd: 'underline', icon: Underline, label: 'Sublinhado' },
    { cmd: 'strikeThrough', icon: Strikethrough, label: 'Tachado' },
    { cmd: 'formatBlock', val: 'h2', icon: Heading1, label: 'Título' },
    { cmd: 'formatBlock', val: 'h3', icon: Heading2, label: 'Subtítulo' },
    { cmd: 'insertUnorderedList', icon: List, label: 'Lista' },
    { cmd: 'insertOrderedList', icon: ListOrdered, label: 'Lista numerada' },
    { cmd: 'formatBlock', val: 'blockquote', icon: Quote, label: 'Citação' },
  ];

  return (
    <div className="rounded-2xl border border-border/40 bg-card/50 overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-border/30 bg-muted/20 p-2">
        <div className="flex items-center gap-1 flex-wrap">
          {BOTOES_FORMATACAO.map(b => {
            const Icon = b.icon;
            return (
              <button
                key={b.cmd + (b.val || '')}
                onClick={() => b.val ? executarComando(b.cmd, b.val) : executarComando(b.cmd)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                title={b.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}

          <span className="w-[1px] h-5 bg-border/30 mx-1" />

          <button
            onClick={() => executarComando('formatBlock', 'pre')}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Código"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={inserirLink}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Inserir link"
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            onClick={inserirImagem}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Inserir imagem"
          >
            <Image className="w-4 h-4" />
          </button>

          <span className="w-[1px] h-5 bg-border/30 mx-1" />

          <button
            onClick={() => setMostrarTags(!mostrarTags)}
            className={`p-1.5 rounded-lg transition-all ${
              mostrarTags ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            title="Tags"
          >
            <Tag className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMostrarHistorico(!mostrarHistorico)}
            className={`p-1.5 rounded-lg transition-all ${
              mostrarHistorico ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
            title="Histórico"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tags */}
      <AnimatePresence>
        {mostrarTags && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border/30 overflow-hidden"
          >
            <div className="p-3 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {nota.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {tag}
                    <button onClick={() => removerTag(tag)} className="hover:text-primary/60">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') adicionarTag(tagInput); }}
                  placeholder="Nova tag..."
                  className="flex-1 px-3 py-1.5 text-xs bg-background border border-border/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <button
                  onClick={() => adicionarTag(tagInput)}
                  className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {TAGS_SUGERIDAS.filter(t => !nota.tags.includes(t)).slice(0, 6).map(tag => (
                  <button
                    key={tag}
                    onClick={() => adicionarTag(tag)}
                    className="px-2 py-0.5 text-[10px] bg-muted/50 text-muted-foreground rounded-full hover:bg-muted hover:text-foreground transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Histórico */}
      <AnimatePresence>
        {mostrarHistorico && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-border/30 overflow-hidden"
          >
            <div className="p-3 max-h-48 overflow-y-auto space-y-1">
              {nota.versoes.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Nenhuma versão salva ainda.
                </p>
              ) : (
                [...nota.versoes].reverse().map((v, i) => {
                  const idx = nota.versoes.length - 1 - i;
                  return (
                    <button
                      key={idx}
                      onClick={() => restaurarVersao(idx)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <span className="text-muted-foreground">
                        {new Date(v.data).toLocaleString('pt-BR')}
                      </span>
                      <span className="text-primary text-[10px]">Restaurar</span>
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Título */}
      <div className="px-4 pt-4">
        <input
          value={nota.titulo}
          onChange={(e) => { setNota(n => ({ ...n, titulo: e.target.value })); setEditando(true); }}
          placeholder="Título da nota..."
          className="w-full text-lg font-display font-medium bg-transparent border-none outline-none placeholder:text-muted-foreground/50"
        />
      </div>

      {/* Editor */}
      <div className="px-4 pb-4">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditorInput}
          onFocus={() => setEditando(true)}
          dangerouslySetInnerHTML={{ __html: nota.conteudo }}
          className="min-h-[200px] max-h-[60vh] overflow-y-auto py-2 text-sm leading-relaxed focus:outline-none prose prose-sm max-w-none [&_h2]:text-base [&_h2]:font-display [&_h2]:font-medium [&_h2]:mt-4 [&_h3]:text-sm [&_h3]:font-display [&_h3]:font-medium [&_h3]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_img]:max-w-full [&_img]:rounded-lg [&_pre]:bg-muted/30 [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:font-mono [&_pre]:text-xs"
        />
        {!nota.conteudo && (
          <p className="text-sm text-muted-foreground/50 pointer-events-none -mt-[172px]">
            Comece a digitar sua nota aqui...
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border/30 bg-muted/10 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {ultimoSalvamento && (
            <span className="text-[10px] text-muted-foreground">
              Salvo às {ultimoSalvamento}
            </span>
          )}
          {nota.tags.length > 0 && (
            <div className="flex gap-1">
              {nota.tags.slice(0, 3).map(tag => (
                <span key={tag} className="px-1.5 py-0.5 text-[9px] bg-muted/50 text-muted-foreground rounded">
                  {tag}
                </span>
              ))}
              {nota.tags.length > 3 && (
                <span className="text-[9px] text-muted-foreground">+{nota.tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExportAberto(true)}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
            title="Exportar"
          >
            <Download className="w-3.5 h-3.5" />
          </motion.button>
          {onExcluir && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={excluir}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
              title="Excluir"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={salvar}
            disabled={salvando}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {salvando ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                <Save className="w-3 h-3" />
              </motion.div>
            ) : (
              <Check className="w-3 h-3" />
            )}
            Salvar
          </motion.button>
        </div>
      </div>

      <ExportModal
        open={exportAberto}
        onOpenChange={setExportAberto}
        titulo={nota.titulo || 'Anotação'}
        conteudo={conteudoExport}
        tipo="nota"
      />
    </div>
  );
}
