import { LogLevel } from '../enums/log-levels';

export function getLogLevels(levelsCount: number) {
  if (isNaN(levelsCount)) {
    return ['error', 'log'];
  }
  return Object.values(LogLevel).slice(0, levelsCount + 1);
}
