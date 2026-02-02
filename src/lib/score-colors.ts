/**
 * Shared score color utilities
 *
 * Thresholds:
 * - red: score >= 60
 * - amber: score >= 40
 * - green: score < 40
 */

export type ScoreColor = 'red' | 'amber' | 'green';

export function getScoreColor(score: number): ScoreColor {
  if (score >= 60) return 'red';
  if (score >= 40) return 'amber';
  return 'green';
}

export function getScoreBgClass(score: number): string {
  const color = getScoreColor(score);
  switch (color) {
    case 'red':
      return 'bg-red-100';
    case 'amber':
      return 'bg-amber-100';
    case 'green':
      return 'bg-green-100';
  }
}

export function getScoreTextClass(score: number): string {
  const color = getScoreColor(score);
  switch (color) {
    case 'red':
      return 'text-red-700';
    case 'amber':
      return 'text-amber-700';
    case 'green':
      return 'text-green-700';
  }
}

export function getScoreBorderClass(score: number): string {
  const color = getScoreColor(score);
  switch (color) {
    case 'red':
      return 'border-red-300';
    case 'amber':
      return 'border-amber-300';
    case 'green':
      return 'border-green-300';
  }
}

/**
 * Get outcome colors for historical cases
 */
export type OutcomeColor = 'red' | 'green' | 'blue';

export function getOutcomeColor(outcome: string): OutcomeColor {
  if (outcome === 'consolidated') return 'red';
  if (outcome === 'resisted') return 'green';
  return 'blue';
}

export function getOutcomeBgClass(outcome: string): string {
  const color = getOutcomeColor(outcome);
  switch (color) {
    case 'red':
      return 'bg-red-50';
    case 'green':
      return 'bg-green-50';
    case 'blue':
      return 'bg-blue-50';
  }
}

export function getOutcomeBorderClass(outcome: string): string {
  const color = getOutcomeColor(outcome);
  switch (color) {
    case 'red':
      return 'border-red-200';
    case 'green':
      return 'border-green-200';
    case 'blue':
      return 'border-blue-200';
  }
}
