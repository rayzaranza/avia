import { cn } from "@/utils/classNames";

interface SkeletonProps {
  width: number | string;
  height: number | string;
  className?: string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <span
      style={{ width, height }}
      className={cn("rounded-medium bg-content opacity-25", className)}
    />
  );
}
