import type { ReactElement } from "react";
import { Text } from "./Text";

interface EmptyStateProps {
  icon?: ReactElement;
  description: string;
  action?: ReactElement;
}

export function EmptyState({ icon, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-300 py-600 text-center">
      {icon}
      <div>
        <Text variant="caption">{description}</Text>
      </div>
      {action}
    </div>
  );
}
