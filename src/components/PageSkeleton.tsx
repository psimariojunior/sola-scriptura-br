import { ReactNode } from 'react';

interface PageSkeletonProps {
  variant?: 'default' | 'article' | 'cards' | 'biblia' | 'list';
  title?: string;
}

export function PageSkeleton({ variant = 'default', title }: PageSkeletonProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)]" role="status" aria-label={title ? `Carregando ${title}` : 'Carregando página'}>
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="skeleton h-3 w-24 mx-auto rounded mb-3" />
            <div className="skeleton h-10 w-3/4 mx-auto rounded mb-3" />
            <div className="ornament w-16 mx-auto mt-4 opacity-30" />
          </div>

          {variant === 'article' && <ArticleSkeleton />}
          {variant === 'cards' && <CardsSkeleton />}
          {variant === 'biblia' && <BibliaSkeleton />}
          {variant === 'list' && <ListSkeleton />}
          {variant === 'default' && <DefaultSkeleton />}
        </div>
      </div>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

function DefaultSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="sola-card p-5 text-center">
            <div className="skeleton w-6 h-6 mx-auto mb-3 rounded-full" />
            <div className="skeleton h-7 w-16 mx-auto rounded mb-2" />
            <div className="skeleton h-3 w-20 mx-auto rounded" />
          </div>
        ))}
      </div>
      <div className="sola-card p-6">
        <div className="skeleton h-5 w-40 rounded mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-4 rounded" style={{ width: `${80 - i * 5}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ArticleSkeleton() {
  return (
    <div className="sola-card p-6 sm:p-8">
      <div className="skeleton h-8 w-3/4 rounded mb-4" />
      <div className="skeleton h-4 w-1/2 rounded mb-8" />
      <div className="space-y-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton h-4 rounded" style={{ width: `${100 - (i % 4) * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="sola-card p-5">
          <div className="skeleton w-10 h-10 rounded-lg mb-3" />
          <div className="skeleton h-5 w-3/4 rounded mb-2" />
          <div className="skeleton h-3 w-full rounded mb-1" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}

function BibliaSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 py-2">
          <div className="skeleton w-7 h-5 rounded shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-4 rounded" style={{ width: `${75 + (i % 3) * 8}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="sola-card p-4 flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded-lg shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-4 w-2/3 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
          <div className="skeleton w-16 h-8 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  );
}
