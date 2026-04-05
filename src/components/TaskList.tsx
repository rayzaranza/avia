import { useTaskActions } from "@/hooks/useTaskActions";
import type { TaskListItem } from "@/types/tasks";
import { Task } from "./Task";

interface TaskListProps {
  tasks: TaskListItem[];
}

export function TaskList({ tasks }: TaskListProps) {
  const { handleDelete, handleToggle } = useTaskActions();
  return (
    <ul className="flex flex-col gap-200">
      {tasks.map(({ name, id, is_done }) => (
        <li key={id}>
          <Task
            name={name}
            isDone={is_done}
            onDelete={() => handleDelete(id)}
            onChange={(value) => handleToggle(id, value)}
          />
        </li>
      ))}
    </ul>
  );
}
