import ProductEntrada from "../components/EntradaeSainda/EntradaeSaidaFilter"
import Header from "../components/ui/Header"


export default function Entrada(){
  
    return(
        <>
       <Header title="Movimentação de estoque" subtitle="Acompanhe as entradas e saídas do seu estoque"/>
       <section className="bg-gray-100">
        <div className="flex  gap-9 justify-center">
        </div>
        <div className="flex justify-center text-center mt-24">
        <ProductEntrada />
        </div>
        </section>
        </>
    )


}