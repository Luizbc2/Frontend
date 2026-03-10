import { Plus, Edit, Trash2, Clock, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";

const stats = [
  { label: "Serviços Ativos", value: "5" },
  { label: "Ticket Médio", value: "R$ 31,00" },
  { label: "Estado", value: "Organizado" },
];

const services = [
  {
    id: 1,
    name: "Corte Simples",
    duration: "20 MIN",
    price: "R$ 25,00",
    category: "Corte",
  },
  {
    id: 2,
    name: "Corte + Barba",
    duration: "40 MIN",
    price: "R$ 45,00",
    category: "Combo",
  },
  {
    id: 3,
    name: "Barba",
    duration: "20 MIN",
    price: "R$ 20,00",
    category: "Barba",
  },
  {
    id: 4,
    name: "Pigmentação",
    duration: "30 MIN",
    price: "R$ 35,00",
    category: "Especializado",
  },
  {
    id: 5,
    name: "Sobrancelha",
    duration: "15 MIN",
    price: "R$ 30,00",
    category: "Estética",
  },
];

export function Servicos() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">GESTÃO &gt; SERVIÇOS</p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className="text-3xl">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* New Service Button */}
      <div className="mb-6">
        <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-[#e8f4f4] text-[#4a9d9d] rounded-full text-xs">
                {service.category}
              </span>
            </div>

            {/* Service Name */}
            <h3 className="text-lg mb-4">{service.name}</h3>

            {/* Duration and Price */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-[#4a9d9d]" />
                <span>{service.price}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {services.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg mb-2">Nenhum serviço cadastrado</h3>
          <p className="text-gray-500 mb-4">
            Adicione serviços para começar a gerenciar seu catálogo.
          </p>
          <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Serviço
          </Button>
        </div>
      )}
    </div>
  );
}
