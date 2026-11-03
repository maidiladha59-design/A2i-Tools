import type { BlogPost } from "@/content/blog/types";
import type { ToolId } from "@/lib/tools/registry";
import { compressPhotoForRegistration } from "@/content/blog/posts/compress-photo-for-registration";
import { jpgPngWebpDifferences } from "@/content/blog/posts/jpg-png-webp-differences";
import { mergePdfFilesGuide } from "@/content/blog/posts/merge-pdf-files-guide";
import { organizeScannedPdfPages } from "@/content/blog/posts/organize-scanned-pdf-pages";
import { privacyOfBrowserFileTools } from "@/content/blog/posts/privacy-of-browser-file-tools";
import { shrinkPdfWithoutLosingQuality } from "@/content/blog/posts/shrink-pdf-without-losing-quality";

export const BLOG_POSTS: BlogPost[] = [
  compressPhotoForRegistration,
  jpgPngWebpDifferences,
  mergePdfFilesGuide,
  organizeScannedPdfPages,
  privacyOfBrowserFileTools,
  shrinkPdfWithoutLosingQuality,
].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

const EXTRA_POSTS_FOR_TOOL: Partial<Record<ToolId, string[]>> = {
  imageToPdf: ["jpg-png-webp-differences", "compress-photo-for-registration"],
  pdfToImage: ["organize-scanned-pdf-pages", "shrink-pdf-without-losing-quality"],
  docxToPdf: ["privacy-of-browser-file-tools"],
  pdfToDocx: ["privacy-of-browser-file-tools", "shrink-pdf-without-losing-quality"],
};

export function postsForTool(toolId: ToolId, limit = 2): BlogPost[] {
  const matches = BLOG_POSTS.filter((post) =>
    post.relatedTools.includes(toolId)
  );
  const extras = (EXTRA_POSTS_FOR_TOOL[toolId] ?? [])
    .map((slug) => getPost(slug))
    .filter((post): post is BlogPost => post !== undefined);
  const seen = new Set<string>();
  return [...matches, ...extras]
    .filter((post) => {
      if (seen.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    })
    .slice(0, limit);
}
