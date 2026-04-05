import { Plus } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import TasksEmptyStateImage from "@/assets/tasks_empty_state.svg?react";

interface TasksEmptyStateProps {
  onCreate: () => void;
}

export function TasksEmptyState({ onCreate }: TasksEmptyStateProps) {
  return (
    <EmptyState
      image={<TasksEmptyStateImage />}
      title="tarefas"
      description="adicione tarefas ao projeto para começar a fazer"
      action={
        <Button icon={Plus} variant="accent" onClick={onCreate}>
          criar tarefa
        </Button>
      }
    />
  );
}
