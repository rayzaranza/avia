import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "insira um email válido" }).trim(),
  password: z.string().trim(),
});

export const signUpSchema = z
  .object({
    email: z.email({ error: "insira um email válido" }).trim(),
    password: z
      .string()
      .min(6, {
        error: "senha muito curta, precisa ter no mínimo 6 caracteres",
      })
      .max(30, {
        error: "senha muito longa, precisa ter no máximo 30 caracteres",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "as senhas estão diferentes",
    path: ["confirmPassword"],
  });
