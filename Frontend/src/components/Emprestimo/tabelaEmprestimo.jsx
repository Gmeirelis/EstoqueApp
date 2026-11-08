import IconProduto from "../../utils/Icone";
import { IconCalendar } from "@tabler/icons-react";
import { Undo2 } from "lucide-react";
import { useState } from "react";
import API_URL from "../../config/apis";
import { SearchX } from "lucide-react";

export default function Tabela({
  filtroDepartamento,
  filtroColaborador,
  dados,
  atualizarDevolucao,
  limparFiltros,
}) {
  const [devolucao, setDataDevolucao] = useState({
    id_emprestimo: null,
    id_item: null,
  });
  const [isModal, setIsmodal] = useState(false);

  

  const delvoverItem = async (dadosDevolucao) => {
    const API = await fetch(`${API_URL}/devolutionItem`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosDevolucao),
    });

    const resposta = await API.json();
    if (resposta) {
      atualizarDevolucao()
    }
  };

  function iniciais(nome) {
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    const primeira = partes[0]?.[0] || "";
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
    return (primeira + ultima).toUpperCase();
  }

  const dadosFiltrado = dados.filter((dado) => {
    let colaborador = true;
    let departamento = true;

    if (filtroColaborador) {
      colaborador = dado.funcionario_nome === filtroColaborador;
    }

    if (filtroDepartamento) {
      departamento = dado.departamento_nome === filtroDepartamento;
    }

    return departamento && colaborador;
  });

  if (dadosFiltrado.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <SearchX size={30} className="text-blue-700" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">
          Nenhum empréstimo encontrado
        </h2>
        <p className="mb-5 mt-2 text-sm text-slate-500">
          Não há empréstimos para o departamento ou colaborador selecionado.
        </p>
        <button
          onClick={limparFiltros}
          className="rounded-lg border border-blue-700 px-5 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
        >
          Limpar filtros
        </button>
      </div>
    );
  }
  
  return (
    <div className="ml-2 mr-2">
      {isModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-xl font-bold mb-4">Tem certeza?</h1>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsmodal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Não
              </button>

              <button
                onClick={async () => {
                  delvoverItem(devolucao);
                  setIsmodal(false);

                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dadosFiltrado.map((item) => {
          const devolvido = item.status === "devolvido"; // ajuste para o nome real do campo

          return (
            <div
              key={item.id_emprestimo}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between px-5 pt-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                    <IconProduto produto={item.item_nome} size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 leading-tight">
                      {item.item_nome}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.item_modelo || "Sem modelo"}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs text-slate-400">
                  #{item.id_emprestimo}
                </span>
              </div>

              <div className="px-5 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[11px] font-medium text-blue-600">
                    {iniciais(item.funcionario_nome)}
                  </div>
                  <div>
                    <p className="text-sm text-slate-800 leading-tight">
                      {item.funcionario_nome}
                    </p>
                    <p className="text-xs text-slate-500">
                      {item.departamento_nome}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${devolvido
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                    }`}
                >
                  {devolvido ? "Devolvido" : "Emprestado"}
                </span>
              </div>

              <div className="px-5 py-3 border-t border-dashed border-slate-200 flex items-center gap-2 justify-between">
                <div className="flex items-center gap-3">
                  <IconCalendar size={15} className="text-slate-400" />
                  <span className="text-xs text-slate-600">
                    Retirado em{" "}
                    {new Date(item.data_emprestimo).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div>
                  <button
                    className="text-red-400"
                    onClick={() => {
                      const dados = {
                        id_emprestimo: item.id_emprestimo,
                        id_item: item.id_item,
                      };

                      setDataDevolucao(dados);
                      setIsmodal(true);
                    }}
                  >
                    <Undo2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/*onClick={() =>{
                    const dados ={
                      id_emprestimo:item.id_emprestimo,
                      id_item:item.id_item
                    }

                    setDataDevolucao(dados)
                    delvoverItem(dados)
                  }} */
