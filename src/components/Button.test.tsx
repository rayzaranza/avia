import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { Button } from "./Button";

describe("Button", () => {
  test("renders as a button element", () => {
    render(<Button>text</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("displays text content", () => {
    render(<Button>text</Button>);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  test("displays icon when prop is provided", () => {
    render(<Button icon={Plus}>text</Button>);
    expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
  });

  test("calls click handler when clicked", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>text</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("ignores click handler when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        text
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });
});
