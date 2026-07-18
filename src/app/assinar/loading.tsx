'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="skeleton h-8 w-48 mx-auto rounded" />
          <div className="skeleton h-4 w-72 mx-auto rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="sola-card p-6 space-y-4">
              <div className="skeleton h-6 w-28 mx-auto rounded" />
              <div className="skeleton h-10 w-32 mx-auto rounded" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="skeleton h-4 w-full rounded" />
                ))}
              </div>
              <div className="skeleton h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
