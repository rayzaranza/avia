import { Button } from "@/components/Button";
import { getProjectById } from "@/services/projects";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTasks } from "@/services/tasks";
import { EmptyState } from "@/components/EmptyState";
import { ProjectDetailPage } from "../../components/ProjectDetailPage";
import { ProjectDetailPageSkeleton } from "../../components/ProjectDetailPageSkeleton";

export const Route = createFileRoute("/_authenticated/projetos/$id")({
  loader: async ({ params: { id } }) => {
    const [projectResponse, tasksResponse] = await Promise.all([
      getProjectById(id),
      getTasks(id),
    ]);
    if (projectResponse.error || !projectResponse.project) {
      throw notFound();
    }
    if (tasksResponse.error) {
      throw new Error("erro ao carregar tarefas");
    }
    return {
      project: projectResponse.project,
      tasks: tasksResponse.tasks ?? [],
    };
  },
  component: ProjectDetailPage,
  pendingComponent: ProjectDetailPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 500,
  errorComponent: ({ error, reset }) => (
    <EmptyState
      description={error.message}
      action={
        <Button onClick={reset} variant="accent">
          tentar novamente
        </Button>
      }
    />
  ),
  notFoundComponent: () => (
    <EmptyState
      description="projeto não encontrado"
      action={
        <Button onClick={() => window.history.back()} variant="accent">
          voltar
        </Button>
      }
    />
  ),
});
