'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-56 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="sola-card p-5">
              <div className="skeleton h-6 w-1/3 rounded mb-3" />
              <div className="space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-4/5 rounded" />
                <div className="skeleton h-4 w-3/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
