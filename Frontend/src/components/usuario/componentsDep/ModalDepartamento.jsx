import { useEffect, useState } from "react";
import ModalUserDep from "./ModalUSer";
import ObterIniciais from "../../../utils/funcaoIniciais";
import DeleteDep from "./ModalDelete";
import obterCorAvatar from "../../ui/CorAvatar";
import API_URL from "../../../config/apis";

export default function ModalDep({ id, dados, updateDados }) {
  const [editando, setEditando] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({});
  const [isModal, setIsModal] = useState(false);

  // essa funcao ela e responsvale por fechar a tela de edicao apos a mudança do dep selecionado
  //ela pega o id que esta vindo do pai e id do dados editado e faz uma comparação
  useEffect(() => {
    const ID = {
      id_atual: id,
      id_editando: dadosEditados.id_departamento,
    };

    if (ID.id_atual !== ID.id_editando) {
      setEditando(false);
    }
  }, [id, dadosEditados.id_departamento]);

  async function updateDepartamentName(id) {
    const updateName = { nome: dadosEditados.departamento_nome };

    try {
      const resposta = await fetch(
        `${API_URL}/departamentos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateName),
        },
      );

      if (!resposta) {
        throw new Error(
          "o servidor respondeu mas por motivo acabou não foi excutado a requiscao",
        );
      }
      const data = await resposta.json();
      updateDados();
    } catch (error) {
      console.log("verifique se o seu recurso esta correto", error);
    }
  }

  // Pega as informações diretamente da prop que veio do Pai
  const depFilter = dados.find((dado) => dado.id_departamento === id);

  if (!depFilter) {
    return (
      <div className="p-6 text-slate-500">
        Selecione um usuário para ver os detalhes.
      </div>
    );
  }
  
  const iniciarEdicao = () => {
    setDadosEditados({ ...depFilter });
    setEditando(true);
  };

  return (
    <div key={depFilter.id_departamento} className="bg-white">
      <DeleteDep
        isModal={isModal}
        setIsmodal={(dado) => setIsModal(dado)}
        idDep={id}
        updateDados={updateDados}
      />

      <section className="w-2xl rounded-xl p-6 shadow-2xl border border-slate-200">
        {/* Cabeçalho */}

        <div className="flex flex-col items-center gap-3 mb-9">
          <div
            className={`w-15 h-15 flex items-center justify-center font-bold text-white text-2xl rounded-full ${obterCorAvatar(depFilter.departamento_nome)}`}
          >
            <h1>{ObterIniciais(depFilter.departamento_nome)}</h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-2xl">{depFilter.departamento_nome}</p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">
                ID: #{depFilter.id_departamento}
              </p>
              <p className="text-sm text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full">
                Departamento
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 ml-3 mr-3 mb-10">
          <div className="flex flex-col gap-9 ">
            <div>
              <h2>Nome:</h2>

              {editando ? (
                <input
                  type="text"
                  value={dadosEditados.departamento_nome || " "}
                  onChange={(e) =>
                    setDadosEditados({
                      ...dadosEditados,
                      departamento_nome: e.target.value,
                    })
                  }
                  className="mt-2 w-full border border-slate-300 rounded-lg p-2 outline-none"
                />
              ) : (
                <p className="mt-2 font-light text-black">
                  {depFilter.departamento_nome}
                </p>
              )}
            </div>
            <div>
              <h1>Data de Criação:</h1>
              <p className="mt-2 font-light text-black">{"20/04/2026"}</p>
            </div>
          </div>

          <div>
            <div>
              <h2>Funcionario:</h2>
            </div>
            <div>
              <ModalUserDep idDep={id} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          {editando ? (
            <div className="flex gap-7">
              <button
                onClick={() => {
                  updateDepartamentName(dadosEditados.id_departamento);
                  setEditando(false);
                }}
              >
                Salvar
              </button>

              <button onClick={() => setEditando(false)}>Cancelar</button>
            </div>
          ) : (
            <button
              type="button"
              onClick={iniciarEdicao}
              className="rounded-sm bg-blue-700 p-2 text-lg font-medium text-white"
            >
              Editar
            </button>
          )}
          <button 
          onClick={() => setIsModal(true)}
          className="border-2 p-2 border-red-600 text-red-500"
          >Apagar </button>
        </div>
      </section>
    </div>
  );
}
