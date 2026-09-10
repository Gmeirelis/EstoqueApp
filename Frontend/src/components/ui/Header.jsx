import { Search, Bell, Settings } from "lucide-react";
import icone from "../../assets/icone.png"
import Config from "../../pages/config";
import { NavLink } from 'react-router-dom'

function Header({
  title,
  subtitle,
  
}) {
  return (
    <header className="flex justify-between items-center  border-slate-300  p-1 mt-2 bg-white">

      {/* Título */}
      <div className="ml-10">
        <h1 className="text-md font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {/* Botões */}
      <div className="flex items-center gap-3">

          <NavLink to="/config" >
          <button 
          className="flex items-center justify-center w-12 h-12 border border-slate-200 rounded-xl hover:bg-gray-100 transition bg-white"
          >
          <Settings size={20} />
        </button>
        </NavLink>
       
       <div>
        <button className="flex items-center justify-center w-12 h-12 border border-slate-200 rounded-xl  hover:bg-gray-100 transition bg-white">
          <Bell size={20} />
        </button>


        </div>
        <div className="flex items-center gap-3 px-6 py-5 ">
        <div className="bg-white/20 rounded-full w-11 h-11 flex items-center justify-center">
          <img src={icone} alt="" />
        </div>
        <div>
          <p className="text-black font-bold text-md">Guilherme Meireles</p>
         
        </div>
      </div>

      </div>
    </header>
  );
}

export default Header;


