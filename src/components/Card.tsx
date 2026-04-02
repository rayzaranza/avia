import { type LucideIcon } from "lucide-react";
import { Icon } from "./Icon";
import { Text } from "./Text";

interface CardProps {
  icon?: LucideIcon;
  title: string;
}

export function Card({ icon, title }: CardProps) {
  return (
    <article
      className={
        "flex min-h-[144px] blocky flex-col justify-end gap-200 p-200 pb-100"
      }
    >
      {icon ? <Icon icon={icon} className="size-medium" /> : <></>}
      <Text>{title}</Text>
    </article>
  );
}
