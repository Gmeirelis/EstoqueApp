import { NavLink } from "react-router-dom";
import Header from "../ui/Header";

function NavItem({ label, to, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "text-blue-700 border-b-2 p-2 font-bold"
          : "text-gray-700 font-medium p-2"
      }
    >
      {label}
    </NavLink>
  );
}

export default function HeaderUsuario() {
  return (
    <>
      <Header
        title="Usuarios"
        subtitle="Veja seu perfil, navegue pelos usuários e cadastre novos acessos."
      />

      <header className="flex bg-white border-b-1 border-t-1 p-2 border-gray-200">
        <div className="flex gap-6 ml-5 items-center mt-5">
          <NavItem 
            label="Usuários" 
            to="/usuario" 
            end 
          />
          <NavItem 
            label="Departamentos" 
            to="/usuario/departamento" 
          />
        </div>
      </header>
    </>
  );
}