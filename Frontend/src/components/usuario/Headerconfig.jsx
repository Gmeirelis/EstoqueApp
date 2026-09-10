import { NavLink } from "react-router-dom";
import Header from "../ui/Header";
import { useState } from "react";

function NavItem({ label, to,style,funcSelecionar}) {
  return (
    <NavLink to={to} className={style} onClick={funcSelecionar}>
      {label}
    </NavLink>
  );
}

export default function HeaderUsuario() {

  const[selecionado,setSelecionado] = useState('usuarios')

function selecinarUuario(){
  setSelecionado('usuarios')
}

function selecionarConfig(){
  setSelecionado('configuracao')
}

  return (
    <>
    <Header
        title="Usuarios"
        subtitle="Veja seu perfil, navegue pelos usuários e cadastre novos acessos."
      />

    <header className="flex   bg-white border-b-1 border-t-1 p-2 border-gray-200">
      <div className="flex  gap-6 ml-5 items-center mt-5">
      <NavItem
        label="Usuários"
        to="/usuario"
        funcSelecionar={selecinarUuario}
        style={`${
    selecionado === "usuarios"
      ? " text-blue-700 border-b-1 p-2 font-bold "
      : "text-gray-700 font-medium"
  }`}
      />

      <NavItem
        label="Configuração"
        to="/usuario/config"
        funcSelecionar={selecionarConfig}
         style={`${
    selecionado === "configuracao"
      ? " text-blue-700 border-b-1 p-2 font-bold"
      : "text-gray-700 font-medium"
  }`}
      />
      </div>
    </header>
    </>

  );
}