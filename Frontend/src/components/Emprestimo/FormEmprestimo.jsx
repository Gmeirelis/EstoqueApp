import SelectDinamico from "../ui/SelectFilter";
import { useState } from "react";
import API_URL from "../../config/apis";
import { emprestimoSchema } from "../../schema/emprestimoSchema";

export default function AdicionarEmprestimo({ atualizaremprestimo, setIsModal }) {
  const [item, setItem] = useState("");
  const [funcionario, setFuncionario] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState("");
  const [dataDevolucao, setDataDevolucao] = useState("");
  const [Observacao, setObservacao] = useState("");
  const [error, setErros] = useState({})
  // Adicionado para dar feedback visual na tela
  const [carregando, setCarregando] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    setErros({})

    const payload = {
      id_item: item,
      id_funcionario: funcionario,
      data_emprestimo: dataEmprestimo,
      devolucao: dataDevolucao,
      observacao: Observacao,
    };

    const result = emprestimoSchema.safeParse(payload);

    if (!result.success) {
      const novosErros = {};
      result.error.issues.forEach((issue) => {
        const campo = issue.path[0];
        if (campo && !novosErros[campo]) {
          novosErros[campo] = issue.message;
        }
      });
      setErros(novosErros);
      return;
    }

    setCarregando(true);

    try {
      const token = localStorage.getItem("token");
      const resposta = await fetch(`${API_URL}/emprestimo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const informacao = await resposta.json();

      if (resposta.ok) {
        atualizaremprestimo(informacao.dados);

        // Limpa os campos após o envio bem-sucedido
        setItem("");
        setFuncionario("");
        setDataEmprestimo("");
        setDataDevolucao("");
        setObservacao("");
        setIsModal()
      } else {
        console.log("ERRO HTTP:", resposta.status);
      }
    } catch (erro) {
      console.log("erro no fetch", erro);
    } finally {
      setCarregando(false);

    }
  };

  return (
    <form className="w-full max-w-3xl rounded-2xl p-8 " onSubmit={handleSubmit}>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Registro de empréstimooo
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Preencha os dados abaixo para registrar o empréstimo do item.
        </p>
      </div>

      {/* Grid dos campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Item
          </label>

          <SelectDinamico
            nome="Selecione o item"
            url={`${API_URL}/itens/selectItem`}
            info="item_nome"
            idKey="id_item"
            valor={item}
            aoMudar={(valor) => setItem(valor)}
            condicional={error.id_item ? "border-red-600" : "border-gray-300"}
          />
          <h1
            className="text-red-600 text-sm"
          >{error.id_item}</h1>
        </div>

        {/* Funcionário */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-2">
            Funcionário
          </label>

          <SelectDinamico
            nome="Selecione o funcionário"
            url={`${API_URL}/funcionarios`}
            info="funcionario_nome"
            idKey="id_funcionario"
            valor={funcionario}
            condicional={error.id_funcionario ? "border-red-600" : "border-gray-300"}
            aoMudar={(valor) => setFuncionario(valor)}
          />
          <h1
            className="text-red-600 text-sm"
          >{error.id_funcionario}</h1>
        </div>

        {/* Data empréstimo */}

        <div className="flex flex-col">
          <label
            htmlFor="data_emprestimo"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Data do empréstimo
          </label>

          <input
            id="data_emprestimo"
            type="date"
            name="data_emprestimo"
            value={dataEmprestimo}
            onChange={(e) => setDataEmprestimo(e.target.value)}
            className={`
          w-full
          h-11
          px-3
          border
          border-gray-300
          rounded-lg
          bg-gray-50
          text-gray-700
          outline-none
          transition
          focus:bg-white
          focus:ring-2
          focus:ring-blue-100
          ${error.data_emprestimo ? "border-red-600" : " border-gray-300"}
          `}
          />
          <h1
            className="text-red-600 text-sm"
          >{error.data_emprestimo}</h1>
        </div>


        {/* Data devolução */}
        <div className="flex flex-col">
          <label
            htmlFor="data_devolucao"
            className="text-sm font-semibold text-gray-700 mb-2"
          >
            Data prevista de devolução
          </label>

          <input
            id="data_devolucao"
            type="date"
            name="data_devolucao"
            value={dataDevolucao}
            onChange={(e) => setDataDevolucao(e.target.value)}
            className={` w-full
          h-11
          px-3className
          border
          border-gray-300
          rounded-lg
          bg-gray-50
          text-gray-700
          outline-none
          transition
          focus:bg-white
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-100
          ${error.devolucao ? "border-red-600" : " border-gray-300"}
          `}
          />
          <h1
            className="text-red-600 text-sm"
          >{error.devolucao}</h1>
          <div />
        </div>
      </div>


      {/* Observação */}
      <div className="flex flex-col mt-6">
        <label
          htmlFor="observacao"
          className="text-sm font-semibold text-gray-700 mb-2"
        >
          Observação
        </label>

        <textarea
          id="observacao"
          name="observacao"
          value={Observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Digite uma observação sobre o empréstimo..."
          rows="3"
          className="
        w-full
        px-3
        py-3
        border
        border-gray-300
        rounded-lg
        bg-gray-50
        text-gray-700
        resize-none
        outline-none
        transition
        focus:bg-white
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
      "
        />
      </div>

      {/* Botões */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
        <button
          type="submit"
          disabled={carregando}
          className="
         w-3xs
        sm:flex-1
        bg-blue-600
        text-white
        font-semibold
        py-3
        px-6
        rounded-lg
        shadow-sm
        hover:bg-blue-700
        active:scale-[0.99]
        transition
        duration-200
      "
        >
          {carregando ? "Enviando..." : "Salvar empréstimo"}
        </button>
      </div>
    </form >
  );
}
