import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe("Loader", () => {
  it("should render when loading true", async () => {
    const message = "test loading";
    render(<Loader loading={true} message={message} />);

    const component = screen.getByText(message);

    expect(component).toBeInTheDocument();
  });

  it("should not render when loading false", async () => {
    render(<Loader loading={false} />);

    const component = screen.queryByText("loading");

    expect(component).toBeNull();
  });
});
