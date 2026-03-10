import { Plus, Edit, Clock, Ban, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

const stats = [
  { label: "Profissionais", value: "1" },
  { label: "Em Atividade", value: "1" },
  { label: "Google Conectado", value: "Off", isToggle: true },
];

const professionals = [
  {
    id: 1,
    name: "Fodedor",
    avatar: "F",
    specialties: ["Corte", "Barba", "Pigmentação"],
    phone: "(11) 98765-4321",
    status: "ativo",
  },
];

export function Profissionais() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">GESTÃO &gt; PROFISSIONAIS</p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                <p className="text-3xl">{stat.value}</p>
              </div>
              {stat.isToggle && (
                <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Professional Button */}
      <div className="mb-6">
        <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Profissional
        </Button>
      </div>

      {/* Professionals List */}
      <div className="space-y-4">
        {professionals.map((professional) => (
          <div key={professional.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-16 h-16 bg-[#4a9d9d] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  {professional.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl mb-2">{professional.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {professional.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-[#e8f4f4] text-[#4a9d9d] rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{professional.phone}</p>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Ativo
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 lg:w-48">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Horários
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Ban className="h-4 w-4 mr-2" />
                  Bloqueios
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (if no professionals) */}
      {professionals.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg mb-2">Nenhum profissional cadastrado</h3>
          <p className="text-gray-500 mb-4">
            Adicione profissionais para começar a gerenciar sua equipe.
          </p>
          <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Profissional
          </Button>
        </div>
      )}
    </div>
  );
}
