export const getTruncatedSearchedText = (
  text: string,
  query: string,
  maxLength: number
) => {
  const queryIndex = text.toLowerCase().indexOf(query.toLowerCase());

  if (queryIndex === -1) return text;

  const start = Math.max(0, queryIndex - Math.floor(maxLength / 2));
  const end = Math.min(
    text.length,
    queryIndex + query.length + Math.floor(maxLength / 2)
  );

  let truncated = text.substring(start, end).trim();

  if (truncated.length > maxLength) {
    if (start > 0) truncated = "..." + truncated;
    if (end < text.length) truncated += "...";
  }

  return truncated;
};
