
import { useState } from "react"

export default function Botao({
    nome,
    setIsmodal
}){

return(
    <>
    
    <button 
    className="bg-blue-600 text-white rounded-2xl"
    onClick={setIsmodal(true)}
    >{nome}</button>
      
    </>
)


}