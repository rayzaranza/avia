import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Logo from "@/assets/logo.svg?react";
import { Header } from "@/components/Header";
import { Text } from "@/components/Text";
import { signUp } from "@/services/auth";
import { useState, type SubmitEvent } from "react";
import { z } from "zod";
import { ErrorMessage } from "@/components/ErrorMessage";
import { signUpSchema } from "@/utils/schemas";

export const Route = createFileRoute("/criar-conta")({
  component: SignupPage,
});

interface SignUpFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  root?: string;
}

function SignupPage() {
  const [errors, setErrors] = useState<SignUpFormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  async function handleSignUp(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsPending(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirm-password")?.toString() || "";

    const validation = signUpSchema.safeParse({
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setIsPending(false);
      const zodErrors = z.flattenError(validation.error);
      setErrors({
        email: zodErrors.fieldErrors?.email?.[0],
        password: zodErrors.fieldErrors?.password?.[0],
        confirmPassword: zodErrors.fieldErrors?.confirmPassword?.[0],
      });
      return;
    }

    const { error } = await signUp(email, password);

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
          title="criar conta"
        />

        <form
          className="box-border flex w-full flex-col gap-300"
          onSubmit={handleSignUp}
        >
          <div className="max flex w-full flex-col gap-200">
            {errors.root && <ErrorMessage>{errors.root}</ErrorMessage>}
            <Input
              label="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              error={errors.email}
            />
            <Input
              label="senha"
              type="password"
              name="password"
              autoComplete="new-password"
              error={errors.password}
              required
            />
            <Input
              label="confirmar senha"
              type="password"
              name="confirm-password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              required
            />
          </div>
          <Button
            isLoading={isPending}
            className="w-full"
            variant="accent"
            type="submit"
          >
            criar e entrar
          </Button>
        </form>
      </div>

      <Text>
        já tem conta?{" "}
        <Link className="underline" to="/entrar">
          entrar
        </Link>
      </Text>
    </div>
  );
}
