import { Button } from "@/components/Button";
import { CreateTaskForm } from "@/components/CreateTaskForm";
import { Header } from "@/components/Header";
import { TaskList } from "@/components/TaskList";
import { Wrapper } from "@/components/Wrapper";
import { useState } from "react";
import { TasksEmptyState } from "./TasksEmptyState";
import { Route } from "../route";
import PlusIcon from "@/assets/icons/Plus.svg?react";
import { FloatingButton } from "@/components/FloatingButton";
import type { ProjectColor } from "@/types/projects";

export function ProjectDetailPage() {
  const { project, tasks } = Route.useLoaderData();
  const [isCreating, setIsCreating] = useState(false);
  const isEmpty = tasks.length === 0;

  return (
    <Wrapper className="flex flex-col gap-300 pb-[640px]">
      <Header
        backLink={{ to: "/projetos", label: "projetos" }}
        title={project.name}
        color={(project.color as ProjectColor) ?? "gray"}
      >
        {!isEmpty && (
          <>
            <Button
              disabled={isCreating}
              variant="accent"
              className="hidden sm:flex"
              icon={<PlusIcon />}
              onClick={() => setIsCreating(true)}
            >
              criar tarefa
            </Button>
            {!isCreating && (
              <FloatingButton
                className="flex sm:hidden"
                onClick={() => setIsCreating(true)}
              />
            )}
          </>
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
