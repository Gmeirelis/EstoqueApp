import { ArrowUp, ArrowDown } from "lucide-react";

export default function CardLog({ titulo, dados, tipoMovimentacao }) {

  const iconeLogs = (tipo) =>
    tipo === "ENTRADA" ? ArrowUp : ArrowDown;

  const estiloIcone = (tipo) =>
    tipo === "ENTRADA"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  const Icone = iconeLogs(tipoMovimentacao);

  return (
    <div className="bg-white w-3xs justify-center gap-7 flex flex-col mt-12 p-3.5 rounded-2xl">

      <div className="flex">
        <h1 className="text-sm font-medium text-gray-400">
          {titulo}
        </h1>
      </div>

      <div className="flex items-center gap-2">

        <span
          className={`${estiloIcone(tipoMovimentacao)} p-2 rounded-2xl`}
        >
          <Icone size={25} />
        </span>

        <p className="text-2xl font-bold">
          {dados}
        </p>

      </div>
    </div>
  );
}