export default function Card({ icone: Icone, name, numero, tom = 'default' }) {
  const tons = {
    default: 'bg-blue-50 text-blue-800',
    alerta: 'bg-amber-50 text-amber-700',
  }

  return (
    <div className="flex flex-col bg-white min-w-52 rounded-xl border border-slate-200 p-5 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <span className={`p-2 rounded-lg ${tons[tom]}`}>
          <Icone size={20} />
        </span>
        <p className="text-sm font-medium text-gray-500">{name}</p>
      </div>

      <p className="text-3xl font-bold text-gray-900">{numero}</p>
    </div>
  );
}