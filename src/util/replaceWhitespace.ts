export default function replaceWhitespace(
  stringWithWhitespace: string,
  replaceWhitespaceWith: string
): string {
  return stringWithWhitespace.replace(/\s/g, replaceWhitespaceWith);
}
