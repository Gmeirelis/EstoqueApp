import { useState } from "react";
import ObterIniciais from "../../utils/funcaoIniciais";
import { UserRound, Mail, Building2, BriefcaseBusiness } from "lucide-react";

export default function ModalUsuario({ id, funcionarios, aoAtualizarFuncionario }) {
  const [editando, setEditando] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({});

  const iniciarEdicao = (info) => {
    setDadosEditados(info);
    setEditando(true);
  };

  async function salvarEdicao() {

    
    const dadosAtualizados = {
      id_funcionario: dadosEditados.id_funcionario,
      funcionario_nome: dadosEditados.funcionario_nome,
      email: dadosEditados.email,
      cargo: dadosEditados.cargo,
      departamento_nome: dadosEditados.departamento_nome
    };

    try {
      const resposta = await fetch('http://localhost:1050/funcionarios', {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        console.log('Atualizado com sucesso');
        
        // AVISAMOS O PAI QUE O USUÁRIO MUDOU
        aoAtualizarFuncionario(dadosAtualizados);

        setEditando(false);
      } else {
        console.error("Erro na requisição:", resultado.mensagem);
      }
    } catch (error) {
      console.error("Erro de rede/conexão:", error);
    }
  }

  const coresAvatar = [
    "bg-blue-600", "bg-green-600", "bg-purple-600", "bg-orange-500",
    "bg-pink-600", "bg-cyan-600", "bg-indigo-600", "bg-rose-600",
  ];

  function ObterCorAvatar(nome) {
    if (!nome) return coresAvatar[0];
    let valor = 0;
    for (let i = 0; i < nome.length; i++) {
      valor = nome.charCodeAt(i) + ((valor << 5) - valor);
    }
    return coresAvatar[Math.abs(valor) % coresAvatar.length];
  }

  // Pega as informações diretamente da prop que veio do Pai
  const info = funcionarios.find((dado) => dado.id_funcionario === id);

  if (!info) {
    return <div className="p-6 text-slate-500">Selecione um usuário para ver os detalhes.</div>;
  }

  return (
    <div key={info.id_funcionario} className="bg-white">
      <section className="w-2xl rounded-xl p-6 shadow-2xl border border-slate-200">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-3">
          <div className={`w-15 h-15 flex items-center justify-center font-bold text-white text-2xl rounded-full ${ObterCorAvatar(info.funcionario_nome)}`}>
            <h1>{ObterIniciais(info.funcionario_nome)}</h1>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-bold text-2xl">{info.funcionario_nome}</p>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-400">ID: #{info.id_funcionario}</p>
              <p className="text-sm text-green-700 font-medium bg-green-100 px-2 py-1 rounded-full">
                Usuário
              </p>
            </div>
          </div>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 mt-8">
          {/* Nome */}
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <UserRound size={15} />
              <span>Nome Completo</span>
            </div>
            {editando ? (
              <input
                type="text"
                value={dadosEditados.funcionario_nome || ""}
                onChange={(e) => setDadosEditados({ ...dadosEditados, funcionario_nome: e.target.value })}
                className="mt-2 w-full border border-slate-300 rounded-lg p-2 outline-none"
              />
            ) : (
              <p className="mt-2 font-light text-black">{info.funcionario_nome}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Mail size={15} />
              <span>Email</span>
            </div>
            {editando ? (
              <input
                type="email"
                value={dadosEditados.email || ""}
                onChange={(e) => setDadosEditados({ ...dadosEditados, email: e.target.value })}
                className="mt-2 w-full border border-slate-300 rounded-lg p-2 outline-none"
              />
            ) : (
              <p className="mt-2 font-light text-black">{info.email}</p>
            )}
          </div>

          {/* Departamento */}
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Building2 size={15} />
              <span>Departamento</span>
            </div>
            {editando ? (
              <input
                type="text"
                value={dadosEditados.departamento_nome || ""}
                onChange={(e) => setDadosEditados({ ...dadosEditados, departamento_nome: e.target.value })}
                className="mt-2 w-full border border-slate-300 rounded-lg p-2 outline-none"
              />
            ) : (
              <p className="mt-2 font-light text-black">{info.departamento_nome || "nenhum"}</p>
            )}
          </div>

          {/* Cargo */}
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BriefcaseBusiness size={15} />
              <span>Cargo</span>
            </div>
            {editando ? (
              <input
                type="text"
                value={dadosEditados.cargo || ""}
                onChange={(e) => setDadosEditados({ ...dadosEditados, cargo: e.target.value })}
                className="mt-2 w-full border border-slate-300 rounded-lg p-2 outline-none"
              />
            ) : (
              <p className="mt-2 font-light text-black">{info.cargo}</p>
            )}
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-200 mt-6" />

        {/* Ações */}
        <div className="mt-6 flex justify-self-start gap-3">
          {editando ? (
            <>
              <button
                onClick={salvarEdicao}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Salvar
              </button>

              <button
                onClick={() => setEditando(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={() => iniciarEdicao(info)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Editar
            </button>
          )}
        </div>
      </section>
    </div>
  );
}