import SpinnerIcon from "@/assets/icons/Spin.svg?react";

interface SpinnerProps {
  size?: number | string;
}

export function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <SpinnerIcon
      className="shrink-0 animate-spin text-content"
      width={size}
      height={size}
    />
  );
}
