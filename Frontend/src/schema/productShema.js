import { z } from "zod";


export const productSchema = z.object({

nome:z
.string()
.trim()
.min(3,"O nome deve ter pelo menos 3 caracteres")
.max(25,"o nome não deve ultrapassar 35 caracteres")
,
marca:z
.string()
.trim()
.min(2,"a marca deve ter pelo menos mais de 2 caracteres")
.max(20,"o nome da marca nao deve ultrapassar 20 caracteres")
,
modelo:z
.string()
.trim()
.min(2,"o modelo deve ter pelo menos mais de 2 caracteres")
.max(20,"o nome do modelo nao deve ultrapassar 20 caracteres")
,
descricao:z
.string()
.trim()
.max(20,"o nome do modelo nao deve ultrapassar 20 caracteres")

})