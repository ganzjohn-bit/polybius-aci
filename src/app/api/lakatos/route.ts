import { NextRequest, NextResponse } from 'next/server';
import {
  researchProgrammes,
  generatePredictions,
  calculateProgressiveness,
  evaluateProgrammes,
  type ResearchProgramme,
  type Prediction
} from '@/lib/lakatos';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, modelId, scores, countryContext, predictions: inputPredictions, confirmedNovel, confirmedKnown, refuted, pending, programmeData } = body;

    switch (action) {
      case 'getProgrammes': {
        // Return all research programmes with their hard cores and heuristics
        const programmes = Object.values(researchProgrammes);
        return NextResponse.json({ programmes });
      }

      case 'generatePredictions': {
        // Generate testable predictions for a specific model based on current scores
        if (!modelId || !scores) {
          return NextResponse.json({ error: 'modelId and scores required' }, { status: 400 });
        }

        const predictions = generatePredictions(modelId, scores, countryContext || 'United States');
        return NextResponse.json({ predictions });
      }

      case 'generateAllPredictions': {
        // Generate predictions for all models
        if (!scores) {
          return NextResponse.json({ error: 'scores required' }, { status: 400 });
        }

        const allPredictions: Record<string, Prediction[]> = {};
        for (const modelId of Object.keys(researchProgrammes)) {
          allPredictions[modelId] = generatePredictions(modelId, scores, countryContext || 'United States');
        }
        return NextResponse.json({ predictions: allPredictions });
      }

      case 'evaluateProgramme': {
        // Calculate progressiveness for a programme with its track record
        if (!modelId) {
          return NextResponse.json({ error: 'modelId required' }, { status: 400 });
        }

        const baseProgramme = researchProgrammes[modelId];
        if (!baseProgramme) {
          return NextResponse.json({ error: 'Unknown model' }, { status: 400 });
        }

        const programme: ResearchProgramme = {
          ...baseProgramme,
          predictions: inputPredictions || [],
          confirmedNovel: confirmedNovel || 0,
          confirmedKnown: confirmedKnown || 0,
          refuted: refuted || 0,
          pending: pending || 0,
          progressivenessScore: 0,
          status: 'stagnant'
        };

        const { score, status } = calculateProgressiveness(programme);
        programme.progressivenessScore = score;
        programme.status = status;

        return NextResponse.json({ programme });
      }

      case 'evaluateAllProgrammes': {
        // Compare all programmes given their track records
        if (!programmeData || !Array.isArray(programmeData)) {
          // Return programmes with no track record
          const programmes: ResearchProgramme[] = Object.values(researchProgrammes).map(p => ({
            ...p,
            predictions: [],
            confirmedNovel: 0,
            confirmedKnown: 0,
            refuted: 0,
            pending: 0,
            progressivenessScore: 50,
            status: 'stagnant' as const
          }));

          const evaluation = evaluateProgrammes(programmes);
          return NextResponse.json(evaluation);
        }

        const programmes = programmeData.map((data: {
          modelId: string;
          predictions: Prediction[];
          confirmedNovel: number;
          confirmedKnown: number;
          refuted: number;
          pending: number;
        }) => {
          const base = researchProgrammes[data.modelId];
          if (!base) return null;

          const { score, status } = calculateProgressiveness({
            ...base,
            predictions: data.predictions || [],
            confirmedNovel: data.confirmedNovel || 0,
            confirmedKnown: data.confirmedKnown || 0,
            refuted: data.refuted || 0,
            pending: data.pending || 0,
            progressivenessScore: 0,
            status: 'stagnant'
          });

          return {
            ...base,
            predictions: data.predictions || [],
            confirmedNovel: data.confirmedNovel || 0,
            confirmedKnown: data.confirmedKnown || 0,
            refuted: data.refuted || 0,
            pending: data.pending || 0,
            progressivenessScore: score,
            status
          };
        }).filter((p): p is ResearchProgramme => p !== null);

        const evaluation = evaluateProgrammes(programmes);
        return NextResponse.json(evaluation);
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Lakatos API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
