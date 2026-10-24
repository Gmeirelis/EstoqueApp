import { useState } from 'react';
import { X,Plus} from 'lucide-react';

// Recebemos as props para deixar o componente dinâmico
export default function ModalAction({ buttonText, modalTitle, children,type }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
 
  
  return (
    <>
      {/* Botão Dinâmico */}
      <button
        onClick={handleOpenModal}
        className="flex items-center gap-2 p-2 rounded-4xl  text-black   font-semibold  hover:bg-blue-700 hover:text-white duration-300"
      >
        <Plus size={20}/>
        {buttonText} {/* Ex: "Adicionar Item" ou "Registrar Empréstimo" */}
      </button>

      {/* Modal Dinâmico */}
     {isModalOpen && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className=" p-6 rounded-xl shadow-lg min-w-3xs bg-white ">
      
        <span className='flex items-center justify-between p-4 gap-7'>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {modalTitle}
      </h2>
      
     <div className='flex justify-end'>
         <button 
         onClick={handleCloseModal}
       >
        < X size={20} />
        </button>
       </div>
      </span>
         <div className="mb-6">
              {typeof children === "function"
                ? children({ handleCloseModal })
                : children}
            </div>
   
     <div className='flex justify-center'>
    
    </div>
    </div>
  </div>
)}
    </>
  );
}