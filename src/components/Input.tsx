import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "../utils/classNames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

export function Input({ label, className, ...rest }: InputProps) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-100 ${className}`}>
      {label && (
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex h-medium w-full translate-y-[0.1rem] blocky-inset px-200",
          "border border-border-secondary",
        )}
        id={id}
        {...rest}
      />
    </div>
  );
}
