import { diffToHtml } from '@/lib/diff';

describe('diffToHtml', () => {
  it('should return empty string for empty segments', () => {
    const result = diffToHtml([]);
    expect(result).toBe('');
  });

  it('should wrap changed words in span with diff-word class', () => {
    const segments = [
      { text: 'hello ', changed: false },
      { text: 'world', changed: true },
    ];
    const result = diffToHtml(segments);
    expect(result).toContain('hello ');
    expect(result).toContain('<span class="diff-word">world</span>');
  });

  it('should escape HTML in text', () => {
    const segments = [{ text: '<script>alert("xss")</script>', changed: false }];
    const result = diffToHtml(segments);
    expect(result).not.toContain('<script>');
    expect(result).toContain('&lt;script&gt;');
  });
});
