import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

/**
 * Convert a markdown string to an HTML string.
 * Used server-side for project detail pages.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
}
