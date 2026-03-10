import { Search, Plus, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const stats = [
  { label: "Clientes", value: "0" },
  { label: "Conversas Ativas", value: "0" },
  { label: "Não Lidas", value: "0" },
];

const conversations = [
  // Empty state - no conversations yet
];

export function Clientes() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">GESTÃO &gt; CLIENTES</p>
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

      {/* New Client Button */}
      <div className="mb-6">
        <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Inbox */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conversas..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="p-8">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg mb-2">Nenhuma conversa ainda</h3>
              <p className="text-gray-500 mb-4">
                Quando você tiver conversas com clientes, elas aparecerão aqui.
              </p>
              <Button className="bg-[#4a9d9d] hover:bg-[#3d8585] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Cliente
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation: any) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-[#4a9d9d] rounded-full flex items-center justify-center text-white">
                      {conversation.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="truncate">{conversation.name}</h4>
                        <span className="text-xs text-gray-500">
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
