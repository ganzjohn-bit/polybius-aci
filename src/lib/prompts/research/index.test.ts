import { describe, it, expect } from 'vitest';
import {
  buildInstitutionalPrompt,
  buildPublicOpinionPrompt,
  buildMobilizationPrompt,
  buildMediaPrompt,
  buildSynthesisPrompt,
  buildQuickSearchPrompt,
  buildLiveSearchPrompt,
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

    it('includes institutional JSON format fields', () => {
      const prompt = buildInstitutionalPrompt('United States', 'quick');
      expect(prompt).toContain('"judicial"');
      expect(prompt).toContain('"federalism"');
      expect(prompt).toContain('"political"');
      expect(prompt).toContain('"civil"');
      expect(prompt).toContain('"electionInterference"');
      expect(prompt).toContain('"genericBallot"');
    });

    it('does not include fields from other sub-queries', () => {
      const prompt = buildInstitutionalPrompt('United States', 'quick');
      expect(prompt).not.toContain('"publicOpinion"');
      expect(prompt).not.toContain('"mobilizationalBalance"');
      expect(prompt).not.toContain('"mediaLandscape"');
      expect(prompt).not.toContain('"modelDiagnoses"');
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

    it('includes demographic format fields', () => {
      const prompt = buildPublicOpinionPrompt('United States', 'quick');
      expect(prompt).toContain('"publicOpinion"');
      expect(prompt).toContain('"demographics"');
      expect(prompt).toContain('"marxianClass"');
      expect(prompt).toContain('"corporateCompliance"');
    });

    it('does not include fields from other sub-queries', () => {
      const prompt = buildPublicOpinionPrompt('United States', 'quick');
      expect(prompt).not.toContain('"judicial"');
      expect(prompt).not.toContain('"mobilizationalBalance"');
      expect(prompt).not.toContain('"mediaLandscape"');
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

    it('includes mobilization format fields', () => {
      const prompt = buildMobilizationPrompt('United States', 'quick');
      expect(prompt).toContain('"mobilizationalBalance"');
      expect(prompt).toContain('"stateCapacity"');
    });

    it('does not include fields from other sub-queries', () => {
      const prompt = buildMobilizationPrompt('United States', 'quick');
      expect(prompt).not.toContain('"judicial"');
      expect(prompt).not.toContain('"publicOpinion"');
      expect(prompt).not.toContain('"mediaLandscape"');
    });
  });

  describe('buildMediaPrompt', () => {
    it('includes media rubric', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).toContain('MEDIA:');
      expect(prompt).toContain('ACTUAL INSTITUTIONAL FUNCTION');
    });

    it('includes media landscape format fields', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).toContain('"media"');
      expect(prompt).toContain('"mediaLandscape"');
      expect(prompt).toContain('"eliteOutlets"');
      expect(prompt).toContain('"substackSphere"');
      expect(prompt).toContain('"podcastSphere"');
      expect(prompt).toContain('"nixonToChinaMoments"');
    });

    it('does not include fields from other sub-queries', () => {
      const prompt = buildMediaPrompt('United States', 'quick');
      expect(prompt).not.toContain('"judicial"');
      expect(prompt).not.toContain('"publicOpinion"');
      expect(prompt).not.toContain('"mobilizationalBalance"');
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

    it('includes synthesis format fields', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain('"modelDiagnoses"');
      expect(prompt).toContain('"summary"');
      expect(prompt).toContain('"gramscian"');
      expect(prompt).toContain('"levitskyZiblatt"');
    });

    it('does not include factor format fields', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      // The format section should not have factor output fields
      // (but the phase1 JSON will contain them as data)
      expect(prompt).not.toContain('"mediaLandscape"');
      expect(prompt).not.toContain('"electionInterference"');
    });

    it('instructs not to re-score factors', () => {
      const prompt = buildSynthesisPrompt('United States', 'quick', mockPhase1Results);
      expect(prompt).toContain('Do NOT re-score the factors');
    });
  });
});

describe('sub-query format coverage', () => {
  it('all ResearchResults factor fields are covered across sub-query formats', () => {
    const allFields = [
      'judicial', 'federalism', 'political', 'media', 'civil',
      'publicOpinion', 'mobilizationalBalance', 'stateCapacity',
      'corporateCompliance', 'electionInterference',
    ];

    const allSubQueryPrompts = [
      buildInstitutionalPrompt('US', 'quick'),
      buildPublicOpinionPrompt('US', 'quick'),
      buildMobilizationPrompt('US', 'quick'),
      buildMediaPrompt('US', 'quick'),
    ].join('\n');

    for (const field of allFields) {
      expect(allSubQueryPrompts).toContain(`"${field}"`);
    }
  });

  it('synthesis covers modelDiagnoses and summary', () => {
    const prompt = buildSynthesisPrompt('US', 'quick', {});
    expect(prompt).toContain('"modelDiagnoses"');
    expect(prompt).toContain('"summary"');
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
