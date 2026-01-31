'use client';

import { useCalculatorState } from '@/hooks/useCalculatorState';
import CalculatorHeader from '@/components/calculator/CalculatorHeader';
import CalculatorFooter from '@/components/calculator/CalculatorFooter';
import SettingsModal from '@/components/calculator/SettingsModal';
import TheoreticalModelsSelector from '@/components/calculator/TheoreticalModelsSelector';
import CountryResearchSection from '@/components/calculator/CountryResearchSection';
import SocialSignalsDashboard from '@/components/calculator/SocialSignalsDashboard';
import OverallScoreCard from '@/components/calculator/OverallScoreCard';
import VitalSignsMonitor from '@/components/calculator/VitalSignsMonitor';
import HistoricalComparison from '@/components/calculator/HistoricalComparison';
import ModelComparisonSection from '@/components/calculator/ModelComparisonSection';
import FactorSliders from '@/components/calculator/FactorSliders';
import AnalysisSummary from '@/components/results/AnalysisSummary';

export default function PolybiusCalculator() {
  const state = useCalculatorState();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <CalculatorHeader onSettingsClick={() => state.setShowSettings(true)} />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={state.showSettings}
          onClose={() => state.setShowSettings(false)}
          apiKey={state.apiKey}
          newsApiKey={state.newsApiKey}
          onApiKeyChange={state.setApiKey}
          onNewsApiKeyChange={state.setNewsApiKey}
          onSave={state.saveApiKey}
        />

        {/* Theoretical Models */}
        <TheoreticalModelsSelector
          models={state.theoreticalModels}
          activeModels={state.activeModels}
          onToggleModel={state.toggleModel}
        />

        {/* Research Country */}
        <CountryResearchSection
          country={state.country}
          onCountryChange={state.setCountry}
          searchMode={state.searchMode}
          onSearchModeChange={state.setSearchMode}
          onResearch={state.researchCountry}
          isResearching={state.isResearching}
          error={state.error}
        />

        {/* Social Signals Dashboard */}
        <SocialSignalsDashboard
          country={state.country}
          trendsData={state.trendsData}
          opEdData={state.opEdData}
          eliteSignalsData={state.eliteSignalsData}
          blueskyData={state.blueskyData}
          marketSignalsData={state.marketSignalsData}
          isFetchingTrends={state.isFetchingTrends}
          isFetchingOpEds={state.isFetchingOpEds}
          isFetchingEliteSignals={state.isFetchingEliteSignals}
          isFetchingBluesky={state.isFetchingBluesky}
          isFetchingMarkets={state.isFetchingMarkets}
          onFetchTrends={state.fetchTrends}
          onFetchOpEds={state.fetchOpEds}
          onFetchEliteSignals={state.fetchEliteSignals}
          onFetchBluesky={state.fetchBluesky}
          onFetchMarkets={state.fetchMarketSignals}
          error={state.socialError}
          onSynthesize={state.synthesizeSignals}
          hasSocialSignals={state.hasSocialSignals}
          hasApiKey={!!state.apiKey}
        />

        {/* Overall Score */}
        <OverallScoreCard
          aciScore={state.aciScore}
          probability={state.probability}
          risk={state.risk}
          hasNonZeroScores={state.hasNonZeroScores}
          onPublish={state.publish}
          isPublishing={state.isPublishing}
          publishStatus={state.publishStatus}
        />

        {/* Vital Signs Dashboard */}
        {state.hasNonZeroScores && (
          <VitalSignsMonitor
            factors={state.factors}
            scores={state.scores}
            researchResults={state.researchResults}
            aciScore={state.aciScore}
          />
        )}

        {/* Analysis Summary */}
        {state.researchResults?.summary && (
          <AnalysisSummary summary={state.researchResults.summary} />
        )}

        {/* Historical Comparison */}
        <HistoricalComparison
          comparativeData={state.comparativeData}
          isFetchingComparative={state.isFetchingComparative}
        />

        {/* Model Stress Comparison */}
        <ModelComparisonSection
          modelScores={state.modelScores}
          meanScore={state.meanScore}
          stdDev={state.stdDev}
          clusterAverages={state.clusterAverages}
          clusterLabels={state.clusterLabels}
          hasNonZeroScores={state.hasNonZeroScores}
        />

        {/* Factor Sliders */}
        <FactorSliders
          factors={state.factors}
          scores={state.scores}
          researchResults={state.researchResults}
          activeWeights={state.activeWeights}
          onScoreChange={state.updateScore}
        />

        {/* Footer */}
        <CalculatorFooter />
      </div>
    </div>
  );
}
