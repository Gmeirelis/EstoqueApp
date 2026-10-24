import { z } from "zod";

export const userSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  telefone: z
    .string()
    .refine(
      (telefone) => {
        const digits = telefone.replace(/\D/g, "");
        return digits.length === 10 || digits.length === 11;
      },
      "Informe um telefone com DDD válido."
    ),

  cargo: z
    .string()
    .trim()
    .min(2, "O cargo deve ter pelo menos 2 caracteres.")
    .max(60, "O cargo deve ter no máximo 60 caracteres."),

  
});