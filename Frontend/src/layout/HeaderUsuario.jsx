import { Outlet } from "react-router-dom";
import HeaderUsuario from "../components/usuario/Headerconfig";

export default function LayoutUsuario() {
  return (
    <div className="flex flex-col">
  
      <HeaderUsuario />
      
      <main>
        <Outlet />
      </main>
    </div>
  );
}