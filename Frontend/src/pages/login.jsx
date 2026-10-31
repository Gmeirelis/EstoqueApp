import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Monitor, Server, Wifi, Laptop, HardDrive, Mail, Lock, Eye, EyeOff } from "lucide-react";
import API_URL from "../config/apis";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch(`${API_URL}/user/loginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const res = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("usuario", JSON.stringify(res));
        setEmail("");
        setSenha("");
        navigate("/dashboard");
      } else {
        setErro(res.message || "E-mail ou senha inválidos");
      }
    } catch (erro) {
      console.error("Erro:", erro);
      setErro("Não foi possível conectar ao servidor");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Lado do login */}
      <div className="flex-1 flex justify-center items-center bg-slate-50 px-6">
        <form onSubmit={entrar} className="w-full max-w-md">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-slate-100 flex flex-col gap-6">
            <div className="text-center flex flex-col gap-2">
              <div className="mx-auto w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <Monitor className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold text-slate-800 mt-2">
                Bem-vindo de volta
              </h1>
              <p className="text-slate-500 text-sm">
                Entre para gerenciar seus ativos de informática
              </p>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                {erro}
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="w-full py-3 pl-10 pr-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="w-full py-3 pl-10 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={carregando}
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors shadow-md shadow-blue-600/30"
            >
              {carregando ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>

      {/* Lado direito */}
      <div className="hidden lg:flex flex-1 h-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 rounded-l-3xl relative overflow-hidden flex-col justify-center items-center text-white p-12">
        {/* círculos decorativos */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/10" />

        <div className="relative z-10 text-center max-w-md">
          <h1 className="text-5xl font-bold mb-4">Aplicativo Estoque</h1>
          <p className="text-blue-100 text-lg mb-10">
            Controle de ativos de informática, empréstimos e movimentações em um só lugar.
          </p>

          <div className="grid grid-cols-4 gap-4">
            {[Laptop, Server, Wifi, HardDrive].map((Icon, i) => (
              <div
                key={i}
                className="bg-white/15 backdrop-blur rounded-xl p-4 flex items-center justify-center border border-white/20"
              >
                <Icon size={32} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;