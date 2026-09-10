import ProductEntrada from "../components/EntradaeSainda/EntradaeSaidaFilter"
import Header from "../components/ui/Header"


export default function Saida(){

    return(
        <>
       <Header title="Registro de Saidas" subtitle="Acompanhe as saidas no seu estoque"/>
        
        <div className="flex justify-center text-center mt-40">
        <ProductEntrada  tipo_movimento="SAIDA" />
        </div>
        </>
    )


}