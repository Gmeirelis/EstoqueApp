import { useState } from "react"



export default function ModalDevolucao({fecharModal,funDevolucao}){

const [ismodal,setIsmodal] = useState(false)
const[id,setid] = useState({
    id_emprestimo:null,
    id_item:null
})
console.log(id)

function controlaModal(boleano){
    setIsmodal(boleano)
    fecharModal(boleano)
}

    return(
        <>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
        <h1>Tem certeza ?</h1>
          <div>
            <button
             onClick={funDevolucao}
             >Sim</button>
            <button onClick={()=> controlaModal(false)}>Não</button>
          </div>
</div>
        </>
    )
}

