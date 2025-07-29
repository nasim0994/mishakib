const stripHtml = (html: string): string => {
  return html.replace(/<[^>]+>/g, "");
};

export const getShortDescription = (
  html: string = "",
  limit: number = 800
): string => {
  const plainText = stripHtml(html);
  return plainText.length > limit
    ? plainText.slice(0, limit) + "..."
    : plainText;
};
