import type { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

export function Wrapper({ children, className }: WrapperProps) {
  return (
    <div className={`mx-auto max-w-[900px] p-300 ${className}`}>{children}</div>
  );
}
