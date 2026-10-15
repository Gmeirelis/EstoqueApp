
import { useState, useEffect } from "react";

export default function SelectDinamico({
  nome,
  info,
  url,
  idKey,
  aoMudar,
  valor,
  update
}) {
  const [dados, setDados] = useState([]);



 async function buscarDados() {
      const token = localStorage.getItem("token");

      try {
        const api = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await api.json();

        setDados(data);
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
  setDados([]);
  buscarDados();
}, [url, update]);;

 

  return (
    <select
      className="p-2 border border-gray-300 rounded-lg w-44 bg-white h-10 px-3 text-sm"
      onChange={(e) => aoMudar(e.target.value)}
      value={valor || ""}
    >
      <option value={dados[idKey]} className="text-sm border-0">
        {nome}
      </option>

      {Array.isArray(dados) &&
        dados
          .filter(
            (dado, index, self) =>
              index === self.findIndex((t) => t[info] === dado[info])
          )
          .map((dado) => {
            const valor = dado[idKey];

            return (
              <option key={valor} value={valor}>
                {dado[info]}
              </option>
            );
          })}
    </select>
  );
}
