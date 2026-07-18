'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-8 w-52 rounded" />
        <div className="sola-card p-6 space-y-4">
          <div className="skeleton h-6 w-48 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-5/6 rounded" />
          <div className="skeleton h-4 w-4/5 rounded" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="sola-card p-4 flex gap-3">
              <div className="skeleton w-10 h-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
