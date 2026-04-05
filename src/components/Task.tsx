import { Check, Trash2 } from "lucide-react";
import { Text } from "./Text";
import { cn } from "@/utils/classNames";
import { Icon } from "./Icon";
import { type ChangeEvent, useOptimistic, useTransition } from "react";
import { Button } from "./Button";

interface TaskProps {
  name: string;
  isDone: boolean;
  className?: string;
  onToggle: (value: boolean) => Promise<void>;
  onDelete: () => void;
  isDeleting: boolean;
}

export function Task({
  name,
  isDone,
  className,
  onToggle,
  onDelete,
  isDeleting,
}: TaskProps) {
  const [optimisticIsDone, addOptimisticIsDone] = useOptimistic(
    isDone,
    (_state, newValue: boolean) => newValue,
  );
  const [isPending, startTransition] = useTransition();

  function handleCheckboxChange({ target }: ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      addOptimisticIsDone(target.checked);
      await onToggle(target.checked);
    });
  }

  return (
    <div
      className={cn(
        "group flex min-h-600 items-center gap-200 rounded-medium bg-container px-200 shadow-blocky",
        className,
        isPending && "pointer-events-none",
      )}
    >
      <div className="relative flex items-center justify-center">
        {optimisticIsDone && (
          <Icon
            icon={Check}
            className="pointer-events-none absolute z-40 text-content-inverse"
          />
        )}
        <input
          disabled={isPending}
          className="size-300 shrink-0 blocky-inset appearance-none rounded-full checked:bg-container-inverse checked:shadow-none"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={optimisticIsDone}
        />
      </div>

      <Text
        className={cn(
          "w-full transition-all",
          optimisticIsDone && "line-through opacity-60",
        )}
      >
        {name}
      </Text>

      <div
        className={cn(
          "hidden gap-100 opacity-0 focus-within:opacity-100 md:flex md:group-hover:opacity-100",
          isDeleting && "opacity-100",
        )}
      >
        <Button
          icon={Trash2}
          className="text-content-danger"
          isLoading={isDeleting}
          onClick={onDelete}
          title="excluir tarefa"
        />
      </div>
    </div>
  );
}
