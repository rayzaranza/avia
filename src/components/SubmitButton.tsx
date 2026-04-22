import { Button } from "./Button";

interface SubmitButtonProps {
  label: string;
  loadingLoading?: string;
  isLoading: boolean;
}

export function SubmitButton({
  label,
  loadingLoading,
  isLoading,
}: SubmitButtonProps) {
  return (
    <Button
      variant="accent"
      isLoading={isLoading}
      type="submit"
      className="w-full"
    >
      {isLoading ? (loadingLoading ?? label) : label}
    </Button>
  );
}
