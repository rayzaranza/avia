import { Input } from "@/components/Input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg?react";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { signIn } from "@/services/auth";
import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";
import { signInSchema } from "@/utils/schemas";
import { SubmitButton } from "@/components/SubmitButton";

export const Route = createFileRoute("/entrar-com-email")({
  component: SignInPage,
});

interface SignInFormErrors {
  email?: string;
  password?: string;
  root?: string;
}

function SignInPage() {
  const [errors, setErrors] = useState<SignInFormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  async function handleSignIn(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const validation = signInSchema.safeParse({ email, password });

    if (!validation.success) {
      setIsPending(false);
      const zodErrors = z.flattenError(validation.error);
      setErrors({
        email: zodErrors.fieldErrors?.email?.[0],
        password: zodErrors.fieldErrors?.password?.[0],
      });
      return;
    }

    const { error } = await signIn(email, password);

    if (error) {
      setIsPending(false);
      setErrors({ root: error });
      return;
    }

    await navigate({ to: "/projetos" });
  }

  return (
    <div className="flex h-dvh flex-col place-items-center justify-between gap-600 px-300 py-400">
      <Logo />

      <div className="flex w-full max-w-2xs flex-col items-center gap-400">
        <Header
          isCentered
          backLink={{ to: "/entrar", label: "voltar" }}
          title="entrar com email"
        />

        <form
          className="box-border flex w-full flex-col gap-300"
          onSubmit={handleSignIn}
        >
          <div className="max flex w-full flex-col gap-200">
            {errors.root && <ErrorMessage>{errors.root}</ErrorMessage>}
            <Input
              required
              label="email"
              type="email"
              name="email"
              autoComplete="email"
              error={errors.email}
            />
            <Input
              required
              label="senha"
              type="password"
              name="password"
              autoComplete="current-password"
              error={errors.password}
            />
          </div>
          <SubmitButton isLoading={isPending} label="entrar" />
        </form>
      </div>

      <Text>
        não tem conta?{" "}
        <Link className="underline" to="/criar-conta">
          criar agora
        </Link>
      </Text>
    </div>
  );
}
