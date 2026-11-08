import { useState, useEffect, useRef } from "react";
import ObterIniciais from "../../../utils/funcaoIniciais";
import API_URL from "../../../config/apis";
import { userSchema } from "../../../schema/userSchema";

function SelectUser({ idDep }) {
  const [dados, SetDados] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  function getIdDep(valor) {
    setIdSelect(valor);
    idDep(valor);
  }

  useEffect(() => {
    async function buscarDados() {
      const token = localStorage.getItem("token");

      try {
        const api = await fetch(`${API_URL}/departamentos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await api.json();

        SetDados(data);
      } catch (error) {
        console.error(error);
      }
    }

    buscarDados();
  }, []);

  return (
    <select
      className="p-2 border border-gray-300 rounded-lg w-44 bg-white h-10 px-3 text-sm"
      name="Departamento"
      value={idSelect}
      onChange={(e) => getIdDep(Number(e.target.value))}
    >
      <option>Escolha o Departamento</option>

      {dados.map((dado) => {
        return (
          <option key={dado.id_departamento} value={dado.id_departamento}>
            {dado.departamento_nome}
          </option>
        );
      })}
    </select>
  );
}

{
  /* props ismodal recebe o valor true do com pai e abre o modal,setismodal excuta um funcao que recebe false para fehcar o modal*/
}
function ModalAddUser({ isModal, setIsmodal, atualizar }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [departaments, setDepartaments] = useState("");
  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({});

  const enviandoRef = useRef(false);


  async function handleSubmit(e) {
    e.preventDefault();


    if (enviandoRef.current) return;
      const user = {
    nome,
    email,
    telefone,
    cargo,
    
  };
 const resultado = userSchema.safeParse(user);

 if (!resultado.success) {
    const novosErros = {};

    resultado.error.issues.forEach((issue) => {
      const campo = issue.path[0];

      if (campo && !novosErros[campo]) {
        novosErros[campo] = issue.message;
      }
    });

    setErrors(novosErros);
    return;
  }

    enviandoRef.current = true;
    setErrors({});
    setLoading(true);



    const dadosUser = {
      funcionario_nome: nome,
      email,
      telefone,
      cargo,
      id_departamento: Number(departaments),
    };


   
    try {
      const resposta = await fetch(`${API_URL}/funcionarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosUser),
      });

      if (!resposta.ok) {
        throw new Error("Erro ao criar funcionário");
      }

      const data = await resposta.json();

      setNome("");
      setDepartaments("");
      setEmail("");
      setTelefone("");
      setCargo("");

      atualizar();
      setIsmodal(false);

      
    } catch (error) {
      console.error(error);
    } finally {

      enviandoRef.current = false;
      setLoading(false);
    }
  }
  return (
    <>
      {isModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          ```jsx
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-200"
          >
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-slate-800">
                Adicionar Usuário
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Preencha os dados do funcionário para cadastrá-lo no sistema.
              </p>
            </div>

            {/* Dados pessoais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nome"
                  className="text-sm font-medium text-slate-700"
                >
                  Nome do Funcionário
                </label>

                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  name="nome"
                  type="text"
                  placeholder="Ex: João Silva"
                  className={`h-11 px-3 rounded-lg border outline-none transition
  focus:ring-2 focus:ring-blue-100
  ${errors.nome
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                    }`}
                />
                {errors.nome && (
                  <p className="text-sm text-red-600">
                    {errors.nome}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ex: joao@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`h-11 px-3 rounded-lg border outline-none transition
  focus:ring-2 focus:ring-blue-100
  ${errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                    }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Telefone */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="telefone"
                  className="text-sm font-medium text-slate-700"
                >
                  Telefone
                </label>

                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="Ex: (95) 8232-2322"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className={`h-11 px-3 rounded-lg border outline-none transition
  focus:ring-2 focus:ring-blue-100
  ${errors.telefone
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                    }`}
                />
                {errors.telefone && (
                  <p className="text-sm text-red-600">
                    {errors.telefone}
                  </p>
                )}
              </div>

              {/* Cargo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="cargo"
                  className="text-sm font-medium text-slate-700"
                >
                  Cargo
                </label>

                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder="Ex: Diretor"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className={`h-11 px-3 rounded-lg border outline-none transition
  focus:ring-2 focus:ring-blue-100
  ${errors.cargo
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-300 focus:border-blue-500"
                    }`}
                />
                {errors.cargo && (
                  <p className="text-sm text-red-600">
                    {errors.cargo}
                  </p>
                )}
              </div>

              {/* Departamento */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Departamento
                </label>

                {/* essa prop passar o valor do dep selecionado*/}
                <SelectUser idDep={setDepartaments} />


                {errors.departamento && (
                  <p className="text-sm text-red-600">
                    {errors.departamento}
                  </p>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsmodal(false)}
                className="px-5 py-2.5 rounded-lg border border-slate-300
      text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                Cancelar
              </button>

              <button
                disabled={loading}
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-600
               text-white font-medium hover:bg-blue-700
               focus:ring-2 focus:ring-blue-200 transition"
              >
                {loading ? "Salvando..." : " Adicionar Usuário"}
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
}

export default function RenderizacaoUsuario({
  funcionarios,
  idSelecionado,
  setId,
  atualizar
}) {
  const [pesquisa, setPesquisa] = useState("");
  const [isModal, setIsmodal] = useState(false);

  const coresAvatar = [
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-orange-500",
    "bg-pink-600",
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-rose-600",
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
    item.funcionario_nome?.toLowerCase().includes(pesquisa.toLowerCase()),
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

        <div className="flex justify-center p-2">
          <button
            className="w-full mt-3 py-2.5 rounded-lg
      text-sm font-medium text-blue-600
      border border-blue-200
      hover:bg-blue-50 transition"
            onClick={() => setIsmodal(true)}>+ Adicionar usuario</button>
        </div>
      </div>
      <ModalAddUser isModal={isModal} setIsmodal={setIsmodal} atualizar={atualizar} />

      {/* Lista de usuários */}
      <div className="flex flex-col max-h-[500px] overflow-y-auto">
        {dadosFiltrados.map((info) => (
          <div
            key={info.id_funcionario}
            onClick={() => setId(info.id_funcionario)}
            className={`p-3 cursor-pointer border-b border-slate-200 transition duration-150 ${idSelecionado === info.id_funcionario
              ? "bg-blue-50 border-l-4 border-l-blue-500"
              : "bg-white hover:bg-slate-50 border-l-4 border-l-transparent"
              }`}
          >
            <div className="flex gap-3 items-center">
              <div>
                <p
                  className={`w-10 h-10 flex items-center justify-center font-bold text-white rounded-full text-sm ${ObterCorAvatar(
                    info.funcionario_nome
                  )}`}
                >
                  {ObterIniciais(info.funcionario_nome)}
                </p>
              </div>

              <div>
                <p className="font-medium text-slate-700">
                  {info.funcionario_nome}
                </p>

                <p className="font-light text-sm text-slate-500">
                  {info.cargo}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
