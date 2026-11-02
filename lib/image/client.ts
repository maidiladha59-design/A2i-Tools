import { MAX_IMAGE_BYTES } from "@/lib/config";

export type ImageOutputFormat = "auto" | "image/jpeg" | "image/png" | "image/webp";

export type ImageJobOptions = {
  format: ImageOutputFormat;
  quality?: number;
  targetBytes?: number | null;
  width?: number | null;
  height?: number | null;
  maxWidth?: number | null;
  maxHeight?: number | null;
  crop?: { x: number; y: number; width: number; height: number } | null;
};

export type ImageJobResult = {
  blob: Blob;
  width: number;
  height: number;
  sourceWidth: number;
  sourceHeight: number;
  format: string;
  quality: number | null;
  originalSize: number;
  targetBytes: number | null;
  targetMet: boolean | null;
  resized: boolean;
  attempts: number;
  durationMs: number;
};

export type ImageProgress = {
  stage: "decode" | "encode" | "search";
  attempt?: number;
  quality?: number | null;
  width?: number;
  height?: number;
};

export type ImageWorkerErrorCode =
  | "IMAGE_DECODE"
  | "UNSUPPORTED_BROWSER"
  | "UNSUPPORTED_FORMAT"
  | "CANVAS_FAILED"
  | "ENCODE_FAILED"
  | "PROCESS_FAILED"
  | "CANCELLED"
  | "BUSY";

export class ImageWorkerError extends Error {
  code: ImageWorkerErrorCode | string;

  constructor(code: ImageWorkerErrorCode | string, message?: string) {
    super(message || code);
    this.name = "ImageWorkerError";
    this.code = code;
  }
}

type ActiveJob = {
  id: number;
  resolve: (result: ImageJobResult) => void;
  reject: (error: Error) => void;
  onProgress?: (progress: ImageProgress) => void;
};

let worker: Worker | null = null;
let activeJob: ActiveJob | null = null;
let jobCounter = 0;

function handleMessage(event: MessageEvent) {
  const message = event.data as {
    id?: number;
    type?: string;
    code?: string;
    message?: string;
    stage?: ImageProgress["stage"];
    attempt?: number;
  } & Partial<ImageJobResult>;

  if (!activeJob || message.id !== activeJob.id) return;

  if (message.type === "progress") {
    activeJob.onProgress?.({
      stage: message.stage || "encode",
      attempt: message.attempt,
      quality: message.quality,
      width: message.width,
      height: message.height,
    });
    return;
  }

  const job = activeJob;
  activeJob = null;

  if (message.type === "done") {
    job.resolve(message as ImageJobResult);
    return;
  }

  job.reject(
    new ImageWorkerError(message.code || "PROCESS_FAILED", message.message)
  );
}

function getWorker(): Worker {
  if (typeof window === "undefined") {
    throw new ImageWorkerError("UNSUPPORTED_BROWSER", "Worker unavailable");
  }
  if (!worker) {
    worker = new Worker("/workers/image-compressor.js");
    worker.onmessage = handleMessage;
    worker.onerror = () => {
      const job = activeJob;
      activeJob = null;
      if (worker) {
        worker.terminate();
        worker = null;
      }
      job?.reject(new ImageWorkerError("PROCESS_FAILED", "Worker crashed"));
    };
  }
  return worker;
}

export function isImageWorkerSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Worker !== "undefined" &&
    typeof OffscreenCanvas !== "undefined" &&
    typeof createImageBitmap !== "undefined"
  );
}

export function compressImage(
  file: File,
  options: ImageJobOptions,
  onProgress?: (progress: ImageProgress) => void
): Promise<ImageJobResult> {
  return new Promise((resolve, reject) => {
    if (activeJob) {
      reject(new ImageWorkerError("BUSY", "Another image job is running"));
      return;
    }

    let instance: Worker;
    try {
      instance = getWorker();
    } catch (error) {
      reject(error);
      return;
    }

    jobCounter += 1;
    const id = jobCounter;
    activeJob = { id, resolve, reject, onProgress };

    try {
      instance.postMessage({ id, file, options });
    } catch (error) {
      activeJob = null;
      reject(
        error instanceof Error
          ? error
          : new ImageWorkerError("PROCESS_FAILED", String(error))
      );
    }
  });
}

export function cancelImageJobs(): void {
  const job = activeJob;
  activeJob = null;
  if (worker) {
    worker.terminate();
    worker = null;
  }
  job?.reject(new ImageWorkerError("CANCELLED", "Cancelled by user"));
}

const DEFAULT_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".bmp",
  ".gif",
  ".avif",
  ".heic",
  ".heif",
];

const SUPPORTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/bmp",
  "image/gif",
  "image/avif",
  "image/heic",
  "image/heif",
]);

export function isImageFile(file: File): boolean {
  if (SUPPORTED_MIME.has(file.type.toLowerCase())) return true;
  const name = file.name.toLowerCase();
  return DEFAULT_EXTENSIONS.some((extension) => name.endsWith(extension));
}

export type FileValidationCode =
  | "empty"
  | "unsupported"
  | "too-large";

export function validateImageFile(file: File): FileValidationCode | null {
  if (file.size === 0) return "empty";
  if (!isImageFile(file)) return "unsupported";
  if (file.size > MAX_IMAGE_BYTES) return "too-large";
  return null;
}

export async function readImageDimensions(
  file: File
): Promise<{ width: number; height: number } | null> {
  if (typeof createImageBitmap !== "function") return null;
  let bitmap: ImageBitmap | null = null;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    return { width: bitmap.width, height: bitmap.height };
  } catch {
    return null;
  } finally {
    bitmap?.close();
  }
}

export function extensionForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

export function outputFileName(
  originalName: string,
  mime: string,
  suffix = "compressed"
): string {
  const dot = originalName.lastIndexOf(".");
  const base = dot > 0 ? originalName.slice(0, dot) : originalName;
  return `${base}-${suffix}.${extensionForMime(mime)}`;
}
