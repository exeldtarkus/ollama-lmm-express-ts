const extractPlaceNames = (text: string): string[] => {
  const lines = text.split('\n');
  return lines
    .map(line => {
      const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
      return match ? match[1].trim() : null;
    })
    .filter(Boolean) as string[];
};
export {extractPlaceNames};
