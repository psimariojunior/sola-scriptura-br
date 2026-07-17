import '@testing-library/jest-dom';

// jsdom não fornece TextEncoder/TextDecoder; necessário para exportEpub/jspdf
const { TextEncoder, TextDecoder } = require('util');
if (typeof (global as any).TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder;
}
if (typeof (global as any).TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder;
}
