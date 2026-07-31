'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { MessageSquare, Heart, Send, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VerseComment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
  likes: number;
  likedBy: string[];
  replies: VerseComment[];
}

interface VerseCommentsProps {
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  open: boolean;
  onFechar: () => void;
}

const MAX_CHARS = 500;

function getStorageKey(livro: string, cap: number, verso: number) {
  return `ssb_verse_comments_${livro}_${cap}_${verso}`;
}

function loadComments(livro: string, cap: number, verso: number): VerseComment[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(livro, cap, verso));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveComments(livro: string, cap: number, verso: number, comments: VerseComment[]) {
  try {
    localStorage.setItem(getStorageKey(livro, cap, verso), JSON.stringify(comments));
  } catch { /* quota exceeded */ }
}

function getUsername(): string {
  if (typeof window === 'undefined') return 'Anônimo';
  return localStorage.getItem('ssb_username') || 'Anônimo';
}

function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('ssb_device_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('ssb_device_id', id);
  }
  return id;
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function CommentItem({
  comment,
  onLike,
  onReply,
  deviceId,
  depth = 0,
}: {
  comment: VerseComment;
  onLike: (id: string) => void;
  onReply: (parentId: string, text: string) => void;
  deviceId: string;
  depth?: number;
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const isLiked = comment.likedBy.includes(deviceId);

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText.trim());
    setReplyText('');
    setShowReplyInput(false);
  };

  return (
    <div className={cn('group/comment', depth > 0 && 'ml-4 pl-3 border-l border-[var(--border)]/30')}>
      <div className="flex items-start gap-2 py-2">
        <div className="shrink-0 w-6 h-6 rounded-full bg-[var(--brand-subtle)] flex items-center justify-center">
          <User className="w-3 h-3 text-[var(--brand-default)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--content-primary)] truncate max-w-[120px]">
              {comment.username}
            </span>
            <span className="text-[10px] text-[var(--content-muted)]">
              {timeAgo(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-[var(--content-secondary)] mt-0.5 whitespace-pre-wrap break-words">
            {comment.text}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <button
              onClick={() => onLike(comment.id)}
              className={cn(
                'inline-flex items-center gap-1 text-[10px] transition-colors',
                isLiked ? 'text-[var(--brand-default)] font-medium' : 'text-[var(--content-muted)] hover:text-[var(--brand-default)]'
              )}
            >
              <Heart className="w-3 h-3" fill={isLiked ? 'currentColor' : 'none'} />
              {comment.likes > 0 && comment.likes}
            </button>
            {depth < 2 && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="text-[10px] text-[var(--content-muted)] hover:text-[var(--brand-default)] transition-colors"
              >
                Responder
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyInput && (
        <div className="ml-8 mb-2 flex gap-1.5">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={(e) => e.key === 'Enter' && handleReply()}
            placeholder="Resposta..."
            maxLength={MAX_CHARS}
            className="flex-1 text-xs px-2.5 py-1.5 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)]"
          />
          <button
            onClick={handleReply}
            disabled={!replyText.trim()}
            className="shrink-0 p-1.5 rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] disabled:opacity-30 transition-opacity"
          >
            <Send className="w-3 h-3" />
          </button>
        </div>
      )}

      {comment.replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          onLike={onLike}
          onReply={onReply}
          deviceId={deviceId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

function VerseCommentsInner({
  livroAbreviacao,
  capitulo,
  versiculo,
  open,
  onFechar,
}: VerseCommentsProps) {
  const [comments, setComments] = useState<VerseComment[]>([]);
  const [newText, setNewText] = useState('');
  const [deviceId] = useState(() => getDeviceId());
  const username = getUsername();

  useEffect(() => {
    if (open) {
      setComments(loadComments(livroAbreviacao, capitulo, versiculo));
    }
  }, [open, livroAbreviacao, capitulo, versiculo]);

  const persist = useCallback((updated: VerseComment[]) => {
    setComments(updated);
    saveComments(livroAbreviacao, capitulo, versiculo, updated);
  }, [livroAbreviacao, capitulo, versiculo]);

  const addComment = useCallback(() => {
    if (!newText.trim()) return;
    const comment: VerseComment = {
      id: crypto.randomUUID(),
      username,
      text: newText.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replies: [],
    };
    persist([comment, ...comments]);
    setNewText('');
  }, [newText, username, comments, persist]);

  const toggleLike = useCallback((commentId: string) => {
    const toggle = (list: VerseComment[]): VerseComment[] =>
      list.map((c) => {
        if (c.id === commentId) {
          const alreadyLiked = c.likedBy.includes(deviceId);
          return {
            ...c,
            likes: alreadyLiked ? c.likes - 1 : c.likes + 1,
            likedBy: alreadyLiked ? c.likedBy.filter((id) => id !== deviceId) : [...c.likedBy, deviceId],
          };
        }
        return { ...c, replies: toggle(c.replies) };
      });
    persist(toggle(comments));
  }, [comments, deviceId, persist]);

  const addReply = useCallback((parentId: string, text: string) => {
    const reply: VerseComment = {
      id: crypto.randomUUID(),
      username,
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      replies: [],
    };
    const insertReply = (list: VerseComment[]): VerseComment[] =>
      list.map((c) => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, reply] };
        }
        return { ...c, replies: insertReply(c.replies) };
      });
    persist(insertReply(comments));
  }, [comments, username, persist]);

  const totalCount = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onFechar}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-md max-h-[80vh] bg-[var(--surface-raised)] border border-[var(--border)] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col animate-[slideUp_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--brand-default)]" />
            <h3 className="text-sm font-semibold text-[var(--content-primary)]">
              Comentários ({totalCount})
            </h3>
          </div>
          <button
            onClick={onFechar}
            className="p-1 rounded-lg hover:bg-[var(--surface-sunken)] text-[var(--content-muted)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-b border-[var(--border)]/50">
          <div className="flex gap-2">
            <div className="shrink-0 w-6 h-6 rounded-full bg-[var(--brand-subtle)] flex items-center justify-center mt-1">
              <User className="w-3 h-3 text-[var(--brand-default)]" />
            </div>
            <div className="flex-1">
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addComment();
                  }
                }}
                placeholder={`Comentando como ${username}...`}
                maxLength={MAX_CHARS}
                rows={2}
                className="w-full text-sm px-3 py-2 rounded-lg bg-[var(--surface-sunken)] border border-[var(--border)] text-[var(--content-primary)] placeholder:text-[var(--content-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-default)] resize-none"
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-[var(--content-muted)]">
                  {newText.length}/{MAX_CHARS}
                </span>
                <button
                  onClick={addComment}
                  disabled={!newText.trim()}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--brand-default)] text-[var(--brand-contrast)] disabled:opacity-30 transition-opacity hover:brightness-110 active:scale-95"
                >
                  <Send className="w-3 h-3" />
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto px-4 py-2 min-h-0">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MessageSquare className="w-8 h-8 text-[var(--content-muted)]/40 mb-2" />
              <p className="text-sm text-[var(--content-muted)]">
                Nenhum comentário ainda.
              </p>
              <p className="text-xs text-[var(--content-muted)]/60 mt-1">
                Seja o primeiro a comentar!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]/20">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={toggleLike}
                  onReply={addReply}
                  deviceId={deviceId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const VerseComments = memo(VerseCommentsInner);

/* Small badge icon for VerseCard */
export function CommentBadge({
  livroAbreviacao,
  capitulo,
  versiculo,
  onClick,
  refreshKey = 0,
}: {
  livroAbreviacao: string;
  capitulo: number;
  versiculo: number;
  onClick: (e: React.MouseEvent) => void;
  refreshKey?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const comments = loadComments(livroAbreviacao, capitulo, versiculo);
    const total = comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0);
    setCount(total);
  }, [livroAbreviacao, capitulo, versiculo, refreshKey]);

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg p-2',
        'transition-all duration-200 hover:scale-110 active:scale-90',
        count > 0
          ? 'text-[var(--brand-default)]'
          : 'text-[var(--content-muted)] hover:text-[var(--brand-default)] hover:bg-[var(--brand-subtle)]'
      )}
      aria-label={`Comentários do versículo ${versiculo}`}
      title="Comentários"
    >
      <MessageSquare className="w-3.5 h-3.5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] flex items-center justify-center text-[8px] font-bold text-white bg-[var(--brand-default)] rounded-full px-0.5 leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
}
