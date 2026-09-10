


export function calcularStatus(quantidade) {
  if (quantidade === 0) return "Zerado";
  if (quantidade < 3) return "Baixo";
  return "Ok";
}

export function getStatusStyle(status) {
  switch (status) {
    case "Ok":
      return "bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";

    case "Baixo":
      return "bg-yellow-100 text-yellow-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";

    case "Zerado":
      return "bg-red-100 text-red-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";

    default:
      return "bg-gray-100 text-gray-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";
  }
}

export function getStatusStyleEmprestismo(status) {
  switch (status) {
    case "Ativo":
      return "bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";

    case "Livre":
      return "bg-yellow-100 text-yellow-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";

    default:
      return "bg-gray-100 text-gray-700 inline-block px-3 py-1 rounded-full text-lg font-medium ";
  }
}