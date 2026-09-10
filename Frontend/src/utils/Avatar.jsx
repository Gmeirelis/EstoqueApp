const coresAvatar = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-orange-500",
  "bg-pink-600",
  "bg-cyan-600",
  "bg-indigo-600",
  "bg-rose-600",
];

 export default function ObterCorAvatar(nome) {
  let valor = 0;

  for (let i = 0; i < nome.length; i++) {
    valor = nome.charCodeAt(i) + ((valor << 5) - valor);
  }

  const indice = Math.abs(valor) % coresAvatar.length;

  return coresAvatar[indice];
}