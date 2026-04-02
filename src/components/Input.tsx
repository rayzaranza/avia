import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "../utils/classNames";

interface InputProps extends ComponentPropsWithRef<"input"> {
  label?: string;
}

export function Input({ label, ...rest }: InputProps) {
  const id = useId();
  return (
    <div className="flex flex-col gap-100">
      {label && (
        <label htmlFor={id} className="cursor-pointer">
          {label}
        </label>
      )}
      <input
        className={cn("flex h-medium blocky-inset p-300")}
        id={id}
        {...rest}
      />
    </div>
  );
}
