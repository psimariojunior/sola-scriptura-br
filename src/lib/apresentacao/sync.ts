export type Role = 'controller' | 'display';

export type SyncEvent =
  | { type: 'state'; state: ApresentacaoState; origin: string }
  | { type: 'request-state'; origin: string }
  | { type: 'ping'; origin: string }
  | { type: 'pong'; origin: string; state: ApresentacaoState }
  | { type: 'close'; origin: string };

export interface ApresentacaoState {
  livro: string;
  capitulo: number;
  versiculo: number;
  autoPlay: number;
  translation: string;
  fontSize: number;
  modePresentation: boolean;
  updatedAt: number;
}

const STORAGE_PREFIX = 'ssb_apr_state_';
const CHANNEL_PREFIX = 'ssb_apr_';
const ORIGIN = typeof crypto !== 'undefined' && 'randomUUID' in crypto
  ? crypto.randomUUID().slice(0, 8)
  : Math.random().toString(36).slice(2, 10);

export const DEFAULT_STATE: ApresentacaoState = {
  livro: 'jo',
  capitulo: 1,
  versiculo: 1,
  autoPlay: 0,
  translation: 'arc',
  fontSize: 4,
  modePresentation: true,
  updatedAt: 0,
};

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function gerarCodigo(): string {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}

export function isValidChannelCode(code: string): boolean {
  return /^[A-Z2-9]{6}$/.test(code);
}

export class ApresentacaoSync {
  private role: Role;
  private channelId: string;
  private channel: BroadcastChannel | null = null;
  private storageKey: string;
  private state: ApresentacaoState = { ...DEFAULT_STATE };
  private listeners: Set<(state: ApresentacaoState) => void> = new Set();
  private pollInterval: ReturnType<typeof setInterval> | null = null;
  private storageHandler: ((e: StorageEvent) => void) | null = null;
  private closed = false;

  constructor(role: Role, channelId: string) {
    this.role = role;
    this.channelId = channelId.toUpperCase();
    this.storageKey = STORAGE_PREFIX + this.channelId;
  }

  init(): void {
    if (this.closed) return;
    if (typeof window === 'undefined') return;

    this.loadFromStorage();

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.channel = new BroadcastChannel(CHANNEL_PREFIX + this.channelId);
        this.channel.addEventListener('message', this.handleBroadcast);
      } catch {
        this.channel = null;
      }
    }

    window.addEventListener('storage', this.handleStorageEvent);

    if (this.role === 'controller') {
      this.broadcast({ type: 'state', state: this.state, origin: ORIGIN });
    } else {
      this.requestState();
    }

    this.startPolling();
  }

  private startPolling(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = setInterval(() => {
      this.loadFromStorage();
    }, 600);
  }

  private handleBroadcast = (event: MessageEvent<SyncEvent>) => {
    const data = event.data;
    if (!data || data.origin === ORIGIN) return;

    if (data.type === 'state') {
      this.applyState(data.state, false);
    } else if (data.type === 'request-state' && this.role === 'controller') {
      this.broadcast({ type: 'pong', origin: ORIGIN, state: this.state });
    } else if (data.type === 'pong') {
      this.applyState(data.state, false);
    } else if (data.type === 'ping') {
      if (this.role === 'controller') {
        this.broadcast({ type: 'pong', origin: ORIGIN, state: this.state });
      }
    }
  };

  private handleStorageEvent = (e: StorageEvent) => {
    if (e.key !== this.storageKey) return;
    this.loadFromStorage();
  };

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ApresentacaoState;
      if (parsed && typeof parsed === 'object' && parsed.updatedAt) {
        this.applyState(parsed, false);
      }
    } catch {
      // ignore
    }
  }

  private writeToStorage(state: ApresentacaoState): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }

  private applyState(state: ApresentacaoState, broadcast: boolean): void {
    if (state.updatedAt && state.updatedAt < this.state.updatedAt) return;
    this.state = state;
    this.listeners.forEach((cb) => cb(this.state));
    if (broadcast) this.writeToStorage(state);
  }

  private broadcast(event: SyncEvent): void {
    if (this.channel) {
      try {
        this.channel.postMessage(event);
      } catch {
        // ignore
      }
    }
    if (event.type === 'state' || event.type === 'pong') {
      this.writeToStorage(event.state);
    }
  }

  private requestState(): void {
    this.broadcast({ type: 'request-state', origin: ORIGIN });
  }

  private update(partial: Partial<ApresentacaoState>): void {
    this.state = { ...this.state, ...partial, updatedAt: Date.now() };
    this.broadcast({ type: 'state', state: this.state, origin: ORIGIN });
    this.listeners.forEach((cb) => cb(this.state));
  }

  navigateTo(livro: string, capitulo: number, versiculo: number): void {
    this.update({ livro, capitulo, versiculo });
  }

  setAutoPlay(seconds: number): void {
    this.update({ autoPlay: Math.max(0, seconds) });
  }

  setTranslation(sigla: string): void {
    this.update({ translation: sigla });
  }

  setFontSize(size: number): void {
    this.update({ fontSize: Math.max(2, Math.min(9, size)) });
  }

  setModePresentation(on: boolean): void {
    this.update({ modePresentation: !!on });
  }

  getState(): ApresentacaoState {
    return { ...this.state };
  }

  subscribe(callback: (state: ApresentacaoState) => void): () => void {
    this.listeners.add(callback);
    callback(this.state);
    return () => {
      this.listeners.delete(callback);
    };
  }

  getChannelId(): string {
    return this.channelId;
  }

  getRole(): Role {
    return this.role;
  }

  getOrigin(): string {
    return ORIGIN;
  }

  close(): void {
    this.closed = true;
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
    if (this.channel) {
      try {
        this.channel.removeEventListener('message', this.handleBroadcast);
        this.channel.close();
      } catch {
        // ignore
      }
      this.channel = null;
    }
    if (typeof window !== 'undefined' && this.storageHandler) {
      window.removeEventListener('storage', this.handleStorageEvent);
    }
    this.listeners.clear();
  }
}

export function buildDisplayUrl(channelId: string): string {
  if (typeof window === 'undefined') return `/p/${channelId}`;
  const origin = window.location.origin;
  return `${origin}/p/${channelId.toUpperCase()}`;
}
