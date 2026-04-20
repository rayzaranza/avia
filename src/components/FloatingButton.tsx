import { cn } from "@/utils/classNames";
import { Button } from "./Button";
import PlusIcon from "@/assets/icons/Plus.svg?react";

interface FloatingButtonProps {
  onClick: () => void;
  className?: string;
}

export function FloatingButton({ onClick, className }: FloatingButtonProps) {
  return (
    <div
      className={cn(
        "fixed right-200 bottom-200 z-50 shadow-blocky-floating",
        className,
      )}
    >
      <Button
        variant="accent"
        icon={<PlusIcon className="shrink-0" />}
        onClick={onClick}
      />
    </div>
  );
}
