import { LayoutGrid, Package, ArrowDownToLine, Users,  ArrowLeftRight,LogOut} from 'lucide-react'
import caixa from '../assets/caixa.png'
import { NavLink } from 'react-router-dom'


function NavItem({ icon: Icon, label, to }) {
  return (
    <li className="flex justify-center">
      <NavLink
        to={to}
        title={label}
        className={({ isActive }) =>
          `flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 ${
            isActive
              ? 'bg-blue-200 text-blue-800'
              : 'text-blue-200 hover:bg-blue-700 hover:text-white'
          }`
        }
      >
        <Icon size={20} />
      </NavLink>
    </li>
  )
}

function NavSection({ children }) {
  return (
    <ul className="flex flex-col gap-2 py-3 border-t border-blue-700 first:border-0">
      {children}
    </ul>
  )
}

function Sidebar() {
  return (
    <aside className="flex flex-col items-center bg-blue-800 w-20 min-h-screen py-4">
      <div className="p-2 bg-white rounded-2xl mb-6">
        <img src={caixa} alt="StockHub" className="h-7 w-auto" />
      </div>

      <nav className="flex-1 w-full">
        <NavSection>
          <NavItem icon={LayoutGrid} label="Dashboard" to="/dashboard" />
          <NavItem icon={Package} label="Produtos" to="/product" />
          <NavItem icon={ArrowLeftRight} label="Devolução" to="/emprestados" />
        </NavSection>

        <NavSection>
          <NavItem icon={ArrowDownToLine} label="Entrada" to="/entrada" />
        
        </NavSection>

        <NavSection>
          <NavItem icon={Users} label="Usuários" to="/usuario" />
        
        </NavSection>

         <NavSection>
          <NavItem icon={LogOut} label="Sair" to="/login" />
        
        </NavSection>
         
      </nav>
    </aside>
  )
}

export default Sidebar