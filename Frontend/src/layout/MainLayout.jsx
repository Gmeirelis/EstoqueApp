// components/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Siderbar'

function MainLayout() {
  return (
    <div className="flex ">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout