import { createTask } from "@/services/tasks";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

const taskNameSchema = z
  .string()
  .trim()
  .min(1, "a tarefa precisa de um nome")
  .max(96, "o nome da tarefa é muito longo");

export function useCreateTask(projectId: string) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreateTask(formData: FormData) {
    setIsLoading(true);
    setErrorMessage("");
    const name = formData.get("name");
    const validation = taskNameSchema.safeParse(name);

    if (validation.error) {
      setIsLoading(false);
      setErrorMessage(
        validation.error.issues[0]?.message ?? "erro de validação",
      );
      return;
    }

    const { error } = await createTask({
      name: validation.data,
      project_id: projectId,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error);
      return;
    }

    await router.invalidate({ sync: true });
    setErrorMessage("");
    setIsLoading(false);
    return;
  }

  return { handleCreateTask, error: errorMessage, isLoading };
}
