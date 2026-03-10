import { User } from "lucide-react";

const avatarOptions = [
  { id: 1, emoji: "👨", label: "Homem 1" },
  { id: 2, emoji: "👨🏻", label: "Homem 2" },
  { id: 3, emoji: "👨🏼", label: "Homem 3" },
  { id: 4, emoji: "👨🏽", label: "Homem 4" },
  { id: 5, emoji: "👨🏾", label: "Homem 5" },
  { id: 6, emoji: "👨🏿", label: "Homem 6" },
  { id: 7, emoji: "👩", label: "Mulher 1" },
  { id: 8, emoji: "👩🏻", label: "Mulher 2" },
  { id: 9, emoji: "👩🏼", label: "Mulher 3" },
  { id: 10, emoji: "👩🏽", label: "Mulher 4" },
  { id: 11, emoji: "👩🏾", label: "Mulher 5" },
  { id: 12, emoji: "👩🏿", label: "Mulher 6" },
  { id: 13, emoji: "🧑", label: "Pessoa 1" },
  { id: 14, emoji: "🧑🏻", label: "Pessoa 2" },
  { id: 15, emoji: "🧑🏼", label: "Pessoa 3" },
  { id: 16, emoji: "🧑🏽", label: "Pessoa 4" },
];

export function Perfil() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">CONTA &gt; PERFIL</p>
        <p className="text-xs text-gray-500">
          Cmd/Ctrl + B alterna a navegação
        </p>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl mb-6">Informações do Perfil</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Nome</label>
              <input
                type="text"
                defaultValue="Luiz Teste 1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <input
                type="email"
                defaultValue="luiz@teste.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Telefone</label>
              <input
                type="tel"
                defaultValue="(11) 98765-4321"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button className="px-6 py-2 bg-[#4a9d9d] hover:bg-[#3d8585] text-white rounded-md">
            Salvar Alterações
          </button>
        </div>

        {/* Avatar Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl mb-6">Escolha seu Avatar</h2>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                className="aspect-square rounded-lg border-2 border-gray-200 hover:border-[#4a9d9d] transition-colors flex items-center justify-center text-4xl bg-gray-50 hover:bg-gray-100"
                title={avatar.label}
              >
                {avatar.emoji}
              </button>
            ))}
            
            {/* Default/Current Avatar Option */}
            <button className="aspect-square rounded-lg border-2 border-[#4a9d9d] bg-[#4a9d9d] transition-colors flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Clique em um avatar para selecioná-lo como sua foto de perfil
          </p>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl mb-6">Segurança</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Senha Atual</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Nova Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-600 mb-2">Confirmar Nova Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button className="mt-4 px-6 py-2 bg-[#4a9d9d] hover:bg-[#3d8585] text-white rounded-md">
            Alterar Senha
          </button>
        </div>
      </div>
    </div>
  );
}
