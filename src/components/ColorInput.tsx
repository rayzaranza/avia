import ProjectColorIcon from "@/assets/icons/ProjectColor.svg?react";
import CheckIcon from "@/assets/icons/Check.svg?react";
import type { ProjectColor } from "@/types/projects";
import { Button } from "./Button";
import { cn } from "@/utils/classNames";
import { projectColors, projectColorToken } from "@/utils/projectColors";
import { Text } from "./Text";

interface ColorInputProps {
  onChange: (color: ProjectColor) => void;
  selectedColor: ProjectColor;
}

export function ColorInput({
  onChange,
  selectedColor = "gray",
}: ColorInputProps) {
  return (
    <div>
      <Text className="mb-100 text-100">cor</Text>
      <ul className="flex items-center gap-100">
        {projectColors.map((color) => (
          <li key={color}>
            <Button
              onClick={() => onChange(color)}
              className={cn(
                selectedColor === color && "pointer-events-none blocky-inset",
              )}
              icon={
                <span className="flex items-center justify-center">
                  {selectedColor === color && (
                    <CheckIcon className="absolute size-200 text-content-inverse" />
                  )}
                  <ProjectColorIcon
                    className={cn("shrink-0")}
                    fill={projectColorToken[color]}
                  />
                </span>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
