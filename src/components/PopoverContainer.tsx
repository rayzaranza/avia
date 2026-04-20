import { type ReactNode } from "react";

interface PopoverContainerProps {
  children: ReactNode;
}

export function PopoverContainer({ children }: PopoverContainerProps) {
  return (
    <div className="flex flex-col items-start justify-start gap-200 rounded-large bg-container p-200 shadow-blocky-floating">
      {children}
    </div>
  );
}
