/**
 * Get the difference in days between now and the given date
 * @param date
 * @returns
 */
export function getIndexFromDate(date: Date): number {
  return Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
}
