export const formatTimestamp = (timestampInMs: number) => {
  const date = new Date(timestampInMs);
  const formattedDate = date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
