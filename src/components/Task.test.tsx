import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Task } from "./Task";

const noop = async () => {};

describe("Task", () => {
  test("displays task name", () => {
    render(
      <Task
        name="comprar leite"
        isDone={false}
        onChange={noop}
        onDelete={noop}
      />,
    );
    expect(screen.getByText("comprar leite")).toBeInTheDocument();
  });

  test("renders checkbox as checked when isDone is true", () => {
    render(
      <Task name="tarefa" isDone={true} onChange={noop} onDelete={noop} />,
    );
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("renders checkbox as unchecked when isDone is false", () => {
    render(
      <Task name="tarefa" isDone={false} onChange={noop} onDelete={noop} />,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("applies line-through when isDone is true", () => {
    render(
      <Task name="tarefa" isDone={true} onChange={noop} onDelete={noop} />,
    );
    expect(screen.getByText("tarefa")).toHaveClass("line-through");
  });

  test("does not apply line-through when isDone is false", () => {
    render(
      <Task name="tarefa" isDone={false} onChange={noop} onDelete={noop} />,
    );
    expect(screen.getByText("tarefa")).not.toHaveClass("line-through");
  });

  test("calls onChange with true when unchecked checkbox is clicked", async () => {
    const onChange = vi.fn().mockResolvedValue(undefined);
    render(
      <Task name="tarefa" isDone={false} onChange={onChange} onDelete={noop} />,
    );
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test("calls onChange with false when checked checkbox is clicked", async () => {
    const onChange = vi.fn().mockResolvedValue(undefined);
    render(
      <Task name="tarefa" isDone={true} onChange={onChange} onDelete={noop} />,
    );
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  test("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    render(
      <Task name="tarefa" isDone={false} onChange={noop} onDelete={onDelete} />,
    );
    await userEvent.click(screen.getByTitle("excluir tarefa"));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  test("disables checkbox when isDeleting is true", () => {
    render(
      <Task
        name="tarefa"
        isDone={false}
        onChange={noop}
        isDeleting={true}
        onDelete={noop}
      />,
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  test("shows check icon when isDone is true", () => {
    render(
      <Task name="tarefa" isDone={true} onChange={noop} onDelete={noop} />,
    );
    expect(document.querySelector("svg")).toBeInTheDocument();
  });

  test("optimistically checks checkbox before onChange resolves", async () => {
    let resolve: () => void;
    const onChange = vi.fn().mockReturnValue(
      new Promise<void>((r) => {
        resolve = r;
      }),
    );
    render(
      <Task name="tarefa" isDone={false} onChange={onChange} onDelete={noop} />,
    );
    await userEvent.click(screen.getByRole("checkbox"));
    await waitFor(() => {
      expect(screen.getByRole("checkbox")).toBeChecked();
    });
    resolve!();
  });
});
