import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  beforeEach(() => {
    render(<Input label="email" />);
  });

  test("renders as input element", () => {
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("displays label when prop is provided", () => {
    expect(screen.getByText("email")).toBeInTheDocument();
  });

  test("binds label with input", () => {
    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  test("accepts user input", async () => {
    const input = screen.getByLabelText("email");
    const value = "email@exemplo.com";
    await userEvent.type(input, value);
    expect(input).toHaveValue(value);
  });
});
