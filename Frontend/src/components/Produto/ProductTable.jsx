
import { useEffect, useState } from "react";
import SelectDinamico from "../ui/SelectFilter";
import ModalAction from "../ui/ModalAction";
import Adiconaritem from "./formItem";
import IconProduto from "../../utils/Icone";
import { Trash2 } from "lucide-react";

function TableProduct({ dados,ataulizarLista })  {


const[modal,setModal] = useState(false)
const [idItem,setIdItem] = useState({
  id_item:null
})
//const [mensagem,setMensagem] = useState(false)

const apagarItem = async (dados) => {
  try {
    const API = await fetch("http://localhost:1050/itens/excluir", {
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
                onClick={ async () => {
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
                  {item.item_marca.toLowerCase()|| "Sem marca"}
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
              className={`px-3 py-1 text-xs font-medium rounded-full ${
                item.situal_emprestimo === "DISPONIVEL"
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
            onClick={()=> {setModal(true);
              const dados ={
                id_item:item.id_item
              }
              setIdItem(dados)
            } }
          >
           <Trash2 size={20}/>
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
  const token = localStorage.getItem("token");
  
  // 1. Criamos um estado separado para cada filtro
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroNome, setFiltroNome] = useState("");

  
console.log(dados)

const buscarDados = () => {
  fetch("http://localhost:1050/product/itens/produtos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
    });
};

useEffect(() => {
  buscarDados();
}, []);


const atualizarLista = (dadosAtuais) => {
  setDados((dadosAntigos) => [
    ...dadosAntigos,
    dadosAtuais
  ]);
};



  // 2. Lógica de filtro atualizada para checar a Categoria e o Nome
  const dadosFiltrados = dados.filter((dado) => {
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

  // 3. Console.log corrigido com vírgula
  console.log(filtroNome)
  console.log("dados filtrados:", dadosFiltrados);

  return (
    <div className="flex flex-col gap-3 justify-center">
      
      <div className="flex  gap-5">
        
        <SelectDinamico
          nome="Categoria"
          info="categoria_nome"
          url="http://localhost:1050/product/itens/categoria"
          idKey="id_categoria"
          valor={filtroCategoria} // Propriedade corrigida para 'valor'
          aoMudar={(valorSelecionado) => setFiltroCategoria(valorSelecionado)} 
        />
      
        <SelectDinamico
          nome="Nome item"
          info="item_nome" 
          url="http://localhost:1050/item/filter"
          idKey="id_item"
          valor={filtroNome} // Propriedade corrigida para 'valor'
          aoMudar={(valorSelecionado) => setFiltroNome(valorSelecionado)} 
        />


        <ModalAction buttonText="Adicionar item" modalTitle="Adicione o item"  type="submit" >
          <Adiconaritem atualizarLista={atualizarLista} />
        </ModalAction>
      </div>

      <TableProduct dados={dadosFiltrados} ataulizarLista={buscarDados}/>
      
    </div>
  );
}

