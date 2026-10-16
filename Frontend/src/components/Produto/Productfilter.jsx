import { useState, useEffect } from "react";
import API_URL from "../../config/apis";
function FullProduct({ title, full }) {
  return (
    <div className="flex flex-col border-2 border-slate-200 text-center p-5 rounded-3xl mb-4">
      <p className="text-2xl w-28">{title}</p>
      {/* Renders the number passed down via the 'full' prop */}
      <p className="text-3xl font-semibold">{full}</p>
    </div>
  );
}

export default function CardProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/itens`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('erro na api');
        }
        return res.json();
      })
      .then((data) => {
      
        setProducts(data);
      })
      .catch((error) => console.error('Erro na busca de api:', error));
  }, []);

  return (
    <>
      
      <FullProduct title="Total de produto" full={products.length} />
      <FullProduct title="Total itens ok" full={products.filter((prod)=> prod.itens_quantidade > 3).length} />
        <FullProduct title="Total itens abaixo" full={products.filter((prod)=> prod.itens_quantidade < 3).length} />
         <FullProduct title="Total itens abaixo" full={products.filter((prod)=> prod.itens_quantidade === 0).length} />
    </>
  );
}