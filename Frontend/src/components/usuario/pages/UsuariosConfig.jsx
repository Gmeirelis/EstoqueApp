import { useState, useEffect } from "react";
import Header from "../../ui/Header";
import RenderizacaoUsuario from "../../usuario/renderUsuario";
import ModalUsuario from "../modalUsuario";


export default function UserProfile() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [id, setId] = useState("");

  const buscarFuncionarios = async () => {
    try {
      const resposta = await fetch("http://localhost:1050/funcionarios");
      const dados = await resposta.json();
      setFuncionarios(dados);

      // Seleciona o primeiro usuário por padrão caso nenhum esteja selecionado
      if (dados.length > 0 && !id) {
        setId(dados[0].id_funcionario);
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const atualizarFuncionarioNaLista = (funcionarioAtualizado) => {
    setFuncionarios((listaAnterior) =>
      listaAnterior.map((func) =>
        func.id_funcionario === funcionarioAtualizado.id_funcionario
          ? { ...func, ...funcionarioAtualizado }
          : func,
      ),
    );
  };

  return (
    <>
      

      <main className="bg-slate-100 h-screen pt-8  ">
        <section className="flex items-center gap-36  mt-16">
          <div className="w-96 ml-20 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white ">
            <RenderizacaoUsuario
              funcionarios={funcionarios}
              idSelecionado={id}
              setId={setId}
            />
          </div>

          <div>
            <ModalUsuario
              id={id}
              funcionarios={funcionarios}
              aoAtualizarFuncionario={atualizarFuncionarioNaLista}
            />
          </div>
        </section>
      </main>
    </>
  );
}
