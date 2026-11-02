import { describe, expect, it } from "vitest";
import {
  clamp,
  moveDown,
  moveItem,
  moveUp,
  safeFileName,
  uniqueName,
} from "@/lib/utils";

describe("moveItem", () => {
  const items = ["a", "b", "c", "d"];

  it("moves an item forward", () => {
    expect(moveItem(items, 0, 2)).toEqual(["b", "c", "a", "d"]);
  });

  it("moves an item backward", () => {
    expect(moveItem(items, 3, 1)).toEqual(["a", "d", "b", "c"]);
  });

  it("does not mutate the source", () => {
    const copy = [...items];
    moveItem(items, 0, 3);
    expect(items).toEqual(copy);
  });

  it("returns the original array for invalid indexes or no-op moves", () => {
    expect(moveItem(items, 1, 1)).toBe(items);
    expect(moveItem(items, -1, 2)).toBe(items);
    expect(moveItem(items, 1, 9)).toBe(items);
  });
});

describe("moveUp and moveDown", () => {
  it("swaps with neighbours", () => {
    expect(moveUp(["a", "b", "c"], 1)).toEqual(["b", "a", "c"]);
    expect(moveDown(["a", "b", "c"], 1)).toEqual(["a", "c", "b"]);
  });

  it("handles edges without change", () => {
    const items = ["a", "b"];
    expect(moveUp(items, 0)).toBe(items);
    expect(moveDown(items, 1)).toBe(items);
  });
});

describe("uniqueName", () => {
  it("keeps the first name and suffixes duplicates", () => {
    const used = new Set<string>();
    expect(uniqueName("photo.jpg", used)).toBe("photo.jpg");
    expect(uniqueName("photo.jpg", used)).toBe("photo (2).jpg");
    expect(uniqueName("photo.jpg", used)).toBe("photo (3).jpg");
  });

  it("handles names without an extension", () => {
    const used = new Set<string>(["README"]);
    expect(uniqueName("README", used)).toBe("README (2)");
  });
});

describe("safeFileName", () => {
  it("removes path and reserved characters", () => {
    expect(safeFileName('a/b\\c:d*e?f"g<h>i|j')).toBe("a-b-c-d-e-f-g-h-i-j");
  });

  it("falls back when the name is empty", () => {
    expect(safeFileName("   ")).toBe("file");
    expect(safeFileName("", "output")).toBe("output");
  });
});

describe("clamp", () => {
  it("keeps values inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(20, 0, 10)).toBe(10);
  });
});
