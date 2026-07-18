'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-72 rounded" />
        <div className="sola-card p-6 space-y-4">
          <div className="skeleton h-6 w-1/3 rounded" />
          <div className="skeleton h-20 w-full rounded" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-center">
                <div className="skeleton w-20 h-5 rounded shrink-0" />
                <div className="skeleton h-4 flex-1 rounded" style={{ width: `${70 + i * 5}%` }} />
              </div>
            ))}
          </div>
          <div className="skeleton h-6 w-1/4 rounded" />
          <div className="skeleton h-16 w-full rounded" />
        </div>
      </div>
    </div>
  );
}
