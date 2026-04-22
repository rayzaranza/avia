import { Button } from "@/components/Button";
import { useEffect, useRef, type SubmitEvent } from "react";
import { Input } from "@/components/Input";
import { useCreateTask } from "@/hooks/useCreateTask";
import { SubmitButton } from "./SubmitButton";
import { ErrorMessage } from "./ErrorMessage";

interface CreateTaskFormProps {
  projectId: string;
  onCancel: () => void;
}

export function CreateTaskForm({ projectId, onCancel }: CreateTaskFormProps) {
  const { handleCreateTask, error, isLoading } = useCreateTask(projectId);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleFormAction(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { success } = await handleCreateTask(formData);
    if (success) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <form
        onSubmit={handleFormAction}
        onKeyDown={({ key }) => key === "Escape" && onCancel()}
        className="flex min-h-600 flex-wrap items-center gap-200 rounded-medium bg-container p-200 shadow-blocky-floating md:flex-nowrap"
      >
        <Input ref={inputRef} name="name" className="w-full" />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="flex w-full justify-end gap-100 md:w-auto">
          <Button onClick={onCancel}>cancelar</Button>
          <SubmitButton label="criar" isLoading={isLoading} />
        </div>
      </form>
    </>
  );
}
