import { describe, it, expect } from 'vitest'
import { getRiskLevel, getProbability, hasValidScores, hasSocialSignals } from './results-utils'

describe('results-utils', () => {
  describe('getRiskLevel', () => {
    it('returns Stable Democracy for scores below 25', () => {
      expect(getRiskLevel(0).level).toBe('Stable Democracy')
      expect(getRiskLevel(10).level).toBe('Stable Democracy')
      expect(getRiskLevel(24).level).toBe('Stable Democracy')
    })

    it('returns Democratic Stress for scores 25-39', () => {
      expect(getRiskLevel(25).level).toBe('Democratic Stress')
      expect(getRiskLevel(30).level).toBe('Democratic Stress')
      expect(getRiskLevel(39).level).toBe('Democratic Stress')
    })

    it('returns Competitive Authoritarian Risk for scores 40-49', () => {
      expect(getRiskLevel(40).level).toBe('Competitive Authoritarian Risk')
      expect(getRiskLevel(45).level).toBe('Competitive Authoritarian Risk')
      expect(getRiskLevel(49).level).toBe('Competitive Authoritarian Risk')
    })

    it('returns DANGER ZONE for scores 50-64', () => {
      expect(getRiskLevel(50).level).toBe('DANGER ZONE')
      expect(getRiskLevel(55).level).toBe('DANGER ZONE')
      expect(getRiskLevel(64).level).toBe('DANGER ZONE')
    })

    it('returns Consolidating Authoritarianism for scores 65-79', () => {
      expect(getRiskLevel(65).level).toBe('Consolidating Authoritarianism')
      expect(getRiskLevel(70).level).toBe('Consolidating Authoritarianism')
      expect(getRiskLevel(79).level).toBe('Consolidating Authoritarianism')
    })

    it('returns Authoritarian Regime for scores 80+', () => {
      expect(getRiskLevel(80).level).toBe('Authoritarian Regime')
      expect(getRiskLevel(90).level).toBe('Authoritarian Regime')
      expect(getRiskLevel(100).level).toBe('Authoritarian Regime')
    })

    it('handles edge cases', () => {
      // NaN gets normalized to 0, which is Stable Democracy
      expect(getRiskLevel(NaN).level).toBe('Stable Democracy')
      // Infinity is also not finite, so it gets normalized to 0
      expect(getRiskLevel(Infinity).level).toBe('Stable Democracy')
      expect(getRiskLevel(-10).level).toBe('Stable Democracy')
    })

    it('includes correct color properties', () => {
      const stable = getRiskLevel(10)
      expect(stable.color).toBe('bg-green-500')
      expect(stable.textColor).toBe('text-green-700')
      expect(stable.bgLight).toBe('bg-green-50')

      const danger = getRiskLevel(55)
      expect(danger.color).toBe('bg-red-500')
    })
  })

  describe('getProbability', () => {
    it('returns correct probability strings for each risk level', () => {
      expect(getProbability(10)).toBe('0-5%')
      expect(getProbability(30)).toBe('5-15%')
      expect(getProbability(45)).toBe('15-35%')
      expect(getProbability(55)).toBe('35-60%')
      expect(getProbability(70)).toBe('60-85%')
      expect(getProbability(90)).toBe('85%+')
    })
  })

  describe('hasValidScores', () => {
    it('returns false for empty object', () => {
      expect(hasValidScores({})).toBe(false)
    })

    it('returns false when all values are 0', () => {
      expect(hasValidScores({ judicial: 0, media: 0 })).toBe(false)
    })

    it('returns true when at least one value is greater than 0', () => {
      expect(hasValidScores({ judicial: 50, media: 0 })).toBe(true)
      expect(hasValidScores({ judicial: 0, media: 30 })).toBe(true)
    })

    it('returns true when all values are greater than 0', () => {
      expect(hasValidScores({ judicial: 50, media: 40 })).toBe(true)
    })
  })

  describe('hasSocialSignals', () => {
    it('returns false for undefined', () => {
      expect(hasSocialSignals(undefined)).toBe(false)
    })

    it('returns false when all signals are falsy', () => {
      expect(hasSocialSignals({
        trends: null,
        opEds: null,
        eliteSignals: null,
        bluesky: null,
        marketSignals: null
      })).toBe(false)

      expect(hasSocialSignals({
        trends: undefined,
        opEds: undefined,
        eliteSignals: undefined,
        bluesky: undefined,
        marketSignals: undefined
      })).toBe(false)
    })

    it('returns true when any signal is truthy', () => {
      expect(hasSocialSignals({
        trends: { data: 'test' },
        opEds: null,
        eliteSignals: null,
        bluesky: null,
        marketSignals: null
      })).toBe(true)

      expect(hasSocialSignals({
        trends: null,
        opEds: null,
        eliteSignals: null,
        bluesky: { data: 'test' },
        marketSignals: null
      })).toBe(true)
    })

    it('returns true when multiple signals are truthy', () => {
      expect(hasSocialSignals({
        trends: { data: 'test' },
        opEds: { data: 'test' },
        eliteSignals: null,
        bluesky: null,
        marketSignals: { data: 'test' }
      })).toBe(true)
    })
  })
})
