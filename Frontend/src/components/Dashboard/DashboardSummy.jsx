import { useState, useEffect } from "react";
import Card from "../ui/CardFilter";
/*import { Package, Wrench, Laptop, PackageCheck } from "lucide-react";*/
import {  Wrench, PackageCheck,Laptop } from "lucide-react";
import API_URL from "../../config/apis";


export default function Summary() {
  const [resumo, setResumo] = useState([]);
  console.log(resumo)
//const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_URL}/product/itens`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setResumo(dados);
      
      })
      .catch((erro) => console.error("Erro ao buscar dados da API:", erro));
  }, []); 

  // Dica de legibilidade: use 'item' no singular, pois o filter analisa um por vez
  const dadosfiltrados = resumo.filter(item => item.item_status === "ATIVO" || "MANUTENCAO");
  const filtroManutencao = dadosfiltrados.filter(item => item.item_status === "MANUTENCAO")
  const filtroEmuso = dadosfiltrados.filter(item =>item.situal_emprestimo === "DISPONIVEL")
  const filtroEmprestado = dadosfiltrados.filter(item =>item.situal_emprestimo === "INDISPONIVEL")
  //const filtroDisponivel = dadosfiltrados.filter(item => item.situal_emprestimo === "DISPONIVEL")
  console.log(resumo)
  console.log(filtroManutencao)

  return (
    <div className="flex gap-24 justify-center">
     <Card 
        icone={PackageCheck} 
        numero={dadosfiltrados.length} 
        name="Total de Itens" 
        
      />
       <Card 
        icone={Wrench} 
        numero={filtroManutencao.length} 
        name="Total de Itens em manutençaõ" 
      />

        <Card 
        icone={Laptop} 
        numero={filtroEmuso.length} 
        name="Disponivel" 
      />
          <Card 
        icone={Laptop} 
        numero={filtroEmprestado.length} 
        name="emprestado" 
      />
    </div>
    
  );
}
