import { useEffect, useState } from "react";

export default function Select({
  nome,
  url,
  valor,
  setValor,
  chave,
  nomeEntidade,
}) {
  
  const [dados, setDados] = useState([]);

  
  console.log("meus:",dados);

  useEffect(() => {
    async function buscar() {
     

      try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const data = await resposta.json();

        const dadosUnicos = data.filter(
          (dado, index, array) =>
            index ===
            array.findIndex(
              (item) => item[nomeEntidade] === dado[nomeEntidade],
            ),
        );

        setDados(dadosUnicos);
      } catch (erro) {
        console.log("Erro ao buscar dados:", erro);
      }
    }

    buscar();
  }, []);

  return (
    <select
      className="p-2 border border-gray-300 rounded-lg w-44 bg-white h-10 px-3 text-sm"
      value={valor}
      onChange={(e) => setValor(e.target.value)}
    >
      <option value="">{nome}</option>

      {dados.map((dado) => (
        <option key={dado[chave]} value={dado[nomeEntidade]}>
          {dado[nomeEntidade]}
        </option>
      ))}
    </select>
  );
}
