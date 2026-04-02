import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Text } from "@/components/Text";
import { Button } from "@/components/Button";
import { Plus } from "lucide-react";
import { Wrapper } from "@/components/Wrapper";
import { Popover } from "react-tiny-popover";
import { useState } from "react";
import { Input } from "@/components/Input";
import EmptyStateIcon from "@/assets/empty_state.svg?react";
import { PopoverContainer } from "@/components/PopoverContainer";
import { createProject, getProjects } from "@/services/projects";
import { Card } from "@/components/Card";

export const Route = createFileRoute("/_authenticated/projetos/")({
  component: ProjectsPage,
  loader: async () => {
    const { projects, error } = await getProjects();
    return { projects, error };
  },
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();

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
            <CreateProjectPopover />
          </section>
        </main>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="flex flex-col gap-400">
      <header className="flex flex-wrap items-center justify-between gap-100">
        <Text variant="h1">projetos</Text>
        <CreateProjectPopover />
      </header>

      <div className="grid grid-cols-1 gap-200 sm:grid-cols-2 lg:grid-cols-3">
        {projects?.map(({ id, name }) => (
          <Link key={id} to="/projetos/$id" params={{ id }}>
            <Card title={name} />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
}

function CreateProjectPopover() {
  const navigate = useNavigate();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [name, setName] = useState<string>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

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
        autoFocus
        label="nome do projeto"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && <Text>não deu certo</Text>}
      <div className="gap-2 flex justify-end">
        <Button onClick={() => setIsPopoverOpen(false)}>cancelar</Button>
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
      isOpen={isPopoverOpen}
      content={container}
    >
      <Button
        className={
          isPopoverOpen
            ? "pointer-events-none blocky-inset"
            : "pointer-events-auto"
        }
        onClick={() => setIsPopoverOpen(true)}
        icon={Plus}
        variant="accent"
      >
        criar projeto
      </Button>
    </Popover>
  );
}
