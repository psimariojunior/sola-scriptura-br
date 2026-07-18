'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-64 rounded" />
        <div className="skeleton h-12 w-full rounded-lg" />
        <div className="skeleton h-10 w-48 rounded-lg" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="sola-card p-4 flex gap-3">
              <div className="skeleton w-16 h-5 rounded shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 rounded" style={{ width: `${85 - i * 7}%` }} />
                <div className="skeleton h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
