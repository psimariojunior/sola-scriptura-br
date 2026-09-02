import { buildIceServers, iceHasTurn, GOOGLE_STUN_SERVERS } from '@/lib/iceServers';

describe('buildIceServers', () => {
  it('sempre inclui STUN Google', () => {
    const servers = buildIceServers();
    expect(servers.length).toBeGreaterThanOrEqual(GOOGLE_STUN_SERVERS.length);
    expect(iceHasTurn(servers)).toBe(false);
  });

  it('só adiciona TURN com URL, usuário e senha juntos', () => {
    expect(iceHasTurn(buildIceServers({ turnUrl: 'turn:exemplo:3478' }))).toBe(false);
    expect(iceHasTurn(buildIceServers({ turnUrl: 'turn:exemplo:3478', turnUser: 'u' }))).toBe(false);
    const withTurn = buildIceServers({
      turnUrl: 'turn:exemplo:3478',
      turnUser: 'u',
      turnPass: 'p',
    });
    expect(iceHasTurn(withTurn)).toBe(true);
    expect(withTurn.some((s) => (Array.isArray(s.urls) ? s.urls : [s.urls]).includes('turn:exemplo:3478'))).toBe(true);
  });
});
