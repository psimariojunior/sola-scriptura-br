import { criarPreferenciaMP, PRECO, PRODUTO } from '@/lib/assinatura';

describe('assinatura', () => {
  describe('criarPreferenciaMP', () => {
    it('creates preference with default values', () => {
      const pref = criarPreferenciaMP();
      expect(pref.items[0].unit_price).toBe(PRECO);
      expect(pref.items[0].title).toBe(PRODUTO);
      expect(pref.items[0].quantity).toBe(1);
      expect(pref.items[0].currency_id).toBe('BRL');
    });

    it('creates preference with custom value', () => {
      const pref = criarPreferenciaMP(50);
      expect(pref.items[0].unit_price).toBe(50);
    });

    it('creates preference with custom description', () => {
      const pref = criarPreferenciaMP(20, 'Custom Product');
      expect(pref.items[0].title).toBe('Custom Product');
    });

    it('creates preference with email', () => {
      const pref = criarPreferenciaMP(20, PRODUTO, 'test@example.com');
      expect(pref.payer.email).toBe('test@example.com');
    });

    it('generates external reference', () => {
      const pref = criarPreferenciaMP();
      expect(pref.external_reference).toMatch(/^ssb_at_/);
    });

    it('uses provided external reference', () => {
      const pref = criarPreferenciaMP(20, PRODUTO, '', 'custom-ref');
      expect(pref.external_reference).toBe('custom-ref');
    });

    it('has back URLs', () => {
      const pref = criarPreferenciaMP();
      expect(pref.back_urls.success).toContain('sucesso');
      expect(pref.back_urls.failure).toContain('erro');
      expect(pref.back_urls.pending).toContain('pendente');
    });

    it('has notification URL', () => {
      const pref = criarPreferenciaMP();
      expect(pref.notification_url).toContain('webhook');
    });

    it('has statement descriptor', () => {
      const pref = criarPreferenciaMP();
      expect(pref.statement_descriptor).toBe('SOLA SCRIPTURA');
    });
  });
});
