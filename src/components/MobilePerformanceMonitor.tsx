'use client';

import { useEffect, useState, useCallback } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  timestamp: number;
}

const STORAGE_KEY = 'ssb-performance';

function getScore(metric: string, value: number): number {
  const thresholds: Record<string, [number, number]> = {
    fcp: [1800, 3000],
    lcp: [2500, 4000],
    cls: [0.1, 0.25],
    fid: [100, 300],
  };
  const [good, poor] = thresholds[metric] || [0, 0];
  if (value <= good) return 100;
  if (value >= poor) return 0;
  return Math.round(100 - ((value - good) / (poor - good)) * 100);
}

function getColor(score: number): string {
  if (score > 90) return '#22c55e';
  if (score >= 50) return '#f97316';
  return '#ef4444';
}

function formatValue(metric: string, value: number | null): string {
  if (value === null) return '--';
  if (metric === 'cls') return value.toFixed(3);
  return `${Math.round(value)}ms`;
}

export default function MobilePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    timestamp: Date.now(),
  });
  const [expanded, setExpanded] = useState(false);

  const updateMetric = useCallback(
    (key: keyof PerformanceMetrics, value: number) => {
      setMetrics((prev) => {
        const next = { ...prev, [key]: value, timestamp: Date.now() };
        try {
          const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          stored.push(next);
          if (stored.length > 50) stored.splice(0, stored.length - 50);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        } catch {}
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find((e) => e.name === 'first-contentful-paint');
    if (fcpEntry) updateMetric('fcp', fcpEntry.startTime);

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) updateMetric('lcp', last.startTime);
    });
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      updateMetric('cls', clsValue);
    });
    try {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    const fidObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0] as any;
      if (entry) updateMetric('fid', entry.processingStart - entry.startTime);
    });
    try {
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch {}

    return () => {
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, [updateMetric]);

  if (process.env.NODE_ENV !== 'development') return null;

  const metricKeys: Array<{ key: keyof PerformanceMetrics; label: string }> = [
    { key: 'fcp', label: 'FCP' },
    { key: 'lcp', label: 'LCP' },
    { key: 'cls', label: 'CLS' },
    { key: 'fid', label: 'FID' },
  ];

  return (
    <div
      onClick={() => setExpanded((e) => !e)}
      className="fixed bottom-4 right-4 z-[9999] cursor-pointer select-none"
      style={{ touchAction: 'manipulation' }}
    >
      {expanded ? (
        <div className="rounded-lg bg-gray-900/95 p-3 text-xs text-white shadow-xl backdrop-blur-sm">
          <div className="mb-2 font-semibold text-gray-300">Web Vitals</div>
          {metricKeys.map(({ key, label }) => {
            const value = metrics[key];
            const score = value !== null ? getScore(key, value) : null;
            return (
              <div key={key} className="flex items-center justify-between gap-4 py-0.5">
                <span className="text-gray-400">{label}</span>
                <span style={{ color: score !== null ? getColor(score) : '#6b7280' }}>
                  {formatValue(key, value)}
                </span>
              </div>
            );
          })}
          <div className="mt-1 text-[10px] text-gray-500">Tap to close</div>
        </div>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/80 text-[10px] text-white shadow-lg backdrop-blur-sm">
          PW
        </div>
      )}
    </div>
  );
}
