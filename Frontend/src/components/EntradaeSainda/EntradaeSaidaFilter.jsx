import { useState, useEffect } from "react";
import CardLog from "./CardEntradaSaida";
import API_URL from "../../config/apis";

// a props dados ela e responsavel de passar os  dados para renderizar,
// a prop enviaDados ela vai mandar os filtro como todos,saida,entrada para filtra e antes do dados chega na tabela ele passa
// em um filtro tipo : entra e saida que e enviado para o pai atraves da props enviadados
function TableProduct({ dados, enviaDados }) {
  const [filtro, setfiltro] = useState("todos");

  function selecionarFiltro(tipo) {
    setfiltro(tipo); // resposanvel por atualizar o estado filter
    enviaDados(tipo); // envia o tipo de movimentação para o pai, e serve para criar filtro
  }

  return (
    <div className="w-full max-w-7xl rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="w-full max-w-7xl max-h-[500px] overflow-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <div className="flex p-3 gap-6">
            <button
              onClick={() => selecionarFiltro("todos")}
              className={
                filtro === "todos"
                  ? "bg-blue-200 text-blue-600 p-2 pl-3 rounded-2xl font-medium"
                  : "text-gray-400"
              }
            >
              Todos
            </button>

            <button
              onClick={() => selecionarFiltro("entradas")}
              className={
                filtro === "entradas"
                  ? "bg-blue-200 text-blue-600 p-2 rounded-2xl font-medium"
                  : "text-gray-400"
              }
            >
              Entradas
            </button>

            <button
              onClick={() => selecionarFiltro("saidas")}
              className={
                filtro === "saidas"
                  ? "bg-blue-200 text-blue-600 p-2 rounded-2xl font-medium"
                  : "text-gray-400"
              }
            >
              Saidas
            </button>
          </div>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-center text-sm font-light  tracking-wider text-gray-500">
              Nome do usuário
            </th>

            <th className="px-6 py-4 text-center text-sm font-light  tracking-wider text-gray-500">
              Item
            </th>

            <th className="px-6 py-4 text-center text-sm font-light  tracking-wider text-gray-500">
              Tipo
            </th>

            <th className="px-6 py-4 text-center text-sm font-light  tracking-wider text-gray-500">
              Quantidade
            </th>

            <th className="px-6 py-4 text-center text-sm font-light  tracking-wider text-gray-500">
              Data
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {Array.isArray(dados) && dados.length > 0 ? (
            dados.map((dado) => (
              <tr
                key={dado.id_movimento}
                className="transition-colors duration-150 hover:bg-gray-50"
              >
                {/* Usuário */}
                <td className="px-6 py-4 text-center">
                  <span className="font-light text-gray-800">
                    {dado.nome} {dado.sobrenome}
                  </span>
                </td>

                {/* Item */}
                <td className="px-6 py-4 text-center">
                  <span className="font-light text-gray-700">
                    {dado.item_nome}
                  </span>

                  {dado.item_modelo &&
                    !dado.item_modelo.toLowerCase().includes("nenhum") && (
                      <span className="ml-1 text-sm text-gray-400">
                        {dado.item_modelo}
                      </span>
                    )}
                </td>

                {/* Tipo */}
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-light ${dado.tipo === "ENTRADA" ? "text-white bg-green-600" : "text-white bg-red-700"}`}
                  >
                    {dado.tipo.toLowerCase()}
                  </span>
                </td>

                {/* Quantidade */}
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                    {dado.quantidade}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="inline-flex min-w-9 items-center justify-center rounded-lg bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                    12/09/2026
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-10 text-center text-sm italic text-gray-400"
              >
                Nenhum produto encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default function ProductEntrada() {
  const [log, setLog] = useState([]);
  const [dados, setDados] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/movimentos`)
      .then((res) => res.json())
      .then((data) => {
        setLog(data);
      })
      .catch((erro) => console.error("Erro ao buscar dados da API:", erro));
  }, []);

  function filtros(filtro) {
    if (filtro === "entradas") {
      return log.filter((logs) => logs.tipo === "ENTRADA");
    }
    if (filtro === "saidas") {
      return log.filter((logs) => logs.tipo === "SAIDA");
    }

    return log;
  }

  const entrada = log.filter((logs) => logs.tipo === "ENTRADA");
  const saida = log.filter((logs) => logs.tipo === "SAIDA");

  function somaEntrada(dados) {
    const soma = dados.reduce((acumulador, atual) => {
      return acumulador + atual.quantidade;
    }, 0);

    return soma;
  }

  const dadosFilrtro = filtros(dados);

  return (
    <>
      <div className="flex flex-col gap-8 w-full justify-center items-center">
        <div className="flex gap-8 justify-center">
          <CardLog
            titulo={"Entradas"}
            tipoMovimentacao={"ENTRADA"}
            dados={somaEntrada(entrada)}
          />
          <CardLog
            titulo={"Saidas"}
            tipoMovimentacao={"SAIDAS"}
            dados={somaEntrada(saida)}
          />
        </div>
        <TableProduct dados={dadosFilrtro} enviaDados={setDados} />
      </div>
    </>
  );
}
