import { useState } from "react";

export default function ModaladdCategory({ isModal, setIsmodal, updateState }) {
  const [nameCategory, setNomeCategory] = useState("");

  const addCategory = async () => {
    const category = {
      nome: nameCategory,
    };

    try {
      const resposta = await fetch("http://localhost:1050/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      if (!resposta) {
        throw new Error("servidor respodeu porem aconteceu um erro");
      }

      updateState();
    } catch (erro) {
      console.log("erro por parte do cliente", erro);
    }
  };

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Nova categoria
              </h2>

              <button
                type="button"
                onClick={() => setIsmodal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo */}
            <div className="px-6 py-5">
              <p className="mb-5 text-sm text-gray-500">
                Adicione uma nova categoria para organizar seus itens.
              </p>

              <label
                htmlFor="categoria"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nome da categoria
              </label>

              <input
                id="categoria"
                type="text"
                name="categoria"
                value={nameCategory}
                onChange={(e) => setNomeCategory(e.target.value)}
                placeholder="Ex: Notebook"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Rodapé */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsmodal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => {
                  (addCategory(), setIsmodal(false));
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
              >
                Adicionar categoria
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
("");
