
import Select from "../../utils/SelectName";
import API_URL from "../../config/apis";


export default function FiltroEmprestimo({
  filtroDepartamento,
  setFiltroDepartamento,
  filtroColaborador,
  setFiltroColaborador
}) {

  return (
    <div className="flex gap-4">

      
       <Select
        nome={"selecione departamento"}
      url={`${API_URL}/emprestimo/selectnome`}
      valor={filtroDepartamento}
      setValor={setFiltroDepartamento}
      chave="id_emprestimo"
      nomeEntidade="departamento_nome"
       
       />
     <Select
     nome={"selecione funcionario"}
      url={`${API_URL}/emprestimo/selectnome`}
      valor={filtroColaborador}
      setValor={setFiltroColaborador}
      chave="id_emprestimo"
      nomeEntidade="funcionario_nome"
     
     />

    </div>
  );
}