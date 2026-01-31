import { describe, it, expect } from 'vitest'
import { cleanArtifacts, cleanObjectStrings } from './text-utils'

describe('text-utils', () => {
  describe('cleanArtifacts', () => {
    it('cleans less-than symbols', () => {
      expect(cleanArtifacts('a &lt; b')).toBe('a < b')
    });

    it('cleans greater-than symbols', () => {
      expect(cleanArtifacts('a &gt; b')).toBe('a > b')
    });

    it('cleans ampersands', () => {
      expect(cleanArtifacts('a &amp; b')).toBe('a & b')
    });

    it('cleans double-quotes', () => {
      expect(cleanArtifacts('a &quot; b')).toBe('a " b')
    });

    it('cleans single-quotes', () => {
      expect(cleanArtifacts('a &#39; b')).toBe('a \' b')
      expect(cleanArtifacts('a &apos; b')).toBe('a \' b')
      expect(cleanArtifacts('a &#x27; b')).toBe('a \' b')
    });

    it('cleans arbitrary unicode decimal characters', () => {
      expect(cleanArtifacts('a &#61; b')).toBe('a = b')
      expect(cleanArtifacts('a &#94; b')).toBe('a ^ b')
    });

    it('removes bracketed citations', () => {
      expect(cleanArtifacts('a [4] b')).toBe('a b')
    });

    it('squishes extra internal whitespace', () => {
      expect(cleanArtifacts('a      b')).toBe('a b')
    });

    it('trims', () => {
      expect(cleanArtifacts('   a b   ')).toBe('a b')
    });
  });

  describe('cleanObjectStrings', () => {
    it('cleans plain strings', () => {
      expect(cleanObjectStrings('a &lt; b')).toBe('a < b')
    });

    it('does nothing to non-string objects', () => {
      expect(cleanObjectStrings(999)).toBe(999)
    });

    it('cleans arrays of strings', () => {
      expect(cleanObjectStrings(['a &lt; b', 'a &gt; b'])).toStrictEqual(['a < b', 'a > b'])
    });

    it('cleans string values of objects', () => {
      expect(
        cleanObjectStrings(
          {
            a: 'a &lt; b',
            b: 999,
            c: []
          }
        )
      ).toStrictEqual(
        {
          a: 'a < b',
          b: 999,
          c: []
        }
      )
    });

    it('cleans strings in deeply nested structures', () => {
      expect(
        cleanObjectStrings({
          a: {
            b: {
              c: 'a &lt; b',
              d: {
                e: ['x &gt; y', 'p &amp; q']
              }
            },
            mix: [{ name: 'test &quot;value&quot;' }, 123, 'raw &apos; string']
          }
        })
      ).toStrictEqual({
        a: {
          b: {
            c: 'a < b',
            d: {
              e: ['x > y', 'p & q']
            }
          },
          mix: [{ name: 'test "value"' }, 123, "raw ' string"]
        }
      })
    });
  });
});
