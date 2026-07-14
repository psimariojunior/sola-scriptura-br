export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center" role="status" aria-label="Carregando conteúdo">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border-2 border-primary/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-2 rounded-full border border-transparent border-t-primary/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          <div className="absolute inset-4 rounded-full bg-primary/10 animate-pulse" />
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="text-xs text-muted-foreground tracking-widest uppercase">Carregando</p>
      </div>
    </div>
  );
}
