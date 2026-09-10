
import UserProfile from "../components/usuario/pages/UsuariosConfig"
import Config from "./config"

import { Routes, Route} from 'react-router-dom'
import LayoutUsuario from "../layout/HeaderUsuario"

export default function UserProfileManager() {

return (
<>

<Routes>
<Route element={<LayoutUsuario/>} />
<Route path="/userProfile" element={<UserProfile/>}/>
<Route path="/config" element={<Config/>}/>

</Routes>



</>
)

}