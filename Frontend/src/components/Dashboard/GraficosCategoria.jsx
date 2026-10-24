import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ChartPie } from "lucide-react";

export default function GraficoCategoria() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      try {
        const api = await fetch("http://localhost:1050/itens/porCategoria");
        const data = await api.json();
        setDados(data);
      } catch (error) {
        console.log("erro ao receber dados api", error);
      }
    }

    buscarDados();
  }, []);

  const CORES = ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4"];

  const totalGeral = dados.reduce((total, item) => total + item.total, 0);

  return (
    <div
      className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-6
      transition-all duration-200
      hover:-translate-y-1 hover:shadow-lg hover:border-grey-200"
    >
      {/* Cabeçalho do card */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100">
          <ChartPie size={26} className="text-purple-600" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">Itens por categoria</h2>
          <p className="text-sm text-gray-500">Distribuição dos itens por categoria</p>
        </div>
      </div>

      {dados.length === 0 ? (
        <div className="h-[280px] flex items-center justify-center text-sm text-gray-400">
          Carregando dados...
        </div>
      ) : (
        <div className="flex items-center gap-1">
          {/* Donut */}
          <div className="w-[55%] h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dados}
                  dataKey="total"
                  nameKey="categoria_nome"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
                  paddingAngle={2}
                >
                  {dados.map((item, index) => (
                    <Cell key={index} fill={CORES[index % CORES.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} itens`, name]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 13 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda customizada */}
          <div className=" flex flex-col gap-3 flex-1">
            {dados.map((item, index) => {
              const porcentagem = totalGeral > 0 ? ((item.total / totalGeral) * 100).toFixed(1) : 0;

              return (
                <div key={index} className="flex items-center justify-between text-md ">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: CORES[index % CORES.length] }}
                    />
                    <span className="text-gray-700">{item.categoria_nome}</span>
                  </div>
                  <span className="text-gray-500">
                    {item.total} ({porcentagem}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Rodapé */}
      <p className="text-sm text-gray-600 mt-4">
        Total de itens: <strong>{totalGeral}</strong>
      </p>
    </div>
  );
}