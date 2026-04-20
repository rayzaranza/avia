import { cn } from "@/utils/classNames";
import { Skeleton } from "./Skeleton";
import ProjectColorIcon from "@/assets/icons/ProjectColor.svg?react";

export function CardSkeleton() {
  return (
    <article
      className={cn(
        "pointer-events-none relative flex min-h-[144px] blocky flex-col justify-between gap-200 p-200 pb-200",
      )}
    >
      <ProjectColorIcon
        className="pointer-events-none z-10 size-small shrink-0"
        fill="var(--color-project-gray)"
      />
      <Skeleton width={120} height={12} />
    </article>
  );
}
