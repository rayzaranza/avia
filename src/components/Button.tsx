import { cn } from "../utils/classNames";
import { Loader, type LucideIcon } from "lucide-react";
import { Icon } from "./Icon";
import { type ReactElement } from "react";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: "default" | "accent" | "danger";
  icon?: LucideIcon | ReactElement;
  isLoading?: boolean;
  className?: string;
}

const variants = {
  default: "blocky",
  accent: "blocky-accent",
  danger: "blocky text-content-danger",
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
        !children && "w-medium p-200",
        variants[variant],
        className,
        isLoading && "pointer-events-none blocky-inset",
        "disabled:pointer-events-none disabled:bg-container-inset disabled:text-content-disabled disabled:shadow-none",
      )}
      {...rest}
    >
      {isLoading && <Icon icon={Loader} className="animate-spin" />}
      {!isLoading && icon && <Icon icon={icon} />}
      {children && (
        <span className="mt-[0.1rem] inline-flex items-center justify-center gap-100">
          {children}
        </span>
      )}
    </button>
  );
}
