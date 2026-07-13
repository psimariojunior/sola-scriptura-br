'use client';

import { useCallback, useRef } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface MicroInteracoesState {
  toastTimeout: ReturnType<typeof setTimeout> | null;
  confettiEl: HTMLDivElement | null;
}

let toastContainer: HTMLDivElement | null = null;
let confettiContainer: HTMLDivElement | null = null;

function ensureToastContainer(): HTMLDivElement {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'ssb-toast-container';
    toastContainer.style.cssText = 'position:fixed;top:80px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function ensureConfettiContainer(): HTMLDivElement {
  if (!confettiContainer) {
    confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none;overflow:hidden;';
    document.body.appendChild(confettiContainer);
  }
  return confettiContainer;
}

const toastColors: Record<ToastType, { bg: string; border: string; text: string; icon: string }> = {
  success: { bg: 'rgb(34,197,94,0.12)', border: 'rgb(34,197,94,0.3)', text: 'rgb(34,197,94)', icon: '\u2714' },
  error: { bg: 'rgb(239,68,68,0.12)', border: 'rgb(239,68,68,0.3)', text: 'rgb(239,68,68)', icon: '\u2718' },
  info: { bg: 'rgb(59,130,246,0.12)', border: 'rgb(59,130,246,0.3)', text: 'rgb(59,130,246)', icon: '\u2139' },
  warning: { bg: 'rgb(245,158,11,0.12)', border: 'rgb(245,158,11,0.3)', text: 'rgb(245,158,11)', icon: '\u26A0' },
};

function showToastInternal(message: string, type: ToastType = 'info', duration = 3000) {
  const container = ensureToastContainer();
  const colors = toastColors[type];

  const el = document.createElement('div');
  el.style.cssText = `
    pointer-events:auto;display:flex;align-items:center;gap:10px;
    padding:12px 18px;border-radius:12px;font-size:14px;font-weight:500;
    background:${colors.bg};border:1px solid ${colors.border};color:${colors.text};
    backdrop-filter:blur(12px);box-shadow:0 8px 32px rgba(0,0,0,0.12);
    transform:translateX(120%);transition:all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    font-family:system-ui,-apple-system,sans-serif;
  `;
  el.innerHTML = `<span style="font-size:16px">${colors.icon}</span><span>${message}</span>`;
  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.transform = 'translateX(0)';
  });

  setTimeout(() => {
    el.style.transform = 'translateX(120%)';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, duration);
}

const confettiColors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#f59e0b', '#22c55e', '#ec4899', '#3b82f6'];

function showConfettiInternal(count = 50) {
  const container = ensureConfettiContainer();
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    const size = Math.random() * 8 + 4;
    const x = Math.random() * 100;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 0.3;
    const duration = Math.random() * 1.5 + 1;
    const drift = (Math.random() - 0.5) * 200;
    const shape = Math.random() > 0.5 ? '50%' : '2px';

    particle.style.cssText = `
      position:absolute;top:-10px;left:${x}%;width:${size}px;height:${size}px;
      background:${color};border-radius:${shape};
      transform:rotate(${rotation}deg);
      opacity:1;
      transition:all ${duration}s cubic-bezier(0.25,0.46,0.45,0.94);
      transition-delay:${delay}s;
    `;
    container.appendChild(particle);
    particles.push(particle);

    requestAnimationFrame(() => {
      particle.style.top = `${60 + Math.random() * 40}%`;
      particle.style.left = `${x + drift / 10}%`;
      particle.style.opacity = '0';
      particle.style.transform = `rotate(${rotation + 720}deg)`;
    });
  }

  setTimeout(() => {
    particles.forEach(p => p.remove());
  }, 3000);
}

const hapticPatterns: Record<string, number[]> = {
  light: [10],
  medium: [20],
  heavy: [40],
  success: [10, 50, 10],
  error: [30, 100, 30],
  selection: [5],
};

function vibrateInternal(pattern: string | number[]) {
  if (!navigator?.vibrate) return;
  if (typeof pattern === 'string') {
    navigator.vibrate(hapticPatterns[pattern] || [10]);
  } else {
    navigator.vibrate(pattern);
  }
}

const audioContext = typeof AudioContext !== 'undefined' ? new AudioContext() : null;

const soundFrequencies: Record<string, { freq: number; duration: number; type: OscillatorType; volume: number }> = {
  click: { freq: 800, duration: 0.05, type: 'sine', volume: 0.1 },
  success: { freq: 523, duration: 0.15, type: 'sine', volume: 0.12 },
  error: { freq: 200, duration: 0.2, type: 'sawtooth', volume: 0.08 },
  notification: { freq: 660, duration: 0.1, type: 'sine', volume: 0.1 },
  pop: { freq: 400, duration: 0.08, type: 'sine', volume: 0.08 },
  whoosh: { freq: 300, duration: 0.15, type: 'sine', volume: 0.06 },
};

function playSoundInternal(type: string) {
  if (!audioContext) return;
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const config = soundFrequencies[type];
  if (!config) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = config.type;
  oscillator.frequency.setValueAtTime(config.freq, audioContext.currentTime);
  gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + config.duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + config.duration);
}

export function useMicroInteracoes() {
  const state = useRef<MicroInteracoesState>({
    toastTimeout: null,
    confettiEl: null,
  });

  const showToast = useCallback((message: string, type: ToastType = 'info', duration?: number) => {
    showToastInternal(message, type, duration);
  }, []);

  const showConfetti = useCallback((count?: number) => {
    showConfettiInternal(count);
  }, []);

  const vibrate = useCallback((pattern: string | number[] = 'light') => {
    vibrateInternal(pattern);
  }, []);

  const playSound = useCallback((type: string = 'click') => {
    playSoundInternal(type);
  }, []);

  return { showToast, showConfetti, vibrate, playSound };
}
