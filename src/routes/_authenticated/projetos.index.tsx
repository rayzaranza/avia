import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Wrapper } from "@/components/Wrapper";
import { Popover } from "react-tiny-popover";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/Input";
import FolderIcon from "@/assets/icons/Folder.svg?react";
import PlusIcon from "@/assets/icons/Plus.svg?react";
import { PopoverContainer } from "@/components/PopoverContainer";
import { createProject, getProjects } from "@/services/projects";
import { Card } from "@/components/Card";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { ProjectsPageSkeleton } from "@/components/ProjectsPageSkeleton";

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

  if (projects?.length === 0) {
    return (
      <Wrapper>
        <main>
          <section className="flex flex-col items-center gap-100 pt-200 text-center">
            <EmptyStateIcon />
            <div className="flex flex-col gap-100">
              <Text variant="h2">crie seu primeiro projeto</Text>
              <Text>
                Use projetos para agrupar tarefas relacionadas e manter o foco.
              </Text>
            </div>
            <CreateProjectButton />
          </section>
        </main>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="flex flex-col gap-400 pb-[900px]">
      <header className="flex flex-wrap items-center justify-between gap-100">
        <Text variant="h1">projetos</Text>
        <CreateProjectButton />
      </header>

      <ul className="grid grid-cols-1 gap-200 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map(({ id, name }) => (
          <li key={id}>
            <Card
              to="/projetos/$id"
              params={{ id }}
              title={name}
              onDelete={() => handleDelete(id)}
              isDeleting={isDeleting(id)}
            />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}

function CreateProjectButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  async function handleCreateProject() {
    if (!name) {
      return;
    }
    setIsLoading(true);
    const { projectId, error } = await createProject({ name });
    setIsLoading(false);
    if (error) {
      setError(error);
      return;
    }
    if (projectId) {
      await navigate({ to: "/projetos/$id", params: { id: projectId } });
    }
  }

  const container = (
    <PopoverContainer>
      <Input
        ref={inputRef}
        label="nome do projeto"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && <Text>não deu certo</Text>}
      <div className="flex w-full justify-end gap-100">
        <Button onClick={() => setIsOpen(false)}>cancelar</Button>
        <Button
          disabled={!name}
          onClick={handleCreateProject}
          variant="accent"
          isLoading={isLoading}
        >
          {isLoading ? "criando..." : "criar"}
        </Button>
      </div>
    </PopoverContainer>
  );

  return (
    <Popover
      positions={["bottom", "top"]}
      isOpen={isOpen}
      containerClassName="z-100"
      content={container}
    >
      <Button
        className={
          isOpen ? "pointer-events-none blocky-inset" : "pointer-events-auto"
        }
        onClick={() => setIsOpen(true)}
          icon={<PlusIcon />}
        variant="accent"
      >
        criar projeto
      </Button>
    </Popover>
  );
}
