import ObterIniciais from "../../../utils/funcaoIniciais";
import { useEffect,useState } from "react";
import API_URL from "../../../config/apis";
// modal de funcionario em cada departamento

 export default function ModalUserDep({ idDep }) {
  const [dados, setDados] = useState([]);



  const getDepUser = async () => {
    const resposta = await fetch(`${API_URL}/department/${idDep}`);

    if (!resposta) {
      throw new Error("error ao buscar dados api");
    }
    const data = await resposta.json();
    setDados(data.messagen);
  };

  useEffect(() => {
    getDepUser();
  }, []);

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

  return (
    <>
      <div className="border-2 border-slate-100 max-h-44 overflow-y-auto">
        {dados.length > 0 ? (
          dados.map((dado) => {
            return (
              <div
                key={dado.id_funcionario}
                className="flex gap-2 p-4 border-b-1 border-slate-100"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center font-medium text-white text-md rounded-full ${ObterCorAvatar(dado.funcionario_nome)}`}
                >
                  <h1>{ObterIniciais(dado.funcionario_nome)}</h1>
                </div>

                <div>
                  <p>{dado.funcionario_nome}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="p-4 text-center text-slate-500">
            Nenhum funcionário nesse departamento.
          </p>
        )}
      </div>
    </>
  );
}