import { createProject } from "@/services/projects";
import type { ProjectColor } from "@/types/projects";
import { projectColors } from "@/utils/projectColors";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "a tarefa precisa de um nome")
    .max(96, "o nome da tarefa é muito longo"),
  color: z.enum(projectColors),
});

export function useCreateProject() {
  const [error, setError] = useState<{
    name?: string;
    color?: string;
    root?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleCreateProject(name: string, color: ProjectColor) {
    setIsLoading(true);
    setError({});
    const validation = projectSchema.safeParse({ name, color });

    if (validation.error) {
      setIsLoading(false);
      const zodErrors = z.flattenError(validation.error);
      setError({
        name: zodErrors?.fieldErrors?.name?.[0],
        color: zodErrors?.fieldErrors?.color?.[0],
      });
      return;
    }

    const { projectId, error: apiError } = await createProject({
      name: validation.data.name,
      color: validation.data.color,
    });

    if (apiError) {
      setIsLoading(false);
      setError({ root: apiError });
      return;
    }

    if (!projectId) {
      setIsLoading(false);
      setError({ root: "erro ao criar projeto, tente novamente" });
      return;
    }

    await navigate({ to: "/projetos/$id", params: { id: projectId } });
  }

  return { handleCreateProject, error, isLoading };
}
