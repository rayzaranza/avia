import { cn } from "@/utils/classNames";
import { Skeleton } from "./Skeleton";

export function TaskSkeleton() {
  return (
    <div
      className={cn(
        "group flex min-h-600 items-center gap-200 rounded-medium bg-container px-200 shadow-blocky",
      )}
    >
      <div className="relative flex items-center justify-center">
        <Skeleton width={32} height={32} />
      </div>

      <Skeleton width={160} height={12} />
    </div>
  );
}
