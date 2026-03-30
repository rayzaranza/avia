import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text", () => {
  test("renders as a heading 1 element", () => {
    render(<Text variant="h1">texto</Text>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  test("renders as a heading 2 element", () => {
    render(<Text variant="h2">texto</Text>);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  test("renders as a heading 3 element", () => {
    render(<Text variant="h3">texto</Text>);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  test("renders as a paragraph element", () => {
    render(<Text variant="body">texto</Text>);
    expect(document.querySelector("p")).toBeInTheDocument();
  });

  test("renders as a span element", () => {
    render(<Text variant="caption">texto</Text>);
    expect(document.querySelector("span")).toBeInTheDocument();
  });

  test("renders as a paragraph element if no variant is provided", () => {
    render(<Text>texto</Text>);
    expect(document.querySelector("p")).toBeInTheDocument();
  });

  test("displays text content", () => {
    render(<Text>texto</Text>);
    expect(screen.getByText("texto")).toBeInTheDocument();
  });
});
