import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Task } from "./Task";
import { vi, describe, test, expect } from "vitest";

const noop = async () => {};

describe("Task", () => {
  test("displays task name", () => {
    render(
      <Task
        name="comprar leite"
        isDone={false}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(screen.getByText("comprar leite")).toBeInTheDocument();
  });

  test("renders checkbox as checked when isDone is true", () => {
    render(
      <Task
        name="tarefa"
        isDone={true}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("renders checkbox as unchecked when isDone is false", () => {
    render(
      <Task
        name="tarefa"
        isDone={false}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("applies line-through when isDone is true", () => {
    render(
      <Task
        name="tarefa"
        isDone={true}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(screen.getByText("tarefa")).toHaveClass("line-through");
  });

  test("does not apply line-through when isDone is false", () => {
    render(
      <Task
        name="tarefa"
        isDone={false}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(screen.getByText("tarefa")).not.toHaveClass("line-through");
  });

  test("calls onToggle with true when unchecked checkbox is clicked", async () => {
    const onToggle = vi.fn().mockResolvedValue(undefined);
    render(
      <Task
        name="tarefa"
        isDone={false}
        onToggle={onToggle}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  test("shows check icon when isDone is true", () => {
    render(
      <Task
        name="tarefa"
        isDone={true}
        onToggle={noop}
        onDelete={noop}
        isDeleting={false}
      />,
    );
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  test("optimistically checks checkbox before onToggle resolves", async () => {
    let resolvePromise: () => void;
    const onToggle = vi.fn().mockReturnValue(
      new Promise<void>((r) => {
        resolvePromise = r;
      }),
    );

    render(
      <Task
        name="tarefa"
        isDone={false}
        onToggle={onToggle}
        onDelete={noop}
        isDeleting={false}
      />,
    );

    await act(async () => {
      await userEvent.click(screen.getByRole("checkbox"));
    });

    expect(screen.getByRole("checkbox")).toBeChecked();

    await act(async () => {
      resolvePromise!();
    });
  });
});
