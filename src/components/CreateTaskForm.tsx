import { Button } from "@/components/Button";
import { useEffect, useRef } from "react";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import AlertTriangleIcon from "@/assets/icons/AlertTriangle.svg?react";
import { useCreateTask } from "@/hooks/useCreateTask";
import { SubmitButton } from "./SubmitButton";

interface CreateTaskFormProps {
  projectId: string;
  onCancel: () => void;
}

export function CreateTaskForm({ projectId, onCancel }: CreateTaskFormProps) {
  const { handleCreateTask, error } = useCreateTask(projectId);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleFormAction(formData: FormData) {
    const { success } = await handleCreateTask(formData);
    if (success) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <form
        action={handleFormAction}
        onKeyDown={({ key }) => key === "Escape" && onCancel()}
        className="flex min-h-600 flex-wrap items-center gap-200 rounded-medium bg-container p-200 shadow-blocky-floating md:flex-nowrap"
      >
        <Input ref={inputRef} name="name" className="w-full" />

        <div className="flex w-full justify-end gap-100 md:w-auto">
          <Button onClick={onCancel}>cancelar</Button>
          <SubmitButton label="criar" loadingLoading="criando..." />
        </div>
      </form>

      {error && (
        <div className="ml-100 flex items-center gap-100 p-100 text-content-danger">
          <AlertTriangleIcon />
          <Text>{error}</Text>
        </div>
      )}
    </>
  );
}
