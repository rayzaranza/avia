import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { signInWithGitHub, signInWithGoogle } from "@/services/auth";
import { useState } from "react";
import GithubIcon from "@/assets/icons/GitHub.svg?react";
import GoogleIcon from "@/assets/icons/Google.svg?react";
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
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  async function handleSignInWithGitHub() {
    setIsLoadingGitHub(true);
    const { href } = await signInWithGitHub();
    if (href) {
      await navigate({ href });
    }
  }

  async function handleSignInWithGoogle() {
    setIsLoadingGoogle(true);
    const { href } = await signInWithGoogle();
    if (href) {
      await navigate({ href });
    }
  }

  return (
    <div className="grid h-dvh place-content-center place-items-center gap-600">
      <Logo />
      <div className="min-w-72 rounded-2xl flex flex-col place-items-center gap-300 p-400 pb-700">
        <Text variant="h1" className="text-center">
          vamos começar
        </Text>

        <div className="flex gap-100">
          <Button
            isLoading={isLoadingGoogle}
            icon={<GoogleIcon />}
            onClick={handleSignInWithGoogle}
            aria-label="Entrar com Google"
          >
            {isLoadingGoogle ? "entrando..." : "entrar com google"}
          </Button>
          <Button
            isLoading={isLoadingGitHub}
            icon={<GithubIcon />}
            onClick={handleSignInWithGitHub}
            aria-label="Entrar com GitHub"
          >
            {isLoadingGitHub ? "entrando..." : "entrar com github"}
          </Button>
        </div>
      </div>
    </div>
  );
}
