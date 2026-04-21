import { EmptyState } from "@/components/EmptyState";
import PlusIcon from "@/assets/icons/Plus.svg?react";
import { Button } from "@/components/Button";
import CheckListIcon from "@/assets/icons/CheckList.svg?react";

interface TasksEmptyStateProps {
  onCreate: () => void;
}

export function TasksEmptyState({ onCreate }: TasksEmptyStateProps) {
  return (
    <EmptyState
      icon={<CheckListIcon className="size-medium" />}
      description="adicione tarefas ao projeto para começar a fazer"
      action={
        <Button icon={<PlusIcon />} variant="accent" onClick={onCreate}>
          criar tarefa
        </Button>
      }
    />
  );
}
