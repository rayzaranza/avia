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
import { EmptyState } from "@/components/EmptyState";
import { Header } from "@/components/Header";
import { cn } from "@/utils/classNames";
import { FloatingButton } from "@/components/FloatingButton";
import { ColorInput } from "@/components/ColorInput";
import type { ProjectColor } from "@/types/projects";

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
        <Header title="projetos" />
        <EmptyState
          icon={<FolderIcon className="size-medium" />}
          description="Use projetos para agrupar tarefas relacionadas e manter o foco"
          action={<CreateProjectButton />}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="flex flex-col gap-400 pb-[900px]">
      <Header title="projetos">
        <CreateProjectButton />
      </Header>

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
    </Wrapper>
  );
}

function CreateProjectButton() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState<string>();
  const [color, setColor] = useState<ProjectColor>("gray");
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
    const { projectId, error } = await createProject({ name, color });
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
      <ColorInput selectedColor={color} onChange={setColor} />
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
      <div>
        <Button
          className={cn(
            isOpen ? "pointer-events-none blocky-inset" : "pointer-events-auto",
            "hidden sm:flex",
          )}
          onClick={() => setIsOpen(true)}
          icon={<PlusIcon />}
          variant="accent"
        >
          criar projeto
        </Button>
        <FloatingButton onClick={() => setIsOpen(true)} className="sm:hidden" />
      </div>
    </Popover>
  );
}
