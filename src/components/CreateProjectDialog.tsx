import { useCreateProject } from "@/hooks/useCreateProject";
import type { ProjectColor } from "@/types/projects";
import { useState } from "react";
import { Button } from "./Button";
import { ColorInput } from "./ColorInput";
import { Dialog } from "./Dialog";
import { ErrorMessage } from "./ErrorMessage";
import { Input } from "./Input";
import { SubmitButton } from "./SubmitButton";
import { Text } from "./Text";

interface CreateProjectDialogProps {
  isOpen: boolean;
  onCancel: () => void;
}

export function CreateProjectDialog({
  isOpen,
  onCancel,
}: CreateProjectDialogProps) {
  const { handleCreateProject, error, isLoading } = useCreateProject();
  const [color, setColor] = useState<ProjectColor>("gray");
  const [name, setName] = useState<string>("");

  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <Text variant="h2">criar projeto</Text>
      <form
        className="mt-200 flex flex-col gap-200"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateProject(name, color);
        }}
      >
        {error.root && <ErrorMessage>{error.root}</ErrorMessage>}
        <Input
          label="nome do projeto"
          type="text"
          name="project-name"
          onChange={({ target }) => setName(target.value)}
          autoComplete="project-name"
          error={error.name}
          required
        />
        <ColorInput selectedColor={color} onChange={setColor} />
        <div className="mt-100 flex justify-end gap-100">
          <Button onClick={onCancel}>cancelar</Button>
          <SubmitButton label="criar" isLoading={isLoading} />
        </div>
      </form>
    </Dialog>
  );
}
