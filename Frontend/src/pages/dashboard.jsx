
import Header from "../components/ui/Header";
import Summary from "../components/Dashboard/DashboardSummy";
import GraficoCategoria from "../components/Dashboard/GraficosCategoria";
import GraficoMovimentos from "../components/Dashboard/MovimentosGraficos";


function Dashboard() {
  return (
    <div className="bg-slate-100 min-h-screen w-full pb-12">
      <Header
      title={"Equipamentos"}
      subtitle={"Visão geral do estoque"}
      />

      {/* visão geral */}
      <div className="flex text-center justify-center gap-20 mt-20 flex-col">
        <Summary />
      </div>

      {/* productRecent */}
     <div className="flex gap-6 mt-12 mx-20">
  <div className="flex-1 min-w-0">
    <GraficoCategoria />
  </div>
  <div className="flex-1 min-w-0">
    <GraficoMovimentos />
  </div>
</div>
    </div>
  );
}
export default Dashboard;
