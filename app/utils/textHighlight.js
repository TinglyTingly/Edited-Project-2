export function highlightText(text, highlight) {
  if (!highlight.trim()) {
    return text;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}
