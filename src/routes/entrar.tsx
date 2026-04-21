import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { signInWithGitHub, signInWithGoogle } from "@/services/auth";
import { useState } from "react";
import GithubIcon from "@/assets/icons/GitHub.svg?react";
import GoogleIcon from "@/assets/icons/Google.svg?react";
import Logo from "@/assets/logo.svg?react";
import { Header } from "@/components/Header";

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
    <div className="flex h-dvh flex-col place-items-center justify-between px-300 py-400">
      <Logo />

      <div className="min-w-72 rounded-2xl flex flex-col place-items-center gap-300 p-400 pb-700">
        <Header isCentered title="vamos começar" />

        <div className="flex w-full flex-col gap-100">
          <Button
            variant="accent"
            aria-label="entrar com email e senha"
            onClick={() => navigate({ to: "/entrar-com-email" })}
          >
            entrar com email
          </Button>

          <div className="flex gap-100">
            <Button
              isLoading={isLoadingGoogle}
              icon={<GoogleIcon />}
              className="w-full"
              onClick={handleSignInWithGoogle}
              aria-label="Entrar com Google"
            >
              {isLoadingGoogle ? "entrando..." : "google"}
            </Button>
            <Button
              isLoading={isLoadingGitHub}
              icon={<GithubIcon />}
              className="w-full"
              onClick={handleSignInWithGitHub}
              aria-label="Entrar com GitHub"
            >
              {isLoadingGitHub ? "entrando..." : "github"}
            </Button>
          </div>
        </div>
      </div>

      <Text className="text-100">
        não tem conta?{" "}
        <Link className="underline" to="/criar-conta">
          criar agora
        </Link>
      </Text>
    </div>
  );
}
