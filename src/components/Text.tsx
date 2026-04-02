import { cn } from "../utils/classNames";
import { type ReactNode } from "react";

interface TextProps {
  variant?: "body" | "caption" | "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}

const variants = {
  body: { as: "p", classes: "text-body-medium" },
  caption: { as: "span", classes: "text-body-small text-content-secondary" },
  h1: { as: "h1", classes: "text-heading-large" },
  h2: { as: "h2", classes: "text-heading-medium" },
  h3: { as: "h3", classes: "text-heading-small" },
} as const;

export function Text({ variant = "body", className, children }: TextProps) {
  const { as: Component, classes } = variants[variant];
  return <Component className={cn(classes, className)}>{children}</Component>;
}
