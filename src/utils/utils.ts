export const toSplitLines = (str: string): string[] => {
  const lines = str
    .split('\n')
    .filter(Boolean)
    .map((line) => line.replace(/\r/g, ''));

  return Array.from(new Set(lines));
};
