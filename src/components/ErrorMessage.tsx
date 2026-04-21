import AlertTriangleIcon from "@/assets/icons/AlertTriangle.svg?react";
import { Text } from "./Text";
import type { ReactNode } from "react";

interface ErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="flex items-center gap-100 text-content-danger">
      <AlertTriangleIcon />
      <Text variant="body">{children}</Text>
    </div>
  );
}
