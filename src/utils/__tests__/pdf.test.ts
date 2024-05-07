import { describe, it, expect, vi, beforeEach } from "vitest";
import { convertToImage, getPdfFromBuffer } from "../pdf";
import * as pdfjs from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

describe("getPdfFromBuffer", () => {
  beforeEach(() => {
    vi.mock("pdfjs-dist", async (importOriginal) => {
      const mod = await importOriginal<typeof import("pdfjs-dist")>();
      return {
        ...mod,
        getDocument: vi.fn().mockResolvedValue({}),
      };
    });
  });

  it("should call pdfjs.getDocument with buffer", async () => {
    const buffer = new ArrayBuffer(10);

    vi.spyOn(pdfjs, "getDocument");

    await getPdfFromBuffer(buffer);
    expect(pdfjs.getDocument).toHaveBeenCalledWith({ data: buffer });
  });
});

describe("convertToImage", () => {
  it("should return images for each page", async () => {
    const pdf = {
      numPages: 2,
      getPage: vi.fn().mockResolvedValue({
        getViewport: vi.fn().mockReturnValue({ height: 100, width: 100 }),
        render: vi.fn().mockResolvedValue({}),
      }),
    } as unknown as PDFDocumentProxy;

    const images = await convertToImage(pdf);
    expect(pdf.getPage).toHaveBeenCalledTimes(2);
    expect(images).toHaveLength(2);
  });
});
