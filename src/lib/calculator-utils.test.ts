import { describe, it, expect } from 'vitest'
import {
  getActiveWeights,
  getRiskLevel,
  getProbability,
  getModelExplanation,
  getModelScores,
  getClusterAverages
} from './calculator-utils'
import type { Scores, TheoreticalModel, Factor, ModelScore } from '@/types/calculator'

// Mock data for testing
const mockFactors: Factor[] = [
  { id: 'judicial', name: 'Judicial Independence', weight: 0.20, dangerThreshold: 40, description: 'test' },
  { id: 'federalism', name: 'Federalism', weight: 0.20, dangerThreshold: 50, description: 'test' },
  { id: 'political', name: 'Political Competition', weight: 0.15, dangerThreshold: 55, description: 'test' },
  { id: 'media', name: 'Media Capture', weight: 0.15, dangerThreshold: 70, description: 'test' },
  { id: 'civil', name: 'Civil Society', weight: 0.10, dangerThreshold: 65, description: 'test' },
  { id: 'publicOpinion', name: 'Public Opinion', weight: 0.10, dangerThreshold: 55, description: 'test' },
  { id: 'mobilizationalBalance', name: 'Mobilizational Balance', weight: 0.10, dangerThreshold: 55, description: 'test' },
  { id: 'stateCapacity', name: 'State Capacity', weight: 0.10, dangerThreshold: 60, description: 'test' },
  { id: 'corporateCompliance', name: 'Corporate Compliance', weight: 0.10, dangerThreshold: 70, description: 'test' },
  { id: 'electionInterference', name: 'Election Interference', weight: 0.10, dangerThreshold: 40, description: 'test' }
]

const mockModels: TheoreticalModel[] = [
  {
    id: 'model1',
    name: 'Model 1',
    author: 'Author 1',
    cluster: 'institutionalist',
    weights: { judicial: 0.30, federalism: 0.10, political: 0.20, media: 0.15, civil: 0.05, publicOpinion: 0.05, mobilizationalBalance: 0.05, stateCapacity: 0.05, corporateCompliance: 0.05, electionInterference: 0.00 },
    shortDesc: 'Short description',
    fullDesc: 'Full description',
    keyWorks: 'Key works'
  },
  {
    id: 'model2',
    name: 'Model 2',
    author: 'Author 2',
    cluster: 'class-economic',
    weights: { judicial: 0.10, federalism: 0.10, political: 0.10, media: 0.20, civil: 0.10, publicOpinion: 0.10, mobilizationalBalance: 0.10, stateCapacity: 0.10, corporateCompliance: 0.10, electionInterference: 0.00 },
    shortDesc: 'Short description',
    fullDesc: 'Full description',
    keyWorks: 'Key works'
  }
]

const mockScores: Scores = {
  judicial: 50,
  federalism: 40,
  political: 60,
  media: 70,
  civil: 30,
  publicOpinion: 55,
  mobilizationalBalance: 45,
  stateCapacity: 35,
  corporateCompliance: 65,
  electionInterference: 25
}

describe('calculator-utils', () => {
  describe('getActiveWeights', () => {
    it('returns default factor weights when no models are active', () => {
      const activeModels = { model1: false, model2: false }
      const weights = getActiveWeights(activeModels, mockModels, mockFactors)

      expect(weights.judicial).toBe(0.20)
      expect(weights.federalism).toBe(0.20)
      expect(weights.political).toBe(0.15)
    })

    it('returns weights from a single active model', () => {
      const activeModels = { model1: true, model2: false }
      const weights = getActiveWeights(activeModels, mockModels, mockFactors)

      expect(weights.judicial).toBe(0.30)
      expect(weights.federalism).toBe(0.10)
      expect(weights.political).toBe(0.20)
    })

    it('returns averaged weights when multiple models are active', () => {
      const activeModels = { model1: true, model2: true }
      const weights = getActiveWeights(activeModels, mockModels, mockFactors)

      expect(weights.judicial).toBeCloseTo(0.20, 10) // (0.30 + 0.10) / 2
      expect(weights.federalism).toBeCloseTo(0.10, 10) // (0.10 + 0.10) / 2
      expect(weights.political).toBeCloseTo(0.15, 10) // (0.20 + 0.10) / 2
    })
  })

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

    it('includes correct color properties', () => {
      const stable = getRiskLevel(10)
      expect(stable.color).toBe('bg-green-500')
      expect(stable.textColor).toBe('text-green-700')
      expect(stable.bgLight).toBe('bg-green-50')
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

  describe('getModelExplanation', () => {
    it('returns explanation for linz model above threshold', () => {
      const explanation = getModelExplanation('linz', 60, mockScores)
      expect(explanation).toContain('Presidential system stress')
      expect(explanation).toContain('federalism')
    })

    it('returns explanation for linz model below threshold', () => {
      const explanation = getModelExplanation('linz', 40, mockScores)
      expect(explanation).toContain('Presidential risks contained')
    })

    it('returns explanation for levitsky model above threshold', () => {
      const explanation = getModelExplanation('levitsky', 60, mockScores)
      expect(explanation).toContain('Guardrails eroding')
    })

    it('returns explanation for levitsky model below threshold', () => {
      const explanation = getModelExplanation('levitsky', 40, mockScores)
      expect(explanation).toContain('Democratic guardrails holding')
    })

    it('returns explanation for svolik model above threshold', () => {
      const explanation = getModelExplanation('svolik', 60, mockScores)
      expect(explanation).toContain('Polarization enabling')
    })

    it('returns explanation for marxian model above threshold', () => {
      const explanation = getModelExplanation('marxian', 60, mockScores)
      expect(explanation).toContain('Capital-state alignment')
    })

    it('returns empty string for unknown model', () => {
      const explanation = getModelExplanation('unknown-model', 60, mockScores)
      expect(explanation).toBe('')
    })
  })

  describe('getModelScores', () => {
    it('returns model scores with correct structure', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)

      expect(modelScores).toHaveLength(2)
      expect(modelScores[0]).toHaveProperty('id')
      expect(modelScores[0]).toHaveProperty('name')
      expect(modelScores[0]).toHaveProperty('score')
      expect(modelScores[0]).toHaveProperty('risk')
      expect(modelScores[0]).toHaveProperty('topDrivers')
      expect(modelScores[0]).toHaveProperty('factorContributions')
    })

    it('calculates factor contributions correctly', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)
      const model1 = modelScores.find(m => m.id === 'model1')

      expect(model1).toBeDefined()
      expect(model1!.factorContributions).toHaveLength(mockFactors.length)

      // Check a specific contribution: judicial = 50 * 0.30 = 15
      const judicialContrib = model1!.factorContributions.find(f => f.id === 'judicial')
      expect(judicialContrib?.contribution).toBe(15)
    })

    it('sorts models by score in descending order', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)

      for (let i = 0; i < modelScores.length - 1; i++) {
        expect(modelScores[i].score).toBeGreaterThanOrEqual(modelScores[i + 1].score)
      }
    })

    it('identifies top drivers correctly', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)
      const model1 = modelScores.find(m => m.id === 'model1')

      expect(model1?.topDrivers).toBeDefined()
      expect(model1!.topDrivers.length).toBeLessThanOrEqual(3)

      // Top drivers should be sorted by contribution
      for (let i = 0; i < model1!.topDrivers.length - 1; i++) {
        expect(model1!.topDrivers[i].contribution).toBeGreaterThanOrEqual(model1!.topDrivers[i + 1].contribution)
      }
    })

    it('calculates outliers based on standard deviation', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)

      // With only 2 models with similar scores, outliers depend on std dev
      modelScores.forEach(model => {
        expect(typeof model.isOutlier).toBe('boolean')
        expect(typeof model.deviationFromMean).toBe('number')
      })
    })
  })

  describe('getClusterAverages', () => {
    it('groups models by cluster and calculates averages', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)
      const clusterLabels = {
        'institutionalist': 'Institutionalist',
        'class-economic': 'Class/Economic'
      }

      const clusterAverages = getClusterAverages(modelScores, clusterLabels)

      expect(clusterAverages).toHaveLength(2)
      expect(clusterAverages[0]).toHaveProperty('cluster')
      expect(clusterAverages[0]).toHaveProperty('label')
      expect(clusterAverages[0]).toHaveProperty('avgScore')
      expect(clusterAverages[0]).toHaveProperty('models')
    })

    it('uses cluster key as label when label not found', () => {
      const modelScores: ModelScore[] = [{
        id: 'test',
        name: 'Test Model',
        author: 'Test',
        cluster: 'unknown-cluster',
        score: 50,
        risk: { level: 'DANGER ZONE', color: 'bg-red-500', textColor: 'text-red-700', bgLight: 'bg-red-50' },
        topDrivers: [],
        lowFactors: [],
        factorContributions: [],
        explanation: '',
        isOutlier: false,
        deviationFromMean: 0,
        outlierDirection: null
      }]

      const clusterAverages = getClusterAverages(modelScores, {})

      expect(clusterAverages[0].label).toBe('unknown-cluster')
    })

    it('sorts cluster averages by score in descending order', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)
      const clusterLabels = {
        'institutionalist': 'Institutionalist',
        'class-economic': 'Class/Economic'
      }

      const clusterAverages = getClusterAverages(modelScores, clusterLabels)

      for (let i = 0; i < clusterAverages.length - 1; i++) {
        expect(clusterAverages[i].avgScore).toBeGreaterThanOrEqual(clusterAverages[i + 1].avgScore)
      }
    })

    it('includes correct model names in each cluster', () => {
      const modelScores = getModelScores(mockModels, mockScores, mockFactors)
      const clusterLabels = {
        'institutionalist': 'Institutionalist',
        'class-economic': 'Class/Economic'
      }

      const clusterAverages = getClusterAverages(modelScores, clusterLabels)
      const institutionalist = clusterAverages.find(c => c.cluster === 'institutionalist')
      const classEconomic = clusterAverages.find(c => c.cluster === 'class-economic')

      expect(institutionalist?.models).toContain('Model 1')
      expect(classEconomic?.models).toContain('Model 2')
    })
  })
})
