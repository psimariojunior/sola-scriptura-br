'use client';

import { useEffect, useRef } from 'react';

interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, [number, number]> = {
    'FCP': [1800, 3000],
    'LCP': [2500, 4000],
    'FID': [100, 300],
    'CLS': [0.1, 0.25],
    'TTFB': [800, 1800],
    'INP': [200, 500],
  };

  const [good, poor] = thresholds[name] || [0, 0];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

function sendMetric(metric: Metric) {
  if (typeof window === 'undefined') return;

  // Log no console em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    const color = metric.rating === 'good' ? 'green' : metric.rating === 'needs-improvement' ? 'orange' : 'red';
    console.log(`[Performance] ${metric.name}: ${metric.value.toFixed(0)}ms (${metric.rating})`, `color: ${color}; font-weight: bold`);
  }

  // Enviar para analytics se disponível
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}

export function PerformanceMonitor() {
  const observedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // LCP (Largest Contentful Paint)
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        if (lastEntry && !observedRef.current.has('LCP')) {
          observedRef.current.add('LCP');
          sendMetric({
            name: 'LCP',
            value: lastEntry.startTime,
            rating: getRating('LCP', lastEntry.startTime),
          });
        }
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch {}

    // FID (First Input Delay)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          if (!observedRef.current.has('FID')) {
            observedRef.current.add('FID');
            sendMetric({
              name: 'FID',
              value: fidEntry.processingStart - fidEntry.startTime,
              rating: getRating('FID', fidEntry.processingStart - fidEntry.startTime),
            });
          }
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch {}

    // CLS (Cumulative Layout Shift)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        if (!observedRef.current.has('CLS')) {
          observedRef.current.add('CLS');
          sendMetric({
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
          });
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {}

    // TTFB (Time to First Byte)
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation && !observedRef.current.has('TTFB')) {
        observedRef.current.add('TTFB');
        const ttfb = navigation.responseStart - navigation.requestStart;
        sendMetric({
          name: 'TTFB',
          value: ttfb,
          rating: getRating('TTFB', ttfb),
        });
      }
    } catch {}

    // FCP (First Contentful Paint)
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          if (entry.name === 'first-contentful-paint' && !observedRef.current.has('FCP')) {
            observedRef.current.add('FCP');
            sendMetric({
              name: 'FCP',
              value: entry.startTime,
              rating: getRating('FCP', entry.startTime),
            });
          }
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch {}

    // INP (Interaction to Next Paint)
    try {
      let maxINP = 0;
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        for (const entry of entries) {
          const inpEntry = entry as PerformanceEntry & { duration: number };
          if (inpEntry.duration > maxINP) {
            maxINP = inpEntry.duration;
          }
        }
        if (!observedRef.current.has('INP')) {
          observedRef.current.add('INP');
          sendMetric({
            name: 'INP',
            value: maxINP,
            rating: getRating('INP', maxINP),
          });
        }
      });
      inpObserver.observe({ type: 'event', buffered: true });
    } catch {}

  }, []);

  return null;
}

// Tipos para gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
