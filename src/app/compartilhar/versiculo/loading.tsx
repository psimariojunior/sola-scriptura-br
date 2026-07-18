'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="sola-card p-8 w-full max-w-lg space-y-5">
        <div className="skeleton h-7 w-48 mx-auto rounded" />
        <div className="sola-card p-4 space-y-3">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 mx-auto rounded mt-2" />
        </div>
        <div className="flex justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton w-10 h-10 rounded-full" />
          ))}
        </div>
        <div className="skeleton h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
