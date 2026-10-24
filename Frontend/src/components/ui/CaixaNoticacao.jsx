
import { Bell, CheckCheck,AlertTriangle,Clock } from "lucide-react";
import API_URL from "../../config/apis";
import { useEffect, useState } from "react";

function CardNotificacao({ emprestimo }) {

const dataPrevista = new Date(emprestimo.data_prevista_devolucao)
dataPrevista.setHours(0,0,0,0)

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

const limite = new Date(hoje);
limite.setDate(limite.getDate() + 2);

 const atrasado = dataPrevista < hoje;
  const proximoVencimento =
    dataPrevista >= hoje && dataPrevista <= limite;

  const cor = atrasado
    ? "bg-red-100 text-red-700"
    : proximoVencimento
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  const titulo = atrasado
    ? "Empréstimo atrasado"
    : proximoVencimento
      ? "Empréstimo próximo do vencimento"
      : "Empréstimo dentro do prazo";

  const Icone = atrasado
    ? AlertTriangle
    : proximoVencimento
      ? Clock
      : Bell;


  return (
    <div className="flex gap-3 border-b border-slate-100 p-4 transition hover:bg-slate-50">
       <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${cor}`}
      >
        <Icone size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-slate-800">
         {titulo}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Produto:{" "}
          <span className="font-medium text-slate-800">
            {emprestimo.item_nome}
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Funcionário:{" "}
          <span className="font-medium text-slate-800">
            {emprestimo.funcionario_nome}
          </span>
        </p>

        <p className={`mt-2 text-xs font-medium ${
          atrasado
            ? "text-red-600"
            : proximoVencimento
              ? "text-yellow-600"
              : "text-green-600"
        }`}>
          Devolução prevista:{" "}
          {dataPrevista.toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default function CaixaNotificacao() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await fetch(
          `${API_URL}/emprestimoAtrasado`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar empréstimos atrasados.");
        }

        const data = await response.json();

        setDados(data);
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setErro("Não foi possível carregar as notificações.");
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  return (
    <div className="w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between border-b border-slate-200 p-4">
        <div className="flex items-center gap-2">
          <Bell size={20} className="text-slate-600" />

          <h2 className="font-semibold text-slate-800">
            Notificações
          </h2>

          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
            {dados.length}
          </span>
        </div>

        <button
          type="button"
          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Notificações"
          title="Notificações"
        >
          <CheckCheck size={18} />
        </button>
      </header>

      {/* Conteúdo */}
      <div className="max-h-96 overflow-y-auto">
        {carregando ? (
          <p className="p-5 text-center text-sm text-slate-500">
            Carregando notificações...
          </p>
        ) : erro ? (
          <p className="p-5 text-center text-sm text-red-500">
            {erro}
          </p>
        ) : dados.length === 0 ? (
          <div className="p-6 text-center">
            <CheckCheck
              size={28}
              className="mx-auto mb-2 text-green-600"
            />

            <p className="text-sm font-medium text-slate-700">
              Tudo em dia!
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Não existem empréstimos atrasados.
            </p>
          </div>
        ) : (
          dados.map((emprestimo) => (
            <CardNotificacao
              key={emprestimo.id_emprestimo}
              emprestimo={emprestimo}
            />
          ))
        )}
      </div>

      {/* Rodapé */}
      <footer className="border-t border-slate-200 p-3 text-center">
        <p className="text-xs text-slate-500">
          {dados.length} empréstimo(s) atrasado(s)
        </p>
      </footer>
    </div>
  );
}
