import API_URL from "../../../config/apis";


export default function DeleteDep({isModal,idDep,updateDados,setIsmodal}){

  const deletarDep = async (id) => {
    try {

      const resposta = await fetch(
        `${API_URL}/departamento/${id}`,
        {
          method: "PATCH",
        }
      );

      if (!resposta.ok) {
        throw new Error(
          `Erro na requisição: ${resposta.status}`
        );
      }
     
      updateDados()

    } catch (error) {
      console.log("Erro ao desativar departamento:", error);
    }
  };


  return(
   <>
  {isModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

        {/* Cabeçalho */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Excluir departamento?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Tem certeza que deseja excluir este departamento?
          </p>
        </div>

        {/* Aviso */}
        <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm leading-5 text-yellow-800">
            Após excluir o departamento, os funcionários que pertencem a ele
            serão movidos para <strong>Sem Departamento</strong>.
          </p>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsmodal(false)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              deletarDep(idDep);
              setIsmodal(false);
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Sim, excluir
          </button>
        </div>

      </div>
    </div>
  )}
</>
  )
}