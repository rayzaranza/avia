import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { signInWithGitHub } from "@/services/auth";
import { useState } from "react";
import GithubIcon from "@/assets/icons/GitHub.svg?react";
import Logo from "@/assets/logo.svg?react";

export const Route = createFileRoute("/entrar")({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    const { href } = await signInWithGitHub();
    if (href) {
      await navigate({ href });
    }
  }

  return (
    <div className="grid h-dvh place-content-center place-items-center gap-600">
      <Logo />
      <div className="min-w-72 rounded-2xl flex flex-col place-items-center gap-300 p-400 pb-700">
        <Text variant="h1">entre & faça</Text>
        <Button
          isLoading={isLoading}
          icon={<GithubIcon />}
          onClick={handleSignIn}
          aria-label="Entrar com GitHub"
        >
          {isLoading ? "entrando..." : "entrar com github"}
        </Button>
      </div>
    </div>
  );
}
