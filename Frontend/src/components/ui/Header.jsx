import {  Bell, Settings } from "lucide-react";
import icone from "../../assets/icone.png"
import { NavLink } from 'react-router-dom'
import { useState } from "react";
import CaixaNotificacao from "./CaixaNoticacao";

function Header({
  title,
  subtitle,
  
}) 
{

const [isModal,setIsModal] = useState(false)


const usuario = JSON.parse(localStorage.getItem("usuario"));

const name = usuario.usuario?.nome || "Carregando"
const userName= usuario.usuario?.sobrenome || "....."
const nomeFormatado = name ? name.charAt(0).toUpperCase() + name.slice(1) 
  : "";


  return (
    <>
    <header className="flex justify-between items-center  border-slate-300  p-1 mt-2 bg-white">

      {/* Título */}
      <div className="ml-10">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Botões */}
      <div className="flex items-center gap-3">

       
      <div className="relative mt-5">

      <button
        onClick={() => setIsModal(!isModal)}
        className="relative flex h-12 w-12 items-center justify-center
        rounded-xl border border-slate-200 bg-white
        transition hover:bg-gray-100"
      >
        <Bell size={20} />

        {/* Indicador de notificações */}
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {isModal && (
        <div className="absolute right-0 top-14 z-50">
          <CaixaNotificacao />
        </div>
      )}

    </div>
        <div className="flex items-center gap-3 px-6 py-5 ">
        <div className="bg-white/20 rounded-full w-11 h-11 flex items-center justify-center">
          <img src={icone} alt="" />
        </div>
        <div>
          <p className="text-black font-bold text-md">{`${nomeFormatado } ${userName}`}</p>
         
        </div>
      </div>

      </div>
    </header>
    </>
  );
}

export default Header;


