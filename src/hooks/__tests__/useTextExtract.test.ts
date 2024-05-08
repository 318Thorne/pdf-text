import { describe, expect, it, vi } from "vitest";
import { AcceptedLanguage, useTextExtract } from "../useTextExtract";
import { renderHook, waitFor } from "@testing-library/react";

const mocks = vi.hoisted(() => {
  return {
    terminate: vi.fn(),
    createWorker: vi.fn(),
  };
});

vi.mock("tesseract.js", async (importOriginal) => {
  const mod = await importOriginal<typeof import("tesseract.js")>();
  return {
    ...mod,
    createWorker: mocks.createWorker.mockResolvedValue({
      terminate: mocks.terminate,
    }),
  };
});

describe("useTextExtract", () => {
  it("creates a worker with the given language", async () => {
    const lang: AcceptedLanguage = "eng";

    renderHook(() => useTextExtract(lang));

    await waitFor(() => expect(mocks.createWorker).toHaveBeenCalledWith(lang));
  });

  it("terminates the worker when the language changes", async () => {
    const lang2: AcceptedLanguage = "deu";

    const { rerender } = renderHook(
      (props: AcceptedLanguage) => useTextExtract(props),
      {
        initialProps: "eng",
      }
    );

    await waitFor(() => expect(mocks.createWorker).toHaveBeenCalled());

    rerender(lang2);

    await waitFor(() => expect(mocks.terminate).toHaveBeenCalled());
  });
});
