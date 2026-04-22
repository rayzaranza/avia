import { Button } from "@/components/Button";
import { useRef, type SubmitEvent } from "react";
import { Input } from "@/components/Input";
import { useCreateTask } from "@/hooks/useCreateTask";
import { SubmitButton } from "./SubmitButton";

interface CreateTaskFormProps {
  projectId: string;
  onCancel: () => void;
}

export function CreateTaskForm({ projectId, onCancel }: CreateTaskFormProps) {
  const { handleCreateTask, error, isLoading } = useCreateTask(projectId);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFormAction(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await handleCreateTask(formData);

    if (!error) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleFormAction}
      onKeyDown={({ key }) => key === "Escape" && onCancel()}
      className="flex min-h-600 flex-wrap items-start gap-200 rounded-medium bg-container p-200 shadow-blocky-floating md:flex-nowrap"
    >
      <Input
        ref={inputRef}
        name="name"
        className="w-full"
        error={error}
        autoFocus
      />
      <div className="mt-[0.1rem] flex w-full justify-end gap-100 md:w-auto">
        <Button onClick={onCancel}>cancelar</Button>
        <SubmitButton label="criar" isLoading={isLoading} />
      </div>
    </form>
  );
}
