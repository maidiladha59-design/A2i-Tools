import {
  Crop,
  FileArchive,
  ImageDown,
  LayoutGrid,
  Merge,
  Repeat2,
  Scaling,
  Target,
  type LucideIcon,
} from "lucide-react";

export type ToolId =
  | "imageCompress"
  | "imageResize"
  | "imageConvert"
  | "imageCrop"
  | "pdfCompress"
  | "pdfReduce"
  | "pdfOrganize"
  | "pdfMerge";

export type ToolGroup = "image" | "pdf";

export type ToolDefinition = {
  id: ToolId;
  href: string;
  group: ToolGroup;
  icon: LucideIcon;
  popular?: boolean;
};

export const TOOLS: ToolDefinition[] = [
  {
    id: "imageCompress",
    href: "/image/compress",
    group: "image",
    icon: ImageDown,
    popular: true,
  },
  {
    id: "imageResize",
    href: "/image/resize",
    group: "image",
    icon: Scaling,
  },
  {
    id: "imageConvert",
    href: "/image/convert",
    group: "image",
    icon: Repeat2,
  },
  {
    id: "imageCrop",
    href: "/image/crop",
    group: "image",
    icon: Crop,
  },
  {
    id: "pdfCompress",
    href: "/pdf/compress",
    group: "pdf",
    icon: FileArchive,
    popular: true,
  },
  {
    id: "pdfReduce",
    href: "/pdf/reduce",
    group: "pdf",
    icon: Target,
    popular: true,
  },
  {
    id: "pdfOrganize",
    href: "/pdf/organize",
    group: "pdf",
    icon: LayoutGrid,
  },
  {
    id: "pdfMerge",
    href: "/pdf/merge",
    group: "pdf",
    icon: Merge,
    popular: true,
  },
];

export const IMAGE_TOOLS = TOOLS.filter((tool) => tool.group === "image");
export const PDF_TOOLS = TOOLS.filter((tool) => tool.group === "pdf");

export function getTool(id: ToolId): ToolDefinition {
  const tool = TOOLS.find((entry) => entry.id === id);
  if (!tool) throw new Error(`Unknown tool: ${id}`);
  return tool;
}

export function relatedTools(current: ToolId, count = 3): ToolDefinition[] {
  const sameGroup = TOOLS.filter(
    (tool) => tool.id !== current && tool.group === getTool(current).group
  );
  const others = TOOLS.filter(
    (tool) => tool.id !== current && tool.group !== getTool(current).group
  );
  return [...sameGroup, ...others].slice(0, count);
}
