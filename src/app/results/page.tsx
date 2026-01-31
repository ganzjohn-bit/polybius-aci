'use client';

import { useResultsState } from '@/hooks/useResultsState';

import AnalysisSummary from '@/components/results/AnalysisSummary';
import FactorBreakdown from '@/components/results/FactorBreakdown';
import HistoricalComparison from '@/components/results/HistoricalComparison';
import LoadingState from '@/components/results/LoadingState';
import OverallScoreCard from '@/components/results/OverallScoreCard';
import ResultsFooter from '@/components/results/ResultsFooter';
import ResultsHeader from '@/components/results/ResultsHeader';
import SocialSignalsPanel from '@/components/results/SocialSignals/SocialSignalsPanel';
import ModelComparisonSection from '@/components/calculator/ModelComparisonSection';
import VitalSignsMonitor from '@/components/results/VitalSignsMonitor/VitalSignsMonitor';

export default function ResultsPage() {
  const state = useResultsState();

  if (state.loading) {
    return <LoadingState type="loading" />;
  }

  if (state.fetchError && !state.hasResults) {
    return <LoadingState type="error" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        <ResultsHeader
          country={state.displayResults.country}
          generatedAt={state.displayResults.generatedAt}
        />

        <OverallScoreCard
          aciScore={state.displayResults.aciScore}
          country={state.displayResults.country}
        />

        {state.displayResults.summary && (
          <AnalysisSummary summary={state.displayResults.summary} />
        )}

        {state.hasScores && (
          <VitalSignsMonitor
            scores={state.displayResults.scores}
            factorResults={state.displayResults.factorResults}
            overallScore={state.displayResults.aciScore}
            factors={state.factors}
          />
        )}


        {state.hasSignals && (
          <SocialSignalsPanel socialSignals={state.socialSignals} />
        )}

        {state.hasModelComparison && (
          <ModelComparisonSection
            modelScores={state.modelScores}
            meanScore={state.meanScore}
            stdDev={state.stdDev}
            clusterAverages={state.clusterAverages}
            clusterLabels={state.clusterLabels}
            hasNonZeroScores={state.hasScores}
          />
        )}

        {state.hasFactorResults && (
          <FactorBreakdown
            factorResults={state.displayResults.factorResults}
            factors={state.factors}
          />
        )}

        {state.displayResults.historicalComparison && (
          <HistoricalComparison
            historicalComparison={state.displayResults.historicalComparison}
          />
        )}

        <ResultsFooter />
      </div>
    </div>
  );
}
