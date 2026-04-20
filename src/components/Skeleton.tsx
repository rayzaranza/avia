interface SkeletonProps {
  width: number | string;
  height: number | string;
}

export function Skeleton({ width, height }: SkeletonProps) {
  return (
    <span
      style={{ width, height }}
      className="rounded-medium bg-content opacity-25"
    />
  );
}
