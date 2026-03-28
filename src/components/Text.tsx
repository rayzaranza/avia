import { cn } from "../utils/classNames";
import { type ReactNode } from "react";

interface TextProps {
  variant?: "body" | "caption" | "h1" | "h2" | "h3";
  className?: string;
  children: ReactNode;
}

const variants = {
  body: { as: "p", classes: "text-base" },
  caption: { as: "span", classes: "text-sm text-content-secondary" },
  h1: { as: "h1", classes: "text-6xl" },
  h2: { as: "h2", classes: "text-5xl" },
  h3: { as: "h3", classes: "text-4xl" },
} as const;

export function Text({ variant = "body", className, children }: TextProps) {
  const { as: Component, classes } = variants[variant];
  return <Component className={cn(classes, className)}>{children}</Component>;
}
