import { cn } from "../utils/classNames";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  variant?: "default" | "accent" | "danger";
}

const variants = {
  default: "bg-surface hover:bg-surface-hover active:bg-surface-pressed",
  accent: "bg-accent hover:bg-accent-hover active:bg-accent-pressed",
  danger: "bg-danger hover:bg-danger-hover active:bg-danger-pressed",
};

export function Button({
  children,
  variant = "default",
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 cursor-pointer place-items-center gap-2 rounded-2xl px-4 text-lg",
        "shadow-elevated hover:shadow-elevated-hover active:shadow-inset",
        "transform-gpu transition hover:-translate-y-px active:translate-y-0.5",
        "squircle",
        variants[variant],
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
