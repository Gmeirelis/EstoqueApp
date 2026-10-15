import { useEffect, useState } from "react";
import RenderDep from "../componentsDep/RenderDep";
import ModalDep from "../componentsDep/ModalDepartamento";
import API_URL from "../../../config/apis";

export default function Dep() {
  const [dados, setDados] = useState([]);
  const [idSelect, setIdSelect] = useState("");

  const buscarDados = async () => {
    try {
      const resposta = await fetch(
        `${API_URL}/departamentos/public`,
      );

      if (!resposta.ok) {
        throw new Error("erro em buscar dados");
      }

      const data = await resposta.json();
      setDados(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  return (
    <>
      <main className="bg-slate-100">
        <section className="flex  gap-5  w-6xl justify-start ml-20">
          <div className="mt-14 h-screen flex gap-16">
            <div>
              <RenderDep
                dados={dados}
                atualizarDados={buscarDados}
                selectDepId={setIdSelect}
              />
            </div>
            <div>
              <ModalDep id={idSelect} dados={dados} updateDados={buscarDados} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
