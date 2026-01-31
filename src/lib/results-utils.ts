import { RISK_LEVELS } from '@/data/results-constants';

export function getRiskLevel(score: number) {
  const normalizedScore = Number.isFinite(score) ? score : 0;
  return RISK_LEVELS.find(level => normalizedScore < level.maxScore) ?? RISK_LEVELS[RISK_LEVELS.length - 1];
}

export function getProbability(score: number) {
  return getRiskLevel(score).probability;
}

export function hasValidScores(scores: Record<string, number>) {
  return Object.keys(scores).length > 0 && Object.values(scores).some(value => value > 0);
}

export function hasSocialSignals(signals?: {
  trends: unknown;
  opEds: unknown;
  eliteSignals: unknown;
  bluesky: unknown;
  marketSignals: unknown;
}) {
  if (!signals) return false;
  return Boolean(signals.trends || signals.opEds || signals.eliteSignals || signals.bluesky || signals.marketSignals);
}
