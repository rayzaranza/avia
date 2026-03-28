import type { LucideIcon } from "lucide-react";
import { cn } from "../utils/classNames";

interface IconProps {
  icon: LucideIcon;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizes = {
  small: "w-4 h-4",
  medium: "w-6 h-6",
  large: "w-10 h-10",
};

export function Icon({ icon: SVG, size = "medium", className }: IconProps) {
  return <SVG className={cn("text-current", sizes[size], className)} />;
}
