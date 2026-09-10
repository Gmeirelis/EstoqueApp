import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

export default function GraficoMovimentos() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      try {
        const api = await fetch("http://localhost:1050/movimentos/porData");

        if (!api.ok) {
          throw new Error("Erro ao buscar dados");
        }

        const data = await api.json();

        const dadosFormatados = data.map((item) => ({
          ...item,
          data: new Date(item.data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
          }),
        }));

        setDados(dadosFormatados);
      } catch (error) {
        console.log("Erro ao receber dados da API:", error);
      }
    }

    buscarDados();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1a5a3a]/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#1a5a3a]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              Movimentações (últimos 7 dias)
            </h3>
            <p className="text-sm text-gray-500">Entradas de itens no sistema</p>
          </div>
        </div>

        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white">
          <option>7 dias</option>
          <option>15 dias</option>
          <option>30 dias</option>
        </select>
      </div>

      {/* Gráfico */}
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dados} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="corEntradas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1a5a3a" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#1a5a3a" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

            <XAxis
              dataKey="data"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                fontSize: 13,
              }}
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#1a5a3a"
              strokeWidth={2.5}
              fill="url(#corEntradas)"
              dot={{ r: 4, fill: "#fff", stroke: "#1a5a3a", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-2 mt-2 justify-center">
        <span className="w-3 h-0.5 bg-[#1a5a3a] inline-block rounded-full" />
        <span className="text-sm text-gray-600">Entradas</span>
      </div>
    </div>
  );
}