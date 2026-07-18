'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-44 rounded" />
        <div className="skeleton h-12 w-full rounded-lg" />
        <div className="space-y-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="sola-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="skeleton w-14 h-6 rounded shrink-0" />
                <div className="skeleton h-5 w-32 rounded" />
              </div>
              <div className="skeleton h-4 w-full rounded mb-1" />
              <div className="skeleton h-3 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
