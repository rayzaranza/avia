import { Button } from "@/components/Button";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { Wrapper } from "@/components/Wrapper";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TasksEmptyState } from "./TasksEmptyState";
import { Route } from "../route";

export function ProjectDetailPage() {
  const { project, tasks } = Route.useLoaderData();
  const [isCreating, setIsCreating] = useState(false);
  const isEmpty = tasks.length === 0;

  return (
    <Wrapper className="flex flex-col gap-300 pb-[640px]">
      <Header backLink="/projetos" title={project.name}>
        {!isEmpty && (
          <Button
            disabled={isCreating}
            variant="accent"
            icon={Plus}
            onClick={() => setIsCreating(true)}
          >
            criar tarefa
          </Button>
        )}
      </Header>

      {isCreating && (
        <CreateTaskForm
          projectId={project.id}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {isEmpty && !isCreating ? (
        <TasksEmptyState onCreate={() => setIsCreating(true)} />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Wrapper>
  );
}
