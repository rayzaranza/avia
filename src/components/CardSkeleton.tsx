import { cn } from "@/utils/classNames";
import { Skeleton } from "./Skeleton";

export function CardSkeleton() {
  return (
    <article
      className={cn(
        "pointer-events-none relative flex min-h-[144px] blocky flex-col justify-end gap-200 p-200 pb-200",
      )}
    >
      <Skeleton width={120} height={12} />
    </article>
  );
}
