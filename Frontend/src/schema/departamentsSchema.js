import { z } from "zod";

export const departamentsSchema = z.object({

nome: z
.string()
.min(2,"o minimo 2 caracteres")
.max(21,"no maximo 20 caracteres")


})