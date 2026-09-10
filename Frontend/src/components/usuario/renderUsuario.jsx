import { useState } from "react";
import ObterIniciais from "../../utils/funcaoIniciais";

export default function RenderizacaoUsuario({ funcionarios, idSelecionado, setId }) {
  const [pesquisa, setPesquisa] = useState('');

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

  const dadosFiltrados = funcionarios.filter((item) =>
    item.funcionario_nome?.toLowerCase().includes(pesquisa.toLowerCase())
  );

  
  return (
    <div className="flex flex-col">
      {/* Busca */}
      <div className="p-3 border-b border-slate-200 bg-white">
        <input
          className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          type="text"
          placeholder="Buscar usuários"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>

      {/* Lista de usuários */}
      <div className="flex flex-col">
        {dadosFiltrados.map((info) => (
          <div
            key={info.id_funcionario}
            onClick={() => setId(info.id_funcionario)}
            className={`p-3 cursor-pointer border-b border-slate-200 transition duration-150 ${
              idSelecionado === info.id_funcionario
                ? "bg-blue-50 border-l-4 border-l-blue-500"
                : "bg-white hover:bg-slate-50 border-l-4 border-l-transparent"
            }`}
          >
            <div className="flex gap-3 items-center">
              <div>
                <p className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full text-sm ${ObterCorAvatar(info.funcionario_nome)}`}>
                  {ObterIniciais(info.funcionario_nome)}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-700">{info.funcionario_nome}</p>
                <p className="font-light text-sm text-slate-500">{info.cargo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}