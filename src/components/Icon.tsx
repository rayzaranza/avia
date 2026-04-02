import { Cat, type LucideIcon } from "lucide-react";
import { cn } from "../utils/classNames";
import { isValidElement, type ReactElement } from "react";

interface IconProps {
  icon: LucideIcon | ReactElement;
  className?: string;
}

export function Icon({ icon: SVG = Cat, className }: IconProps) {
  if (isValidElement(SVG)) {
    return SVG;
  }
  return <SVG className={cn("size-300 shrink-0 text-current", className)} />;
}
