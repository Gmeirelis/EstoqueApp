import SelectDinamico from "../ui/SelectFilter";
import { useState } from "react";

export default function AdicionarItem({ atualizarLista }) {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dadosParaSalvar = {
      id_departamento: Number(departamento),
      nome: nome,
      marca: marca,
      modelo: modelo,
      id_categoria: Number(categoria),
      descricao: descricao,
      quantidade: Number(quantidade),
    };
    console.log("Dados que vão para a API:", dadosParaSalvar);

    try {
      const resposta = await fetch("http://localhost:1050/itens/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosParaSalvar),
      });
      const dadosApi = await resposta.json();
       console.log('dados que chega da api',dadosApi.dados)
      if (resposta.ok) {
        atualizarLista(dadosApi.dados);
        setNome("");
        setQuantidade("");
        setDepartamento("");
        setCategoria("");
      }
    } catch (erro) {
      console.error("Erro:", erro);
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-lg text-green-700 text-sm flex items-center gap-2 animate-slideIn">
          <span>✓</span>
          <span>Produto adicionado com sucesso</span>
        </div>
      )}

       <span className="flex gap-3.5 ">
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">
          Nome do item:
        </label>
        <input
          type="text"
          placeholder="Digite o nome do item"
          value={nome} // Ligar ao estado
          onChange={(e) => setNome(e.target.value)} // Atualizar estado
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">
          Marca do item:
        </label>
        <input
          type="text"
          placeholder="Digite o nome do item"
          value={marca} // Ligar ao estado
          onChange={(e) => setMarca(e.target.value)} // Atualizar estado
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
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
          onChange={(e) => setModelo(e.target.value)} // Atualizar estado
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">Descricao:</label>
        <input
          type="text"
          placeholder="Digite o nome do item"
          value={descricao} // Ligar ao estado
          onChange={(e) => setDescricao(e.target.value)} // Atualizar estado
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
        />
      </div>
</span>
      <div className="flex flex-col">
        <label className="text-gray-700 font-semibold mb-1">
          Quantidade do item:
        </label>
        <input
          type="number"
          placeholder="Ex: 10"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition"
        />
      </div>

      <div className="flex gap-11">
        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-semibold mb-1">
            Categoria do item:
          </label>
          {/* ATENÇÃO AQUI: Você precisa garantir que o seu componente SelectDinamico repasse o valor selecionado para a função onChange */}
          <SelectDinamico
            nome="Selecione categoria"
            url="http://localhost:1050/category"
            info="categoria_nome"
            idKey="id_categoria"
            valor={categoria}
            aoMudar={(valorSelecionado) => setCategoria(valorSelecionado)}
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-700 font-semibold mb-1">
            Departamento do item:
          </label>
          <SelectDinamico
            nome="Selecione Departamento"
            url="http://localhost:1050/departamentos"
            info="departamento_nome"
            idKey="id_departamento"
            valor={departamento}
            aoMudar={(valorSelecionado) => setDepartamento(valorSelecionado)}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-500 ease-in-out hover:bg-blue-800"
        >
          Salvar item
        </button>
      </div>
    </form>
  );
}
