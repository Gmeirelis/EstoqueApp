import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import MainLayout from "./layout/MainLayout";
import Entrada from "./pages/entrada";
import Product from "./pages/product";
import Devolution from "./pages/emprestados"; 
import UserProfile from "./components/usuario/pages/UsuariosConfig";
import Config from "./pages/config";
import LayoutUsuario from "./layout/HeaderUsuario";

function App() {
  return (
    <Routes>
      {/* Rota sem sidebar */}
      <Route path="/login" element={<Login />} />

      {/* Rotas com sidebar, agrupadas dentro do layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Product />} />
        <Route path="/emprestados" element={<Devolution />} />
        <Route path="/entrada" element={<Entrada />} />

        <Route path="/config" element={<Config />} />
           
           {/* usuarios pagina de configuraçoes */}
             {/* rota pai */}
        <Route path="/usuario" element={<LayoutUsuario />}>   {/* quando clica no icone usuario vai trazer uma url /usuario e vai renderizar layoutusuario*/}
          <Route index element={<UserProfile />} />{/* esse route recebe index porque e a primeira pagina padraoa ser renderizada e na sua navlink recebe to /usuario porque com esse url ele volta para layoutusuario e por padrao renderiza o index que usuario*/}
          <Route path="config" element={<Config />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
