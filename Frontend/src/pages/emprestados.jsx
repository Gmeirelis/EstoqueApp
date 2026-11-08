import { useState, useEffect } from "react";
import Header from "../components/ui/Header";
import Tabela from "../components/Emprestimo/tabelaEmprestimo";
import FiltroEmprestimo from "../components/Emprestimo/FiltroEmprestimo";
import ModalAction from "../components/ui/ModalAction";
import AdicionarEmprestimo from "../components/Emprestimo/FormEmprestimo";
import { Filter } from "lucide-react";
import API_URL from "../config/apis";
import EmprestimoVazio from "../components/Emprestimo/EmprestimoVazio";


export default function Devolution() {
  const [filtroDepartamento, setFiltroDepartamento] = useState("");
  const [filtroColaborador, setFiltroColaborador] = useState("");
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [isModal,setIsModal] = useState(false)


  const buscarDados = async () => {
    try {
      const api = await fetch(`${API_URL}/emprestimo`);
      const data = await api.json();
      setDados(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setCarregando(false);
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

  const atualizarDevolucao = async () => {
    await buscarDados()
  }


 return (
  <>
    <Header
      title="Itens emprestado"
      subtitle="Visão geral do seu estoque"
      buttonText="Registrar emprestimo"
    />
    <main className="bg-slate-100 min-h-screen">
      <div className="flex flex-col gap-8">

        {/* UMA barra só: aparece apenas se houver empréstimos */}
        {dados.length > 0 && (
          <div className="flex justify-center gap-5 text-center items-center mt-32">
            <div className="flex">
              <Filter size={20} />
            </div>
            <FiltroEmprestimo
              filtroDepartamento={filtroDepartamento}
              setFiltroDepartamento={setFiltroDepartamento}
              filtroColaborador={filtroColaborador}
              setFiltroColaborador={setFiltroColaborador}
            />
          <ModalAction buttonText="adicionar emprestimo">
  {({ handleCloseModal }) => (
    <AdicionarEmprestimo
      atualizaremprestimo={atualizarLista}
      setIsModal={handleCloseModal}
    />
  )}
</ModalAction>
          </div>
        )}

        <div className={`ml-10 mr-10 ${dados.length === 0 ? "mt-32" : ""}`}>
          {carregando ? (
            <p className="text-center text-slate-500">Carregando...</p>
          ) : dados.length === 0 ? (
            <EmprestimoVazio atualizarLista={atualizarLista} />
          ) : (
            <Tabela
              filtroDepartamento={filtroDepartamento}
              filtroColaborador={filtroColaborador}
              atualizarDevolucao={atualizarDevolucao}
              dados={dados}
              limparFiltros={() => {
                setFiltroDepartamento("");
                setFiltroColaborador("");
              }}
            />
          )}
        </div>
      </div>
    </main>
  </>
);
}
