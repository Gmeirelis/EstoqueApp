import { PackageOpen } from "lucide-react";
import AdicionarItem from "./FormItem";
import { useState } from "react";


export default function ProdutoVazio({atualizar}) {


  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <PackageOpen size={36} className="text-blue-700" />
      </div>

      <h2 className="text-xl font-bold text-slate-900">Nenhum item</h2>
      <p className="mb-6 mt-2 text-sm text-slate-500">
        Quando um item for adicionado, ele aparecerá aqui. Comece registrando o
        primeiro empréstimo.
      </p>
       
    
       
        <AdicionarItem atualizarLista={atualizar} />
        
     
    </div>
  );
}