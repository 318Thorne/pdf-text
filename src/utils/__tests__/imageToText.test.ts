import { beforeEach, describe, it, vi, expect } from "vitest";
import { convertImagesToText } from "../imageToText";
import { createWorker } from "tesseract.js";

const mocks = vi.hoisted(() => {
  return {
    worker: {
      recognize: vi.fn().mockResolvedValue({
        data: { text: "text" },
      }),
      terminate: vi.fn(),
    },
  };
});

describe("imageToText", () => {
  beforeEach(() => {
    vi.mock("tesseract.js", async (importOriginal) => {
      const mod = await importOriginal<typeof import("tesseract.js")>();
      return {
        ...mod,
        createWorker: vi.fn().mockResolvedValue(mocks.worker),
      };
    });
  });

  it("should call Tesseract.recognize with images", async () => {
    const images = ["image1", "image2"];

    const result = await convertImagesToText(images);

    expect(createWorker).toHaveBeenCalledWith("eng");
    expect(mocks.worker.recognize).toHaveBeenCalledWith(images[0]);
    expect(mocks.worker.recognize).toHaveBeenCalledWith(images[1]);
    expect(mocks.worker.terminate).toHaveBeenCalled();
    expect(result).toBe("text\ntext");
  });
});
