import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "../utils/classNames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

export function Input({ label, ...rest }: InputProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-2 select-none">
      {label && (
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex h-10 rounded-xl bg-surface-pressed p-4 hover:bg-surface",
          "shadow-inset transition hover:shadow-inset-hover",
        )}
        id={id}
        {...rest}
      />
    </div>
  );
}
