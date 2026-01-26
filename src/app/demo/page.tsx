'use client';

import { useState } from 'react';
import { BookOpen, AlertCircle, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for demonstration
const mockScores = {
  judicial: 45,
  federalism: 35,
  political: 50,
  media: 45,
  civil: 40,
  publicOpinion: 55,
  mobilizationalBalance: 45,
  stateCapacity: 40,
  corporateCompliance: 45,
  electionInterference: 40
};

const mockResearchResults = {
  judicial: { score: 45, evidence: "Supreme Court increasingly politicized, but still issuing some independent rulings. Lower courts remain functional.", trend: "worsening" },
  federalism: { score: 35, evidence: "States maintaining significant autonomy. Blue states resisting federal overreach on multiple fronts.", trend: "stable" },
  political: { score: 50, evidence: "Opposition fragmented but functional. Primary challenges within both parties.", trend: "stable" },
  media: { score: 45, evidence: "Major outlets still independent but facing pressure. Local news decimated. Social media increasingly polarized.", trend: "worsening" },
  civil: { score: 40, evidence: "Civil society organizations active but facing funding pressures. Protest rights under some pressure.", trend: "stable" },
  publicOpinion: { score: 55, evidence: "Approval ratings ~45%. Strong partisan polarization. Democratic norms showing some erosion in polling.", trend: "worsening" },
  mobilizationalBalance: { score: 45, evidence: "Mixed picture: white evangelical activation significant but often overstated. Black church infrastructure (Souls to the Polls) remains strong. Union density declining but public sector unions still organized. Catholic mobilization split between conservative (Catholic Vote) and progressive (Nuns on the Bus) wings. Indivisible chapters active in suburbs.", trend: "stable" },
  stateCapacity: { score: 40, evidence: "Federal agencies still professional but Schedule F threats. Military maintaining institutional independence.", trend: "stable" },
  corporateCompliance: { score: 45, evidence: "Business community hedging. Some public criticism of policies, but limited coordinated resistance.", trend: "stable" },
  electionInterference: { score: 40, evidence: "Election administration under pressure in some states. Most elections still conducted fairly.", trend: "worsening" },
  summary: "The United States shows moderate vulnerability to authoritarian consolidation. Key concerns include public opinion polarization and media landscape fragmentation. However, mobilizational balance is more contested than often assumed: while white evangelical activation is real, Black church infrastructure (Souls to the Polls), progressive Catholic networks, and remaining union density provide counter-mobilization capacity. CRITICAL: Regional variation is enormous - Minnesota (union density 14.2%, ISAIAH's 200 congregations, 11-year labor-community table) shows opposition advantage, while Florida and Alabama show regime dominance. National scores obscure this variation. Significant guardrails remain: federalism enables state-level resistance, courts still issue some independent rulings, and the military maintains institutional independence. The overall picture is one of democratic stress rather than imminent breakdown, with outcomes likely determined at state level."
};

const mockComparativeData = {
  comparativeAnalysis: [
    {
      modelName: "Levitsky-Ziblatt",
      mostSimilarCases: [
        { caseId: "brazil-bolsonaro", country: "Brazil", period: "Bolsonaro Attempt", outcome: "resisted", outcomeScore: 30, similarity: 72 },
        { caseId: "poland-pis", country: "Poland", period: "PiS Attempt", outcome: "resisted", outcomeScore: 35, similarity: 68 }
      ],
      predictedOutcome: { score: 38, confidence: "medium", reasoning: "Through Levitsky-Ziblatt lens, most similar to Brazil Bolsonaro Attempt (72% match). Of top 5 matches: 1 consolidated, 3 resisted, 1 democratized." },
      theoreticalExplanation: "Democratic guardrails strained but holding: judicial independence (50) shows institutional stress but courts still functioning. Political party gatekeeping weakened but not collapsed.",
      warningSignals: [],
      hopefulSignals: ["mobilizationalBalance (45) near resisted-case average (42)", "stateCapacity (40) below consolidated-case average (58)", "electionInterference (40) below consolidated-case average (62)"]
    },
    {
      modelName: "Berman-Riley",
      mostSimilarCases: [
        { caseId: "poland-pis", country: "Poland", period: "PiS Attempt", outcome: "resisted", outcomeScore: 35, similarity: 70 },
        { caseId: "brazil-bolsonaro", country: "Brazil", period: "Bolsonaro Attempt", outcome: "resisted", outcomeScore: 30, similarity: 65 }
      ],
      predictedOutcome: { score: 38, confidence: "medium", reasoning: "Through Berman-Riley lens, mobilizational balance roughly even when accounting for Black church infrastructure and progressive Catholic networks." },
      theoreticalExplanation: "Mobilizational balance contested: regime forces offset by Black church infrastructure, union remnants, and progressive faith networks. Opposition organizational capacity (civil: 45) still intact. Historical pattern suggests counter-mobilization capacity remains.",
      warningSignals: [],
      hopefulSignals: ["federalism (35) below consolidated-case average (55)"]
    },
    {
      modelName: "Marxian/Kaleckian",
      mostSimilarCases: [
        { caseId: "brazil-bolsonaro", country: "Brazil", period: "Bolsonaro Attempt", outcome: "resisted", outcomeScore: 30, similarity: 75 },
        { caseId: "chile-pinochet", country: "Chile", period: "Pinochet Coup", outcome: "consolidated", outcomeScore: 95, similarity: 55 }
      ],
      predictedOutcome: { score: 35, confidence: "medium", reasoning: "Capital not fully aligned with regime. Corporate compliance at 45 suggests business hedging rather than full support." },
      theoreticalExplanation: "Business class not yet fully aligned with authoritarian project: corporate compliance (45) suggests capital still hedging rather than seeing regime as essential protection against redistribution.",
      warningSignals: [],
      hopefulSignals: ["corporateCompliance (45) below consolidated-case average (68)"]
    }
  ],
  consensus: {
    averageScore: 39,
    scoreRange: { min: 32, max: 45 },
    agreementLevel: "moderate",
    summary: "Models predict average score of 39/100 (range: 32-45). Agreement: moderate. Most cited comparison: Brazil Bolsonaro Attempt (resisted)."
  },
  mostCitedCases: [
    { caseId: "brazil-bolsonaro", country: "Brazil", period: "Bolsonaro Attempt (2019-22)", citedBy: ["Levitsky-Ziblatt", "Svolik", "Marxian/Kaleckian", "Gramscian", "Paxton", "Frankfurt School", "Berman-Riley", "Classical Republican"], outcome: "resisted" },
    { caseId: "poland-pis", country: "Poland", period: "PiS Attempt (2015-23)", citedBy: ["Levitsky-Ziblatt", "Svolik", "Marxian/Kaleckian", "Gramscian", "Paxton", "Frankfurt School", "Berman-Riley", "Classical Republican"], outcome: "resisted" },
    { caseId: "hungary-orban", country: "Hungary", period: "Orban Consolidation (2010-22)", citedBy: ["Levitsky-Ziblatt", "Gramscian"], outcome: "consolidated" }
  ],
  interpretation: [
    "Models predict average score of 37/100 (range: 32-42). Agreement: moderate. Most cited comparison: Brazil Bolsonaro Attempt (resisted).",
    "Cross-model hopeful signals: stateCapacity (7 models), corporateCompliance (6 models), electionInterference (7 models), mobilizationalBalance (4 models - Black church and progressive faith infrastructure provides counter-mobilization)",
    "Most relevant historical parallel: Brazil Bolsonaro Attempt (resisted) - cited by all 8 models"
  ]
};

const mockMediaLandscape = {
  overallSentiment: "mixed",
  eliteOutlets: {
    sentiment: "critical",
    keyNarratives: ["Institutional concerns", "Democratic backsliding fears"],
    notableOpEds: ["NYT: Democracy under stress", "Atlantic: The authoritarian temptation"]
  },
  substackSphere: {
    dominantVoices: ["Heather Cox Richardson: critical", "Matt Yglesias: concerned but analytical"],
    regimeVsOpposition: "opposition-leaning"
  },
  cultureIndustryCapture: {
    authoritarianDiscourseLevel: "mainstreaming",
    dehumanizingLanguage: false,
    scapegoatingPresent: true
  }
};

const factors = [
  { id: 'judicial', name: 'Judicial Independence', icon: '⚖️' },
  { id: 'federalism', name: 'Federalism', icon: '🏛️' },
  { id: 'political', name: 'Political Competition', icon: '🗳️' },
  { id: 'media', name: 'Media Freedom', icon: '📰' },
  { id: 'civil', name: 'Civil Society', icon: '👥' },
  { id: 'publicOpinion', name: 'Public Opinion', icon: '📊' },
  { id: 'mobilizationalBalance', name: 'Mobilizational Balance', icon: '⚡' },
  { id: 'stateCapacity', name: 'State Capacity', icon: '🏢' },
  { id: 'corporateCompliance', name: 'Corporate Compliance', icon: '💼' },
  { id: 'electionInterference', name: 'Election Integrity', icon: '🗳️' }
];

export default function DemoPage() {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  const getTrendIcon = (trend?: string) => {
    if (trend === 'worsening') return <TrendingUp className="w-4 h-4 text-red-500" />;
    if (trend === 'improving') return <TrendingDown className="w-4 h-4 text-green-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-100';
    if (score >= 50) return 'text-amber-600 bg-amber-100';
    if (score >= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const overallScore = Math.round(Object.values(mockScores).reduce((a, b) => a + b, 0) / 10);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Authoritarian Consolidation Index</h1>
          <p className="text-slate-600">Demo View - Sample Data for United States</p>
          <div className="mt-2 inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
            Demo Mode - Not Live Data
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">Overall Assessment: United States</h2>
            <div className={`text-3xl font-bold px-4 py-2 rounded-xl ${getScoreColor(overallScore)}`}>
              {overallScore}/100
            </div>
          </div>
          <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                overallScore >= 70 ? 'bg-red-500' :
                overallScore >= 50 ? 'bg-amber-500' :
                overallScore >= 30 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${overallScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Democratic</span>
            <span>At Risk</span>
            <span>Consolidating</span>
            <span>Authoritarian</span>
          </div>
        </div>

        {/* Factor Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Factor Scores</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {factors.map((factor) => {
              const score = mockScores[factor.id as keyof typeof mockScores];
              const result = mockResearchResults[factor.id as keyof typeof mockResearchResults];
              const isExpanded = expandedFactor === factor.id;

              return (
                <div
                  key={factor.id}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isExpanded ? 'col-span-2 md:col-span-5 bg-slate-50 border-slate-300' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setExpandedFactor(isExpanded ? null : factor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{factor.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{factor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {typeof result === 'object' && 'trend' in result && getTrendIcon(result.trend)}
                      <span className={`font-bold px-2 py-1 rounded ${getScoreColor(score)}`}>{score}</span>
                    </div>
                  </div>
                  {isExpanded && typeof result === 'object' && 'evidence' in result && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-sm text-slate-600">{result.evidence}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-3">Analysis Summary</h3>
          <p className="text-slate-700 leading-relaxed">{mockResearchResults.summary}</p>
        </div>

        {/* Historical Comparison */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-bold text-slate-800">Historical Comparison</h3>
          </div>

          {/* Consensus Box */}
          <div className="bg-green-100 border border-green-300 p-4 rounded-xl mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Comparative Prediction</span>
              <span className="text-2xl font-bold text-green-700">
                {mockComparativeData.consensus.averageScore}/100
              </span>
            </div>
            <div className="text-sm text-slate-600">
              Range: {mockComparativeData.consensus.scoreRange.min}-{mockComparativeData.consensus.scoreRange.max} |
              Agreement: <span className="font-medium text-amber-700">{mockComparativeData.consensus.agreementLevel}</span>
            </div>
          </div>

          {/* Most Similar Cases */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">Most Similar Historical Cases</h4>
            <div className="space-y-2">
              {mockComparativeData.mostCitedCases.map((c) => (
                <div key={c.caseId} className={`p-3 rounded-lg flex items-center justify-between ${
                  c.outcome === 'consolidated' ? 'bg-red-50 border border-red-200' :
                  c.outcome === 'resisted' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div>
                    <span className="font-medium text-slate-800">{c.country}</span>
                    <span className="text-slate-500 text-sm ml-2">{c.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      c.outcome === 'consolidated' ? 'bg-red-200 text-red-800' :
                      c.outcome === 'resisted' ? 'bg-green-200 text-green-800' :
                      'bg-blue-200 text-blue-800'
                    }`}>
                      {c.outcome}
                    </span>
                    <span className="text-xs text-slate-500">{c.citedBy.length} models</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation */}
          <div className="space-y-2">
            {mockComparativeData.interpretation.map((line, i) => (
              <p key={i} className={`text-sm ${
                line.includes('warning') || line.includes('Warning') ? 'text-red-700 font-medium' :
                line.includes('hopeful') || line.includes('Hopeful') ? 'text-green-700 font-medium' :
                'text-slate-700'
              }`}>
                {line}
              </p>
            ))}
          </div>

          {/* Model Details */}
          <details className="mt-4">
            <summary className="text-sm text-slate-600 cursor-pointer hover:text-slate-800">
              Show model-by-model analysis
            </summary>
            <div className="mt-3 space-y-3">
              {mockComparativeData.comparativeAnalysis.map((model) => (
                <div key={model.modelName} className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">{model.modelName}</span>
                    <span className={`font-bold ${
                      model.predictedOutcome.score >= 60 ? 'text-red-600' :
                      model.predictedOutcome.score >= 40 ? 'text-amber-600' :
                      'text-green-600'
                    }`}>
                      {model.predictedOutcome.score}/100
                    </span>
                  </div>
                  {model.theoreticalExplanation && (
                    <p className="text-sm text-slate-700 mb-2">{model.theoreticalExplanation}</p>
                  )}
                  <p className="text-xs text-slate-500 italic">{model.predictedOutcome.reasoning}</p>
                  {model.warningSignals.length > 0 && (
                    <div className="mt-2 text-xs text-red-600">
                      Warnings: {model.warningSignals.join('; ')}
                    </div>
                  )}
                  {model.hopefulSignals.length > 0 && (
                    <div className="mt-1 text-xs text-green-600">
                      Hopeful: {model.hopefulSignals.join('; ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Media Landscape */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Media Landscape</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-700 mb-2">Elite Outlets</h4>
              <span className="inline-block px-2 py-1 bg-red-100 text-red-700 rounded text-sm mb-2">
                {mockMediaLandscape.eliteOutlets.sentiment}
              </span>
              <ul className="text-sm text-slate-600 space-y-1">
                {mockMediaLandscape.eliteOutlets.notableOpEds.map((op, i) => (
                  <li key={i}>• {op}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-700 mb-2">Substack Sphere</h4>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm mb-2">
                {mockMediaLandscape.substackSphere.regimeVsOpposition}
              </span>
              <ul className="text-sm text-slate-600 space-y-1">
                {mockMediaLandscape.substackSphere.dominantVoices.map((v, i) => (
                  <li key={i}>• {v}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-700 mb-2">Culture Industry Capture</h4>
              <span className={`inline-block px-2 py-1 rounded text-sm mb-2 ${
                mockMediaLandscape.cultureIndustryCapture.authoritarianDiscourseLevel === 'normalized' ? 'bg-red-100 text-red-700' :
                mockMediaLandscape.cultureIndustryCapture.authoritarianDiscourseLevel === 'mainstreaming' ? 'bg-amber-100 text-amber-700' :
                'bg-green-100 text-green-700'
              }`}>
                {mockMediaLandscape.cultureIndustryCapture.authoritarianDiscourseLevel}
              </span>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Dehumanizing language: {mockMediaLandscape.cultureIndustryCapture.dehumanizingLanguage ? 'Yes' : 'No'}</li>
                <li>• Scapegoating present: {mockMediaLandscape.cultureIndustryCapture.scapegoatingPresent ? 'Yes' : 'No'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 mt-8">
          <p>This is a demo page with sample data. Run a live search for actual analysis.</p>
          <a href="/" className="text-blue-600 hover:underline mt-2 inline-block">← Back to Live Tool</a>
        </div>
      </div>
    </div>
  );
}
