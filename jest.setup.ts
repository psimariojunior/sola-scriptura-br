import '@testing-library/jest-dom';

// jsdom não fornece TextEncoder/TextDecoder; necessário para exportEpub/jspdf
const { TextEncoder, TextDecoder } = require('util');
if (typeof (global as any).TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder;
}
if (typeof (global as any).TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder;
}

// Mock global fetch para testes (Node.js não fornece fetch nativamente)
if (typeof globalThis.fetch === 'undefined') {
  (globalThis as any).fetch = jest.fn(async (url: string | Request, _init?: RequestInit) => {
    const urlStr = typeof url === 'string' ? url : url.toString();
    // Rejeita para forçar o .catch() em auth.ts limpar cookie via document.cookie
    if (urlStr.includes('/api/auth/cookie/clear')) {
      throw new Error('fetch not available in test');
    }
    return { ok: true, json: async () => ({ message: 'ok' }) };
  });
}
