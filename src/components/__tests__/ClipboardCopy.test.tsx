import { describe, vi, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ClipboardCopy } from "../ClipboardCopy";

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe("ClipboardCopy", () => {
  it("should copy text to clipboard when clicked", async () => {
    const textToCopy = "text";
    vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);

    render(<ClipboardCopy textToCopy={textToCopy} />);

    const copyButton = screen.getByRole("button");
    await fireEvent.click(copyButton);

    const copied = await screen.findByText("copied!");
    expect(copied).toBeInTheDocument();
  });
});
