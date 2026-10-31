import z from "zod";

export const emprestimoSchema = z.object({

    id_item: z.coerce
        .number({ invalid_type_error: "Selecione um item válido" })
        .min(1, "Selecione um item"),
    id_funcionario: z.coerce
        .number({ invalid_type_error: "Selecione um funcionário válido" })
        .min(1, "Selecione um funcionário"),
    data_emprestimo: z
        .string()
        .min(1, "Informe a data do empréstimo"),
    devolucao: z
        .string()
        .min(1, "Informe a data de devolução"),
    observacao: z.string().optional(),
})