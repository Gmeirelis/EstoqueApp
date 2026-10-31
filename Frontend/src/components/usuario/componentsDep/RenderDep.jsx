import { useState } from "react";
import ObterIniciais from "../../../utils/funcaoIniciais";
import obterCorAvatar from "../../ui/CorAvatar";
import API_URL from "../../../config/apis";
import { departamentsSchema } from "../../../schema/departamentsSchema";

function ModalAddDep({ isModal, setIsmodal, adicionarDep, valorInput, setValorInput, aviso }) {
  if (!isModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 gap-3">
      <div className="p-9 rounded-xl shadow-lg min-w-3xs bg-white flex flex-col gap-4">
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={setIsmodal} 
            className="text-gray-500 hover:text-gray-700 font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1 justify-center items-center">
          <label className="text-gray-700 font-semibold mb-1">
            Nome do Departamento:
          </label>
          <input
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
            className={`w-full 
              border 
              border-gray-300 
              rounded-lg 
              px-4 
              py-2 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-600 
              focus:border-transparent 
              transition 
              text-slate-800
              ${aviso.nome ? "border-red-600":"border-gray-300" }
              
              `}
            placeholder="Nome do departamento"
            type="text"
          />
        </div>

        {/* Mensagem de Erro da Validação */}
        {aviso?.nome && (
          <span className="text-sm text-red-500 font-medium text-center">
            {aviso.nome}
          </span>
        )}

        <div className="flex mt-3 items-center justify-center">
          <button
            type="button"
            className="text-lg border-none px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 transition cursor-pointer"
            onClick={adicionarDep}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RenderDep({ dados = [], atualizarDados, selectDepId }) {
  const [idSelecionado, setIdSelecionado] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departamento, setDepartamento] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState({});

  const getId = (id) => {
    setIdSelecionado(id);
    selectDepId(id);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setError({});
    setDepartamento("");
  };

  const adicionarDep = async () => {
    const payload = {
      nome: departamento,
    };

    const result = departamentsSchema.safeParse(payload);

    if (!result.success) {
      const novoError = {};

      result.error.issues.forEach((issue) => {
        const campo = issue.path[0];
        if (campo && !novoError[campo]) {
          novoError[campo] = issue.message;
        }
      });

      setError(novoError);
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/departamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!resposta.ok) {
        throw new Error("Erro na requisição da API");
      }

      await atualizarDados();
      fecharModal();
    } catch (err) {
      console.error(err);
    }
  };

  const dadosFiltrados = dados.filter((dado) =>
    dado.departamento_nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Busca e botão */}
      <div className="p-4 border-b border-slate-200 bg-white">
        <input
          className="w-full h-11 px-3 border border-slate-300 rounded-lg
            outline-none bg-slate-50 text-sm text-slate-700
            placeholder:text-slate-400 shadow-sm
            transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          placeholder="Buscar departamento"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ModalAddDep
          valorInput={departamento}
          setValorInput={setDepartamento}
          isModal={isModalOpen}
          setIsmodal={fecharModal}
          adicionarDep={adicionarDep}
          aviso={error}
        />

        <button
          type="button"
          className="w-full mt-3 py-2.5 rounded-lg
            text-sm font-medium text-blue-600
            border border-blue-200
            hover:bg-blue-50 transition cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          + Adicionar Departamento
        </button>
      </div>

      {/* Lista de departamentos */}
      <div className="max-h-[450px] overflow-y-auto">
        {dadosFiltrados.map((dado) => (
          <div
            key={dado.id_departamento}
            onClick={() => getId(dado.id_departamento)}
            className={`
              p-3 cursor-pointer
              border-b border-slate-100
              transition duration-150
              border-l-4
              ${
                idSelecionado === dado.id_departamento
                  ? "bg-blue-50 border-l-blue-500"
                  : "bg-white border-l-transparent hover:bg-slate-50"
              }
            `}
          >
            <div className="flex gap-3 items-center">
              {/* Avatar */}
              <div>
                <p
                  className={`
                    w-10 h-10
                    flex items-center justify-center
                    font-bold text-white
                    rounded-full text-sm
                    ${obterCorAvatar(dado.departamento_nome)}
                  `}
                >
                  {ObterIniciais(dado.departamento_nome)}
                </p>
              </div>

              {/* Nome */}
              <div>
                <p className="font-medium text-slate-700">
                  {dado.departamento_nome}
                </p>
                <p className="text-xs text-slate-400">Departamento</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}