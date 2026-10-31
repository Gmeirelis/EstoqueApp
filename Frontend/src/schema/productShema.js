
import { z } from "zod";

export const productSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(25, "O nome não deve ultrapassar 25 caracteres"),

  marca: z
    .string()
    .trim()
    .min(2, "A marca deve ter pelo menos 2 caracteres")
    .max(20, "O nome da marca não deve ultrapassar 20 caracteres"),

  modelo: z
    .string()
    .trim()
    .min(2, "O modelo deve ter pelo menos 2 caracteres")
    .max(20, "O nome do modelo não deve ultrapassar 20 caracteres"),

  descricao: z
    .string()
    .trim()
    .max(200, "A descrição não deve ultrapassar 200 caracteres"),

  id_categoria: z
    .number()
    .int("A categoria selecionada é inválida")
    .positive("Selecione uma categoria válida"),
});
