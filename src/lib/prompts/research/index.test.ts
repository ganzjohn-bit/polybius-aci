import { describe, it, expect } from 'vitest';
import {
  buildInstitutionalPrompt,
  buildPublicOpinionPrompt,
  buildMobilizationPrompt,
  buildMediaPrompt,
  buildSynthesisPrompt,
  buildQuickSearchPrompt,
  buildLiveSearchPrompt,
  INSTITUTIONAL_ANALYSIS_TOOL,
  PUBLIC_OPINION_ANALYSIS_TOOL,
  MOBILIZATION_ANALYSIS_TOOL,
  MEDIA_ANALYSIS_TOOL,
  SYNTHESIS_ANALYSIS_TOOL,
} from './index';

describe('sub-query prompt builders', () => {
  describe('buildInstitutionalPrompt', () => {
    it('includes all institutional factors in quick mode', () => {
      const prompt = buildInstitutionalPrompt('United States', 'quick');
      expect(prompt).toContain('JUDICIAL');
      expect(prompt).toContain('FEDERALISM');
      expect(prompt).toContain('POLITICAL');
      expect(prompt).toContain('CIVIL');
      expect(prompt).toContain('ELECTION_INTERFERENCE');
    });

    it('includes search instructions in live mode', () => {
      const prompt = buildInstitutionalPrompt('United States', 'live');
      expect(prompt).toContain('web search');
      expect(prompt).toContain("TODAY'S DATE");
      expect(prompt).toContain('FACTUAL ACCURACY RULES');
    });

    it('references the institutional analysis tool', () => {
      const prompt = buildInstitutionalPrompt('United States', 'quick');
      expect(prompt).toContain(INSTITUTIONAL_ANALYSIS_TOOL.name);
    });

    it('does not reference other analysis tools', () => {
      const prompt = buildInstitutionalPrompt('United States', 'quick');
      expect(prompt).not.toContain(PUBLIC_OPINION_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MOBILIZATION_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MEDIA_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(SYNTHESIS_ANALYSIS_TOOL.name);
    });
  });

  describe('buildPublicOpinionPrompt', () => {
    it('includes public opinion and corporate compliance factors', () => {
      const prompt = buildPublicOpinionPrompt('United States', 'quick');
      expect(prompt).toContain('PUBLIC_OPINION');
      expect(prompt).toContain('CORPORATE');
      expect(prompt).toContain('MARXIAN CLASS');
      expect(prompt).toContain('WEBERIAN STATUS');
    });

    it('references the public opinion analysis tool', () => {
      const prompt = buildPublicOpinionPrompt('United States', 'quick');
      expect(prompt).toContain(PUBLIC_OPINION_ANALYSIS_TOOL.name);
    });

    it('does not reference other analysis tools', () => {
      const prompt = buildPublicOpinionPrompt('United States', 'quick');
      expect(prompt).not.toContain(INSTITUTIONAL_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MOBILIZATION_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MEDIA_ANALYSIS_TOOL.name);
    });
  });

  describe('buildMobilizationPrompt', () => {
    it('includes mobilization and state capacity factors', () => {
      const prompt = buildMobilizationPrompt('United States', 'quick');
      expect(prompt).toContain('MOBILIZATIONAL_BALANCE');
      expect(prompt).toContain('STATE_CAPACITY');
      expect(prompt).toContain('DIGITAL MOBILIZATIONAL INFRASTRUCTURE');
      expect(prompt).toContain('CAESARISM ASSESSMENT');
    });

    it('references the mobilization analysis tool', () => {
      const prompt = buildMobilizationPrompt('United States', 'quick');
      expect(prompt).toContain(MOBILIZATION_ANALYSIS_TOOL.name);
    });

    it('does not reference other analysis tools', () => {
      const prompt = buildMobilizationPrompt('United States', 'quick');
      expect(prompt).not.toContain(INSTITUTIONAL_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(PUBLIC_OPINION_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MEDIA_ANALYSIS_TOOL.name);
    });
  });

  describe('buildMediaPrompt', () => {
    it('includes media rubric', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).toContain('MEDIA:');
      expect(prompt).toContain('ACTUAL INSTITUTIONAL FUNCTION');
    });

    it('references the media analysis tool', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).toContain(MEDIA_ANALYSIS_TOOL.name);
    });

    it('does not reference other analysis tools', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).not.toContain(INSTITUTIONAL_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(PUBLIC_OPINION_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MOBILIZATION_ANALYSIS_TOOL.name);
    });
  });

  describe('buildSynthesisPrompt', () => {
    const mockPhase1Results = {
      institutional: { judicial: { score: 35, evidence: 'test' } },
      publicOpinion: { publicOpinion: { score: 30, evidence: 'test' } },
      mobilization: { mobilizationalBalance: { score: 45, evidence: 'test' } },
      media: { media: { score: 25, evidence: 'test' } },
    };

    it('includes phase 1 results as JSON', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain('"judicial"');
      expect(prompt).toContain('"score": 35');
      expect(prompt).toContain('PHASE 1 RESEARCH RESULTS');
    });

    it('includes synthesis rubric content', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain('MODEL-SPECIFIC INTERPRETIVE DIAGNOSES');
      expect(prompt).toContain('GRAMSCIAN DIAGNOSIS');
      expect(prompt).toContain('SVOLIK DIAGNOSIS');
      expect(prompt).toContain('BERMAN-RILEY DIAGNOSIS');
      expect(prompt).toContain('U-TURN FRAMEWORK');
    });

    it('references the synthesis analysis tool', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain(SYNTHESIS_ANALYSIS_TOOL.name);
    });

    it('does not reference other analysis tools', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).not.toContain(INSTITUTIONAL_ANALYSIS_TOOL.name);
      expect(prompt).not.toContain(MEDIA_ANALYSIS_TOOL.name);
    });

    it('instructs not to re-score factors', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain('Do NOT re-score the factors');
    });
  });
});

describe('analysis tool schema coverage', () => {
  it('all ResearchResults factor fields are covered across analysis tool schemas', () => {
    const allFields = [
      'judicial', 'federalism', 'political', 'media', 'civil',
      'publicOpinion', 'mobilizationalBalance', 'stateCapacity',
      'corporateCompliance', 'electionInterference',
    ];

    const allToolProperties = {
      ...INSTITUTIONAL_ANALYSIS_TOOL.input_schema.properties,
      ...PUBLIC_OPINION_ANALYSIS_TOOL.input_schema.properties,
      ...MOBILIZATION_ANALYSIS_TOOL.input_schema.properties,
      ...MEDIA_ANALYSIS_TOOL.input_schema.properties,
    };

    for (const field of allFields) {
      expect(allToolProperties).toHaveProperty(field);
    }
  });

  it('synthesis tool covers modelDiagnoses and summary', () => {
    const props = SYNTHESIS_ANALYSIS_TOOL.input_schema.properties;
    expect(props).toHaveProperty('modelDiagnoses');
    expect(props).toHaveProperty('summary');
  });
});

describe('monolithic builders still work (rollback safety)', () => {
  it('buildQuickSearchPrompt returns a complete prompt', () => {
    const prompt = buildQuickSearchPrompt('United States');
    expect(prompt).toContain('SCORING (0-100');
    expect(prompt).toContain('"judicial"');
    expect(prompt).toContain('"summary"');
  });

  it('buildLiveSearchPrompt returns a complete prompt with search instructions', () => {
    const prompt = buildLiveSearchPrompt('United States');
    expect(prompt).toContain("TODAY'S DATE");
    expect(prompt).toContain('web search');
    expect(prompt).toContain('"judicial"');
    expect(prompt).toContain('"summary"');
  });
});
