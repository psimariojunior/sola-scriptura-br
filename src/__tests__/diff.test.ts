import { diffWords } from '@/lib/diff';

describe('diffWords', () => {
  it('should return empty array for empty strings', () => {
    const result = diffWords('', '');
    expect(result).toEqual([]);
  });

  it('should mark all words as changed when strings are completely different', () => {
    const result = diffWords('abc', 'xyz');
    expect(result.length).toBeGreaterThan(0);
    result.forEach(seg => expect(seg.changed).toBe(true));
  });

  it('should mark no words as changed when strings are identical', () => {
    const result = diffWords('hello world', 'hello world');
    expect(result.length).toBeGreaterThan(0);
    result.forEach(seg => expect(seg.changed).toBe(false));
  });

  it('should correctly identify changed words', () => {
    const result = diffWords('the cat sat', 'the dog sat');
    // Tokenizer splits into words and spaces
    const wordSegments = result.filter(s => s.text.trim().length > 0);
    expect(wordSegments.some(s => s.text === 'the' && !s.changed)).toBe(true);
    expect(wordSegments.some(s => s.text === 'dog' && s.changed)).toBe(true);
    expect(wordSegments.some(s => s.text === 'sat' && !s.changed)).toBe(true);
  });

  it('should handle punctuation', () => {
    const result = diffWords('hello, world!', 'hello, world!');
    expect(result.every(s => s.changed === false)).toBe(true);
  });

  it('should handle case differences', () => {
    const result = diffWords('Hello', 'hello');
    expect(result).toHaveLength(1);
    expect(result[0].changed).toBe(false);
  });

  it('should handle different lengths', () => {
    const result = diffWords('a b c', 'a b c d');
    expect(result.length).toBeGreaterThanOrEqual(3);
  });

  it('should return segments with text and changed properties', () => {
    const result = diffWords('test', 'test');
    result.forEach(seg => {
      expect(seg).toHaveProperty('text');
      expect(seg).toHaveProperty('changed');
      expect(typeof seg.text).toBe('string');
      expect(typeof seg.changed).toBe('boolean');
    });
  });
});
