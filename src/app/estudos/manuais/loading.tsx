'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-48 rounded" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="sola-card p-4 flex items-center gap-4">
              <div className="skeleton w-12 h-12 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-5 w-2/3 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
              <div className="skeleton w-20 h-8 rounded-lg shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
