import type { TaskListItem } from "@/types/tasks";
import { Task } from "./Task";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useDeleteTask } from "@/hooks/useDeleteTask";

interface TaskListProps {
  tasks: TaskListItem[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { handleToggle } = useUpdateTask();
  const { handleDelete, isDeleting } = useDeleteTask();

  return (
    <ul className="flex flex-col gap-200">
      {tasks.map(({ name, id, is_done }) => (
        <li key={id}>
          <Task
            name={name}
            isDone={is_done}
            onToggle={(value) => handleToggle(id, value)}
            onDelete={() => handleDelete(id)}
            isDeleting={isDeleting(id)}
          />
        </li>
      ))}
    </ul>
  );
}
