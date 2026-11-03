import { MAX_DOCX_BYTES } from "@/lib/config";
import {
  PdfToolError,
  extractPdfText,
  importPdfLib,
  type ProgressCallbacks,
} from "@/lib/pdf/client";

export type DocxErrorCode =
  | "EMPTY"
  | "UNSUPPORTED"
  | "TOO_LARGE"
  | "INVALID"
  | "NO_TEXT"
  | "PROCESS_FAILED";

export class DocxToolError extends Error {
  code: DocxErrorCode;

  constructor(code: DocxErrorCode, message?: string) {
    super(message || code);
    this.name = "DocxToolError";
    this.code = code;
  }
}

export type DocxRenderResult = {
  blob: Blob;
  pageCount: number;
};

export type PdfToDocxResult = {
  blob: Blob;
  pageCount: number;
  textPages: number;
};

const PAGE_WIDTH_PX = 794;
const PAGE_HEIGHT_PX = 1123;
const PAGE_MARGIN_PX = 48;
const PAGE_CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - PAGE_MARGIN_PX * 2;
const RENDER_SCALE = 2;
const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const CONTENT_STYLE = `
  .ai2-docx-body {
    color: #111827;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    line-height: 1.55;
    word-wrap: break-word;
  }
  .ai2-docx-body p { margin: 0 0 12px; }
  .ai2-docx-body h1 { font-size: 26px; line-height: 1.25; margin: 0 0 14px; }
  .ai2-docx-body h2 { font-size: 22px; line-height: 1.3; margin: 4px 0 12px; }
  .ai2-docx-body h3 { font-size: 19px; line-height: 1.35; margin: 4px 0 10px; }
  .ai2-docx-body h4,
  .ai2-docx-body h5,
  .ai2-docx-body h6 { font-size: 16px; line-height: 1.4; margin: 4px 0 8px; }
  .ai2-docx-body ul,
  .ai2-docx-body ol { margin: 0 0 12px; padding-left: 24px; }
  .ai2-docx-body li { margin: 0 0 4px; }
  .ai2-docx-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 14px;
    font-size: 14px;
  }
  .ai2-docx-body td,
  .ai2-docx-body th {
    border: 1px solid #d1d5db;
    padding: 6px 8px;
    vertical-align: top;
    text-align: left;
  }
  .ai2-docx-body th { background: #f3f4f6; }
  .ai2-docx-body img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 0 12px;
  }
  .ai2-docx-body a { color: #1d4ed8; text-decoration: underline; }
  .ai2-docx-body blockquote {
    margin: 0 0 12px;
    padding: 6px 12px;
    border-left: 3px solid #cbd5e1;
    color: #4b5563;
  }
  .ai2-docx-body code,
  .ai2-docx-body pre {
    font-family: "Courier New", Courier, monospace;
    font-size: 13px;
    background: #f3f4f6;
  }
  .ai2-docx-body pre { padding: 8px 10px; overflow: hidden; white-space: pre-wrap; }
`;

function assertNotCancelled(shouldCancel?: () => boolean): void {
  if (shouldCancel?.()) {
    throw new PdfToolError("CANCELLED");
  }
}

function yieldToMainThread(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, 0);
  });
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new DocxToolError("PROCESS_FAILED", "Canvas encoding failed"));
      },
      "image/jpeg",
      quality
    );
  });
}

export function isDocxFile(file: File): boolean {
  return (
    file.name.toLowerCase().endsWith(".docx") ||
    file.type.toLowerCase() === DOCX_MIME
  );
}

export function validateDocxFile(file: File): DocxErrorCode | null {
  if (file.size === 0) return "EMPTY";
  if (!isDocxFile(file)) return "UNSUPPORTED";
  if (file.size > MAX_DOCX_BYTES) return "TOO_LARGE";
  return null;
}

function sanitizeDocxHtml(html: string): DocumentFragment {
  const template = document.createElement("template");
  template.innerHTML = html;

  template.content
    .querySelectorAll("script, iframe, object, embed, link, meta, style, form")
    .forEach((element) => element.remove());

  template.content.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      if (name.startsWith("on")) {
        element.removeAttribute(attribute.name);
        return;
      }
      if (
        (name === "href" || name === "src" || name === "xlink:href") &&
        /^\s*(javascript|data:text\/html)/i.test(attribute.value)
      ) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return template.content;
}

function computePageBreaks(container: HTMLElement, totalHeight: number): number[] {
  const breaks: number[] = [];
  let pageStart = 0;

  const blocks = Array.from(container.children).filter(
    (element): element is HTMLElement =>
      element instanceof HTMLElement && element.tagName !== "STYLE"
  );

  for (const block of blocks) {
    const blockTop = block.offsetTop;
    const blockBottom = blockTop + block.offsetHeight;

    while (blockBottom - pageStart > PAGE_CONTENT_HEIGHT_PX + 1) {
      const alignedCut =
        blockTop > pageStart &&
        blockTop - pageStart <= PAGE_CONTENT_HEIGHT_PX + 1;
      const cut = alignedCut ? blockTop : pageStart + PAGE_CONTENT_HEIGHT_PX;
      if (cut <= pageStart) break;
      breaks.push(cut);
      pageStart = cut;
    }
  }

  if (totalHeight - pageStart > 1) breaks.push(totalHeight);
  if (!breaks.length) {
    breaks.push(Math.max(1, Math.min(totalHeight, PAGE_CONTENT_HEIGHT_PX)));
  }
  return breaks;
}

export async function docxToPdf(
  file: File,
  callbacks: ProgressCallbacks = {}
): Promise<DocxRenderResult> {
  const basic = validateDocxFile(file);
  if (basic) throw new DocxToolError(basic);

  let html = "";
  try {
    const mammoth = await import("mammoth");
    const result = await mammoth.convertToHtml({
      arrayBuffer: await file.arrayBuffer(),
    });
    html = result.value;
  } catch {
    throw new DocxToolError("INVALID");
  }

  const stage = document.createElement("div");
  stage.setAttribute("aria-hidden", "true");
  stage.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    "width:794px",
    "background:#ffffff",
    "z-index:-1",
    "pointer-events:none",
  ].join(";");

  const style = document.createElement("style");
  style.textContent = CONTENT_STYLE;
  stage.appendChild(style);

  const container = document.createElement("div");
  container.className = "ai2-docx-body";
  container.style.cssText = [
    "position:relative",
    "width:794px",
    "padding:0 48px",
    "box-sizing:border-box",
    "background:#ffffff",
  ].join(";");
  stage.appendChild(container);
  document.body.appendChild(stage);

  try {
    container.appendChild(sanitizeDocxHtml(html));

    if (!container.textContent?.trim() && !container.querySelector("img, table")) {
      throw new DocxToolError("EMPTY");
    }

    const images = Array.from(container.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (image) =>
          new Promise<void>((resolve) => {
            if (image.complete) {
              resolve();
              return;
            }
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          })
      )
    );
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    assertNotCancelled(callbacks.shouldCancel);

    const totalHeight = Math.max(1, Math.ceil(container.scrollHeight));
    const breaks = computePageBreaks(container, totalHeight);

    const html2canvas = (await import("html2canvas")).default;
    const { PDFDocument } = await importPdfLib();
    const pdf = await PDFDocument.create();
    let previous = 0;

    for (let index = 0; index < breaks.length; index += 1) {
      assertNotCancelled(callbacks.shouldCancel);
      const end = breaks[index] ?? totalHeight;
      const height = Math.max(1, end - previous);

      const rendered = await html2canvas(container, {
        scale: RENDER_SCALE,
        backgroundColor: "#ffffff",
        logging: false,
        useCORS: false,
        width: PAGE_WIDTH_PX,
        height,
        x: 0,
        y: previous,
        windowWidth: PAGE_WIDTH_PX,
        windowHeight: PAGE_HEIGHT_PX,
        scrollX: 0,
        scrollY: 0,
      });

      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = PAGE_WIDTH_PX * RENDER_SCALE;
      pageCanvas.height = PAGE_HEIGHT_PX * RENDER_SCALE;
      const context = pageCanvas.getContext("2d", { alpha: false });
      if (!context) throw new DocxToolError("PROCESS_FAILED");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      context.drawImage(rendered, 0, PAGE_MARGIN_PX * RENDER_SCALE);

      const blob = await canvasToJpeg(pageCanvas, 0.92);
      const embedded = await pdf.embedJpg(await blob.arrayBuffer());
      const page = pdf.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
      page.drawImage(embedded, {
        x: 0,
        y: 0,
        width: A4_WIDTH_PT,
        height: A4_HEIGHT_PT,
      });

      rendered.width = 0;
      rendered.height = 0;
      pageCanvas.width = 0;
      pageCanvas.height = 0;
      previous = end;

      callbacks.onPage?.(index + 1, breaks.length);
      await yieldToMainThread();
    }

    assertNotCancelled(callbacks.shouldCancel);
    const bytes = await pdf.save({ useObjectStreams: true });
    return {
      blob: new Blob([new Uint8Array(bytes)], { type: "application/pdf" }),
      pageCount: pdf.getPageCount(),
    };
  } finally {
    stage.remove();
  }
}

export async function pdfToDocx(
  bytes: Uint8Array,
  callbacks: ProgressCallbacks = {}
): Promise<PdfToDocxResult> {
  const { pages, pageCount } = await extractPdfText(bytes, callbacks);
  const textPages = pages.filter((page) => page.text.trim().length > 0);

  if (!textPages.length) {
    throw new DocxToolError("NO_TEXT");
  }

  const { Document, Packer, Paragraph, TextRun } = await import("docx");
  const paragraphs: Array<InstanceType<typeof Paragraph>> = [];
  let started = false;

  for (const page of textPages) {
    const lines = page.text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (!lines.length) continue;

    lines.forEach((line, lineIndex) => {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line, size: 22, font: "Arial" })],
          spacing: { after: 120 },
          pageBreakBefore: started && lineIndex === 0,
        })
      );
    });
    started = true;
  }

  assertNotCancelled(callbacks.shouldCancel);

  const document = new Document({
    sections: [{ properties: {}, children: paragraphs }],
  });
  const blob = await Packer.toBlob(document);

  return { blob, pageCount, textPages: textPages.length };
}
