
import { useEffect, useState } from "react";
import ModalAction from "../ui/ModalAction";
import AdicionarItem from "./FormItem";
import IconProduto from "../../utils/Icone";
import { Trash2 } from "lucide-react";
import Select from "../../utils/SelectName";
import API_URL from "../../config/apis";
import ProdutoVazio from "./ProdutoVazio";

function TableProduct({ dados, ataulizarLista }) {


  const [modal, setModal] = useState(false)
  const [idItem, setIdItem] = useState({
    id_item: null
  })
  //const [mensagem,setMensagem] = useState(false)

  const apagarItem = async (dados) => {
    try {
      const API = await fetch(`${API_URL}/itens/excluir`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const resposta = await API.text();
      console.log(resposta)

    } catch (erro) {
      console.error("Erro ao excluir item:", erro);
    }
  };


  return (
    <>

      {/*modal*/}
      {modal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h1 className="text-xl font-bold mb-4">Tem certeza?</h1>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Não
              </button>

              <button
                onClick={async () => {
                  apagarItem(idItem);
                  setModal(false);
                  ataulizarLista();

                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Sim
              </button>
            </div>
          </div>
        </div>

      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {dados.map((item) => {


          return (
            <div
              key={item.id_item}
              className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* CABEÇALHO */}
              <div className="px-5 py-4">
                <div className="flex items-start justify-between">


                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">

                      <IconProduto produto={item.categoria_nome} size={20} />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.item_nome}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {item.item_modelo || "nenhum"}
                      </p>
                    </div>

                  </div>

                  {/* ID */}
                  <span className="text-xs text-slate-800">
                    <p className="text-black">#{item.id_item}</p>
                  </span>

                </div>


                {/* INFORMAÇÕES */}
                <div className="mt-4 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    {/* Avatar */}


                    <div className="flex gap-4">
                      <div className="flex gap-1">
                        <p className="text-sm text-slate-700">Marca:</p>
                        <p className="text-sm text-slate-700">
                          {item.item_marca.toLowerCase() || "Sem marca"}
                        </p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p className="text-sm text-slate-700">Tipo:</p>
                        <p className="text-xs text-slate-400">
                          {item.categoria_nome || "Sem categoria"}
                        </p>

                      </div>
                    </div>

                  </div>


                  {/* STATUS */}
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${item.situal_emprestimo === "DISPONIVEL"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {item.situal_emprestimo === "DISPONIVEL"
                      ? "DISPONIVEL"
                      : item.situal_emprestimo}
                  </span>

                </div>

              </div>


              {/* RODAPÉ */}
              <div className="px-5 py-3 bg-slate-50 border-t border-dashed border-slate-200 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Quantidade: {item.quantidade}
                </span>

                <button
                  className="text-xs font-medium text-red-600 hover:text-red-800 transition"
                  onClick={() => {
                    setModal(true);
                    const dados = {
                      id_item: item.id_item
                    }
                    setIdItem(dados)
                  }}
                >
                  <Trash2 size={20} />
                </button>

              </div>

            </div>
          );
        })}
      </div>

    </>
  )
};




export default function FilterTablet() {
  const [dados, setDados] = useState([]);


  // 1. Criamos um estado separado para cada filtro
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNome, setFiltroNome] = useState("");
  const [carregando, setCarregando] = useState(true)


  const buscarDados = () => {
    fetch(`${API_URL}/product/itens/produtos`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar API");
        }

        return res.json();
      })
      .then((data) => {
        setDados(data);
      })
      .catch((error) => {
        console.error("Erro na busca da API:", error);
      }).finally(() => setCarregando(false));
  };

  useEffect(() => {
    buscarDados();
  }, []);


  // 2. Lógica de filtro atualizada para checar a Categoria e o Nome

  if (carregando) {
    return (
      <p className="text-center text-slate-500">
        Carregando...
      </p>
    );
  }

  const dadosEntrada = dados.filter(
    (dado) => dado.tipo === "ENTRADA"
  );

  if (dadosEntrada.length === 0) {
    return <ProdutoVazio  atualizar={buscarDados} />;
  }


  const dadosFiltrados = dadosEntrada.filter((dado) => {
    let passaCategoria = true;
    let passaNome = true;

    if (filtroCategoria) {
      // Compara o ID da categoria (convertendo ambos para String para evitar erros)
      passaCategoria = String(dado.categoria_nome) === String(filtroCategoria);
    }

    if (filtroNome) {
      // Compara o ID do item
      passaNome = String(dado.item_nome) === String(filtroNome);
    }

    return passaCategoria && passaNome;
  });



  return (
    <>

      <div className="flex flex-col gap-3 justify-center">

        <div className="flex  gap-5">



          <Select
            nome="Item"
            url={`${API_URL}/item/category`}
            valor={filtroNome}
            setValor={(valor) => setFiltroNome(valor)}
            chave="id_item"
            nomeEntidade="item_nome"
          />
          <Select
            nome="Selecione a categoria"
            url={`${API_URL}/item/category`}
            valor={filtroCategoria}
            setValor={(valor) => setFiltroCategoria(valor)}
            chave="id_item"
            nomeEntidade="categoria_nome"
          />

          <ModalAction buttonText="Adicionar item" modalTitle="Adicione o item" type="submit" >
            <AdicionarItem atualizarLista={buscarDados} />
          </ModalAction>
        </div>

        <TableProduct dados={dadosFiltrados} ataulizarLista={buscarDados} />

      </div>

    </>
  );
}

