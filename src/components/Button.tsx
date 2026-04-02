import { cn } from "../utils/classNames";
import { Loader, type LucideIcon } from "lucide-react";
import { Icon } from "./Icon";
import { type ReactElement } from "react";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: "default" | "accent";
  icon?: LucideIcon | ReactElement;
  isLoading?: boolean;
  className?: string;
}

const variants = {
  default: "blocky",
  accent: "blocky-accent",
};

export function Button({
  children,
  variant = "default",
  icon,
  isLoading = false,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center gap-100",
        "h-medium px-200 text-100",
        icon && "pl-100",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {isLoading && <Icon icon={Loader} className="animate-spin" />}
      {!isLoading && icon && <Icon icon={icon} />}
      {children && (
        <span className="inline-flex items-center justify-center gap-100">
          {children}
        </span>
      )}
    </button>
  );
}
