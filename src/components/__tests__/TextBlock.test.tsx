import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { TextBlock } from "../TextBlock";

describe("TextBlock", () => {
  it("should render when text is passed", async () => {
    const text = "test";
    render(<TextBlock text={text} />);

    const component = screen.getByText(text);

    expect(component).toBeInTheDocument();
  });
});
