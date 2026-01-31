import { describe, it, expect } from 'vitest'
import { cleanArtifacts } from './text-utils'

describe('text-utils', () => {
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
})
