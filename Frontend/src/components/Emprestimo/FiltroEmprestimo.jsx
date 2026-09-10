import SelectDinamico from "../ui/SelectFilter";

export default function FiltroEmprestimo({
  filtroDepartamento,
  setFiltroDepartamento,
  filtroColaborador,
  setFiltroColaborador
}) {

  return (
    <div className="flex gap-4">

      <SelectDinamico
        nome="departamento"
        info="departamento_nome"
        url="http://localhost:1050/emprestimo/selectnome"
        value={filtroDepartamento}
        aoMudar={(valorSelecionado) =>
          setFiltroDepartamento(valorSelecionado)
        }
      />

      <SelectDinamico
        nome="funcionario"
        info="funcionario_nome"
        url="http://localhost:1050/emprestimo/selectnome"
        value={filtroColaborador}
        aoMudar={(valorSelecionado) =>
          setFiltroColaborador(valorSelecionado)
        }
      />

    </div>
  );
}