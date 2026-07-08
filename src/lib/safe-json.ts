/**
 * Serialise data for embedding inside a <script> tag. Standard JSON.stringify
 * output can contain '</script>' inside a string value (e.g. if a CMS field
 * holds HTML), which lets an attacker close the script tag and inject
 * arbitrary HTML. This escapes the characters that let that happen.
 *
 * U+2028 (line separator) and U+2029 (paragraph separator) are also escaped —
 * unescaped they'd terminate a JS string literal even inside JSON, breaking
 * the page. We build those two regexes with `new RegExp(" ", "g")`
 * rather than as literal regex sources so the TypeScript tokenizer doesn't
 * treat the raw characters as line breaks.
 */
const LINE_SEP      = new RegExp(" ", "g");
const PARAGRAPH_SEP = new RegExp(" ", "g");

export function safeJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g,         "\\u003c")
    .replace(/>/g,         "\\u003e")
    .replace(/&/g,         "\\u0026")
    .replace(LINE_SEP,     "\\u2028")
    .replace(PARAGRAPH_SEP,"\\u2029");
}
