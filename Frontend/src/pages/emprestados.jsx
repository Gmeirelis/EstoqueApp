import { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Tabela from "../components/Emprestimo/tabelaEmprestimo";
import FiltroEmprestimo from "../components/Emprestimo/FiltroEmprestimo";
import ModalAction from "../components/ui/ModalAction";
import AdicionarEmprestimo from "../components/emprestimo/FormEmprestimo";
import { Filter } from "lucide-react";

export default function Devolution() {
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroColaborador, setFiltroColaborador] = useState("");
  const [dados, setDados] = useState([]);

  const buscarDados = async () => {
    try {
      const api = await fetch("http://localhost:1050/emprestimo");
      const data = await api.json();

      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const atualizarLista = (dadosAtualizados) => {
    setDados((dadosAnteriores) => {
      const novosDados = [dadosAtualizados, ...dadosAnteriores];
      return novosDados;
    });
  };

const atualizarDevolucao = async () =>{
  await buscarDados()
}


  return (
    <>
      <Header
        title="Itens emprestado"
        subtitle="Visão geral do seu estoque"
        buttonText="Registrar emprestimo"
      />
      <main className="bg-slate-100 h-screen">
        <div className="flex flex-col  gap-8 ">
          <div className="flex justify-center gap-5 text-center items-center  mt-32">
            {" "}
            {/*container*/}
            <div className="flex">
              <Filter size={20} />
            </div>
            {/* componente pai vai passar via props o estado filtro dep e colaborador para o componente filho */}
            <FiltroEmprestimo
              filtroDepartamento={filtroDepartamento}
              setFiltroDepartamento={setFiltroDepartamento}
              filtroColaborador={filtroColaborador}
              setFiltroColaborador={setFiltroColaborador}
            />
            {/* modal tem a funcao de abri e fechar modal e abrir o formulario de adicionar item */}
            <ModalAction buttonText="adicionar emprestimo">
              <AdicionarEmprestimo atualizaremprestimo={atualizarLista} />
            </ModalAction>
          </div>
          <div className="ml-10 mr-10">
            {/*a tabela recebe via props o valor selecionado no componente filtroEmprestimo*/}
            <Tabela
              filtroDepartamento={filtroDepartamento}
              filtroColaborador={filtroColaborador}
              atualizarDevolucao={atualizarDevolucao}
              dados={dados}
            />
          </div>
        </div>
      </main>
    </>
  );
}
