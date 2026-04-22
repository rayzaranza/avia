import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Wrapper } from "@/components/Wrapper";
import { useState } from "react";
import FolderIcon from "@/assets/icons/Folder.svg?react";
import PlusIcon from "@/assets/icons/Plus.svg?react";
import { getProjects } from "@/services/projects";
import { Card } from "@/components/Card";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { ProjectsPageSkeleton } from "@/components/ProjectsPageSkeleton";
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { cn } from "@/utils/classNames";
import { FloatingButton } from "@/components/FloatingButton";
import type { ProjectColor } from "@/types/projects";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";

export const Route = createFileRoute("/_authenticated/projetos/")({
  component: ProjectsPage,
  loader: async () => {
    const { projects, error } = await getProjects();
    return { projects, error };
  },
  pendingMs: 0,
  pendingComponent: ProjectsPageSkeleton,
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();
  const { isDeleting, handleDelete } = useDeleteProject();
  const [showDialog, setShowDialog] = useState(false);
  const isEmpty = projects?.length === 0;

  const createProjectButton = (
    <>
      <Button
        className={cn("hidden sm:flex")}
        onClick={() => setShowDialog(true)}
        icon={<PlusIcon />}
        variant="accent"
        disabled={showDialog}
      >
        criar projeto
      </Button>
      {!showDialog && (
        <FloatingButton
          onClick={() => setShowDialog(true)}
          className="sm:hidden"
        />
      )}
    </>
  );

  return (
    <Wrapper className="flex flex-col gap-400 pb-[900px]">
      <Header title="projetos">{!isEmpty && createProjectButton}</Header>

      {isEmpty ? (
        <EmptyState
          icon={<FolderIcon className="size-medium" />}
          description="Use projetos para agrupar tarefas relacionadas e manter o foco"
          action={createProjectButton}
        />
      ) : (
        <ul className="grid grid-cols-1 gap-200 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map(({ id, name, color }) => (
            <li key={id}>
              <Card
                to="/projetos/$id"
                color={color as ProjectColor}
                params={{ id }}
                title={name}
                onDelete={() => handleDelete(id)}
                isDeleting={isDeleting(id)}
              />
            </li>
          ))}
        </ul>
      )}

      <CreateProjectDialog
        onCancel={() => setShowDialog(false)}
        isOpen={showDialog}
      />
    </Wrapper>
  );
}
