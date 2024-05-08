import { describe, vi, it, expect } from "vitest";
import { render, renderHook, screen } from "@testing-library/react";
import { Dropzone } from "../Dropzone";
import { useDropzone } from "react-dropzone";

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe("Dropzone", () => {
  it("should render", async () => {
    const { result } = renderHook(() => useDropzone());

    render(<Dropzone {...result.current} />);

    const component = screen.getByText(
      "Drag 'n' drop your pdf here, or click to select a file"
    );

    expect(component).toBeInTheDocument();
  });

  it("should render custom error message", async () => {
    const { result } = renderHook(() => useDropzone());

    render(
      <Dropzone
        {...result.current}
        fileRejections={[
          {
            file: new File([""], "file.pdf"),
            errors: [{ code: "file-invalid-type", message: "error" }],
          },
        ]}
        customErrors={{
          "file-invalid-type": "Custom error message",
        }}
      />
    );

    const errorMessage = screen.getByText("Custom error message");

    expect(errorMessage).toBeInTheDocument();
  });
});
