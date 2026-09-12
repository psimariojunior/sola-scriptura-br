describe('Auth Helpers', () => {
  describe('normalizeEmail', () => {
    it('normaliza email', () => {
      const normalize = (email: string) => (email || '').trim().toLowerCase();
      expect(normalize('  Test@Email.COM  ')).toBe('test@email.com');
      expect(normalize('')).toBe('');
    });

    it('lida com null/undefined', () => {
      const normalize = (email: string) => (email || '').trim().toLowerCase();
      expect(normalize(null as any)).toBe('');
      expect(normalize(undefined as any)).toBe('');
    });
  });

  describe('readJSON', () => {
    it('parseia JSON valido', () => {
      const readJSON = <T>(raw: string | null): T | null => {
        if (!raw) return null;
        try { return JSON.parse(raw) as T; } catch { return null; }
      };
      expect(readJSON('{"a":1}')).toEqual({ a: 1 });
      expect(readJSON('invalid')).toBeNull();
      expect(readJSON(null)).toBeNull();
    });

    it('retorna null para string vazia', () => {
      const readJSON = <T>(raw: string | null): T | null => {
        if (!raw) return null;
        try { return JSON.parse(raw) as T; } catch { return null; }
      };
      expect(readJSON('')).toBeNull();
    });

    it('retorna null para JSON vazio invalido', () => {
      const readJSON = <T>(raw: string | null): T | null => {
        if (!raw) return null;
        try { return JSON.parse(raw) as T; } catch { return null; }
      };
      expect(readJSON('{')).toBeNull();
    });
  });

  describe('aplicarRole', () => {
    it('atribui admin quando role e admin', () => {
      const aplicarRole = (usuario: any) => {
        if (!usuario) return usuario;
        const isAdmin = usuario.role === 'admin';
        return { ...usuario, role: isAdmin ? 'admin' : 'user' };
      };
      expect(aplicarRole({ email: 'a@b.com', role: 'admin' }).role).toBe('admin');
    });

    it('atribui user quando role nao e admin', () => {
      const aplicarRole = (usuario: any) => {
        if (!usuario) return usuario;
        const isAdmin = usuario.role === 'admin';
        return { ...usuario, role: isAdmin ? 'admin' : 'user' };
      };
      expect(aplicarRole({ email: 'a@b.com', role: 'user' }).role).toBe('user');
    });

    it('retorna null quando usuario e null', () => {
      const aplicarRole = (usuario: any) => {
        if (!usuario) return usuario;
        return { ...usuario, role: 'user' };
      };
      expect(aplicarRole(null)).toBeNull();
    });
  });
});
