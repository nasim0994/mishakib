export function dateInBD(dateStr: string | Date): Date {
  const date = new Date(dateStr);
  const bdOffsetInMs = 6 * 60 * 60 * 1000;
  return new Date(date.getTime() + bdOffsetInMs);
}
