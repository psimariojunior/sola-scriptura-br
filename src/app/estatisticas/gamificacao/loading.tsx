'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4 sm:p-6 pt-24">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-8 w-56 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="sola-card p-5 text-center space-y-2">
              <div className="skeleton w-8 h-8 mx-auto rounded-full" />
              <div className="skeleton h-7 w-16 mx-auto rounded" />
              <div className="skeleton h-3 w-20 mx-auto rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="sola-card p-5 space-y-3">
            <div className="skeleton h-5 w-32 rounded" />
            <div className="skeleton h-40 w-full rounded-lg" />
          </div>
          <div className="sola-card p-5 space-y-3">
            <div className="skeleton h-5 w-36 rounded" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="skeleton w-8 h-8 rounded-full shrink-0" />
                <div className="skeleton h-4 flex-1 rounded" />
                <div className="skeleton w-12 h-4 rounded shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
