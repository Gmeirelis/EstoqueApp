import SelectDinamico from "../ui/SelectFilter";
import { useState } from "react";
import ModaladdCategory from "./ModaladdCategory";
import API_URL from "../../config/apis";
import { useRef } from "react";
import { productSchema } from "../../schema/productShema";

export default function AdicionarItem({ atualizarLista }) {
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [updateSelectCategory, setUpdateCategory] = useState(0);
  const [saved, setSaved] = useState(false);
  const [carregando, setCarregando] = useState(false)
  const [error, setError] = useState({})


  const enviandoRef = useRef(false);

  const updateCategory = () => setUpdateCategory((prev) => prev + 1);

  const openIsmodal = () => setIsModal(true);
  const closeIsmodal = () => setIsModal(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Impede envios duplicados
    if (enviandoRef.current) return;

    const dadosParaSalvar = {
      nome,
      marca,
      modelo,
      id_categoria: Number(categoria),
      descricao,
    };

    // Valida os dados com Zod
    const resultado = productSchema.safeParse(dadosParaSalvar);

    if (!resultado.success) {
      const novosErros = {};

      resultado.error.issues.forEach((issue) => {
        const campo = issue.path[0];

        if (campo && !novosErros[campo]) {
          novosErros[campo] = issue.message;
        }
      });

      setError(novosErros);
      return;
    }

    // Se passou na validação, inicia o envio
    enviandoRef.current = true;
    setCarregando(true);
    setError({});
    setSaved(false);

    try {
      const resposta = await fetch(`${API_URL}/itens/addProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultado.data),
      });

      if (!resposta.ok) {
        throw new Error(`Erro HTTP: ${resposta.status}`);
      }

      setNome("");
      setCategoria("");
      setMarca("");
      setModelo("");
      setDescricao("");

      setSaved(true);
      atualizarLista();

      setTimeout(() => {
        setSaved(false);
      }, 3000);

    } catch (erro) {
      console.error("Erro ao cadastrar item:", erro);
      alert("Não foi possível cadastrar o item. Tente novamente.");

    } finally {
      enviandoRef.current = false;
      setCarregando(false);
    }
  };

  const limparErro = (campo) => {
    setError((prev) => ({
      ...prev,
      [campo]: undefined,
    }));
  };

  return (
    <>
      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm flex items-center gap-2 animate-slideIn">
          <span>✓</span>
          <span>Produto adicionado com sucesso</span>
        </div>
      )}



      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

        <ModaladdCategory
          isModal={isModal}
          setIsmodal={() => closeIsmodal()}
          updateState={updateCategory}
        />
        <span className="flex gap-3.5 ">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              Nome do item:
            </label>
            <input
              type="text"
              placeholder="Digite o nome do item"
              value={nome} // Ligar ao estado
              onChange={(e) => {
                setNome(e.target.value);
                limparErro("nome");
              }}
              required
              className={`
                w-full border 
                border-gray-300 
                rounded-lg 
                px-4 
                py-2 
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-600 
                focus:border-transparent 
                transition
                ${error.nome ?"border-red-700" : "border-gray-300"}
              
                `}
            />
            {error.nome && (
              <p className="text-red-500 text-sm mt-1">
                {error.nome}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              Marca do item:
            </label>
            <input
              type="text"
              placeholder="Digite o nome do item"
              value={marca} // Ligar ao estado
              onChange={(e) => {setMarca(e.target.value);limparErro("marca")}} // Atualizar estado
              required
              className={`
                w-full 
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
                 ${error.marca ?"border-red-700" : "border-gray-300"}
                `}
            />
            {error.marca && (
              <p className="text-red-500 text-sm mt-1">
                {error.marca}
              </p>
            )}
          </div>
        </span>

        <span className="flex gap-3.5 ">
          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">
              Modelo do item:
            </label>
            <input
              type="text"
              placeholder="Digite o nome do item"
              value={modelo} // Ligar ao estado
              onChange={(e) => {setModelo(e.target.value);limparErro("modelo")}} // Atualizar estado
              required
              className={`w-full border 
              border-gray-300 
              rounded-lg 
              px-4 
              py-2 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-600 
              focus:border-transparent 
              transition
              ${error.modelo ? "border-red-700" : "border-gray-300"}
              `}
              
            />
            {error.modelo && (
              <p className="text-red-500 text-sm mt-1">
                {error.modelo}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-1">Descriçao:</label>
            <input
              type="text"
              placeholder="Digite o nome do item"
              value={descricao} // Ligar ao estado
              onChange={(e) => {setDescricao(e.target.value); limparErro("descricao")}} // Atualizar estado
              required
              className={` w-full border 
              border-gray-300 
              rounded-lg 
              px-4 
              py-2 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-600 
              focus:border-transparent 
              transition
              ${error.descricao ? "border-red-700" : "border-gray-300"}
              `}
             
              
              
            />
            {error.descricao && (
              <p className="text-red-500 text-sm mt-1">
                {error.descricao}
              </p>
            )}
          </div>
        </span>

        <div className="flex gap-11">
          <div className="flex flex-col w-full ">
            <label className="text-gray-700 font-semibold mb-1">
              Categoria do item:
            </label>
            {/* ATENÇÃO AQUI: Você precisa garantir que o seu componente SelectDinamico repasse o valor selecionado para a função onChange */}
            <div className="flex gap-2 ">
              <SelectDinamico
                nome="Selecione categoria"
                url={`${API_URL}/category`}
                info="categoria_nome"
                idKey="id_categoria"
                update={updateCategory}
                condicional={`${error.id_categoria ? "border-red-700" : "border-gray-300"}`}
                valor={categoria}
                aoMudar={(valorSelecionado) => {setCategoria(valorSelecionado); limparErro("id_categoria")}}
              />
              {error.id_categoria && (
                <p className="text-red-500 text-sm mt-1">
                  {error.id_categoria}
                </p>
              )}

              <button
                className="text-2xl"
                onClick={() => openIsmodal()}
                type="button"
              >
                +
              </button>
            </div>
          </div>


        </div>
        <div>
          <button
            type="submit"
            disabled={carregando}
            className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {carregando ? "Salvando..." : "Salvar Item"}
          </button>
        </div>
      </form>
    </>
  );
}
