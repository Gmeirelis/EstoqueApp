import Header from "../components/ui/Header";

import FilterTablet from "../components/Produto/ProductTable";

import { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:1050/product/itens/produtos", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("erro na api");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Erro na busca de api:", error));
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        <Header
          title="Produtos"
          subtitle="Gerencie todos os itens do estoque"
          buttonText="Nova Entrada"
        />
        <div className="flex flex-col justify-center ml-20 mr-20 mt-24 ">
          <FilterTablet />
        </div>
      </div>
    </>
  );
}

export default Product;



/*
      <div className=" flex justify-center mt-36 gap-16">
        <Card
          icone={PackageCheck}
          name="Total de produto"
          numero={products.length}
        />

        <Card
          icone={AlertTriangle}
          name="Total itens abaixo"
          numero={products.filter((prod) => prod.quantidade < 2 ).length}
        />
        <Card
          icone={PackageX}
          name="Total itens Zerados"
          numero={products.filter((prod) => prod.quantidade === 0).length}
        />
      </div>

      <div >*/