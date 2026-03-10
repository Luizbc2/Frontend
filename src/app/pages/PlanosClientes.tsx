import { Search, Calendar } from "lucide-react";
import { Input } from "../components/ui/input";

export function PlanosClientes() {
  const plans: any[] = [];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">GESTÃO &gt; PLANOS DE CLIENTES</p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar planos..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Plans List or Empty State */}
      {plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg mb-2">Nenhum plano recorrente</h3>
          <p className="text-gray-500">
            Quando você criar planos recorrentes para clientes, eles aparecerão aqui.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          {/* Plans would be listed here */}
        </div>
      )}
    </div>
  );
}
