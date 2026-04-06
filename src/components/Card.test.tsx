import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { TreePalm } from "lucide-react";

const noop = async () => {};

describe("Card", () => {
  test("displays the card title", () => {
    render(<Card title="projeto" onDelete={noop} isDeleting={false} />);
    expect(screen.getByText("projeto")).toBeInTheDocument();
  });

  test("renders an icon", () => {
    render(
      <Card
        title="projeto"
        icon={TreePalm}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
