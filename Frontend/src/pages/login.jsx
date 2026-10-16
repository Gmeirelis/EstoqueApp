import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../config/apis";

 function Login() {



const [email,setEmail] = useState('')
const [senha,setSenha] = useState('')


const navigate = useNavigate()

function entrar(e){
  e.preventDefault()



const dados = {
  email:email,
  senha:senha
}


console.log(dados)

const enviarDados = async() =>{

try{
 const resposta = await fetch(`${API_URL}/user/loginUser`,{
  method:"POST",
  headers:{
     "Content-Type": "application/json",
  },
  body: JSON.stringify(dados)
  })
 

const res = await resposta.json()
console.log(res)
localStorage.setItem("token", res.token);
localStorage.setItem("usuario", JSON.stringify(res))
 

 if (resposta.ok) {
        setEmail("");
        setSenha("");
         navigate('/dashboard')
      }
}catch (erro) {
      console.error("Erro:", erro);
     
    } 
}
enviarDados()



}

  return (
   <div className="flex h-screen">
  
  {/* Lado do login */}
  <div className="flex-1 flex justify-center items-center w-full">
    <form onSubmit={entrar}>
    <div className="p-12  border-gray-300 rounded-xl shadow-lg flex flex-col gap-14 w-xl justify-center">
     <div className="text-center flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-center">
        Faça seu Login
      </h1>
      <p>Faça seu login para poder entrar</p>
      </div>
      <input 
        type="email"
        placeholder="Digite seu e-mail"
        className="w-full p-3 border border-gray-300 rounded-md"
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
      />

      <input 
        type="password"
        placeholder="Digite sua senha"
        className="w-full p-3 border border-gray-300 rounded-md"
        value={senha}
        onChange={(e)=>setSenha(e.target.value)}
      />

      <button className="w-full p-3 bg-green-600 text-white rounded-md" type="submit">
        Entrar
      </button>
    </div>
    </form>
  </div>

  {/* Lado direito */}
  <div className="flex-1 h-full bg-green-700 flex  justify-center rounded-l-3xl">
    <div className="">
    <h1 className="text-white text-5xl p-10">
      Aplicativo Estoque
    </h1>
    
  </div>
</div>
</div>
  );
}

export default Login;