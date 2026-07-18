'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="sola-card p-8 w-full max-w-md space-y-5">
        <div className="skeleton h-8 w-32 mx-auto rounded" />
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="skeleton h-4 w-16 rounded" />
            <div className="skeleton h-12 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-20 rounded" />
            <div className="skeleton h-12 w-full rounded-lg" />
          </div>
          <div className="skeleton h-12 w-full rounded-lg" />
          <div className="skeleton h-4 w-36 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
}
