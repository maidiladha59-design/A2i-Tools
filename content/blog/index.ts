import type { BlogPost } from "@/content/blog/types";
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
