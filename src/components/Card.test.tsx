import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  test("displays the card title", () => {
    render(<Card title="projeto" />);
    expect(screen.getByText("projeto")).toBeInTheDocument();
  });

  test("renders an icon", () => {
    render(<Card title="projeto" />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
