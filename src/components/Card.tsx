import { TreePalm, type LucideIcon } from "lucide-react";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { cn } from "../utils/classNames";

interface CardProps {
  icon?: LucideIcon;
  title: string;
}

export function Card({ icon = TreePalm, title }: CardProps) {
  return (
    <div
      className={cn(
        "squircle flex min-w-36 flex-col gap-7 rounded-3xl p-4 pb-3",
        "bg-surface",
        "shadow-elevated",
      )}
    >
      <Icon icon={icon} />
      <Text className="text-xl">{title}</Text>
    </div>
  );
}
