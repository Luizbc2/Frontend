import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useState } from "react";
import {
  Calendar,
  Clock,
  List,
  Users,
  Scissors,
  Package,
  CreditCard,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [agendaExpanded, setAgendaExpanded] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || (path === "/" && location.pathname === "/agenda/timeline");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-[#1a1a1a] text-white">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-6 h-6 text-[#4a9d9d]" />
          <h1 className="font-serif text-2xl">Horarius</h1>
        </div>
        <p className="text-sm text-gray-400">LUIZ TESTE 1</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {/* Operação Section */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-3 px-2">OPERAÇÃO</p>
          
          {/* Agenda */}
          <div className="mb-1">
            <button
              onClick={() => setAgendaExpanded(!agendaExpanded)}
              className="w-full flex items-center justify-between px-2 py-2 text-sm hover:bg-gray-800 rounded"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Agenda</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${agendaExpanded ? "rotate-180" : ""}`} />
            </button>
            
            {agendaExpanded && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  to="/agenda/timeline"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${
                    isActive("/agenda/timeline") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Timeline</span>
                </Link>
                <Link
                  to="/agenda/lista"
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${
                    isActive("/agenda/lista") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span>Lista</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/clientes"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded mb-1 ${
              isActive("/clientes") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Clientes</span>
          </Link>

          <Link
            to="/profissionais"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded mb-1 ${
              isActive("/profissionais") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>Profissionais</span>
          </Link>

          <Link
            to="/servicos"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded mb-1 ${
              isActive("/servicos") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Serviços</span>
          </Link>

          <button className="flex items-center justify-between w-full px-2 py-2 text-sm hover:bg-gray-800 rounded">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Em breve</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Crescimento Section */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-3 px-2">CRESCIMENTO</p>
          <Link
            to="/assinatura"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${
              isActive("/assinatura") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Assinatura</span>
          </Link>
        </div>

        {/* Conta Section */}
        <div>
          <p className="text-xs text-gray-500 mb-3 px-2">CONTA</p>
          <Link
            to="/perfil"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${
              isActive("/perfil") ? "bg-[#4a9d9d] text-white" : "hover:bg-gray-800"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Perfil</span>
          </Link>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-[#4a9d9d] rounded-full flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">Luiz Teste 1</p>
            <p className="text-xs text-gray-400 truncate">luiz@teste.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-800 rounded w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f5f1e8]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-gray-200">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 w-64 z-50">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="lg:hidden bg-[#1a1a1a] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#4a9d9d]" />
            <h1 className="font-serif text-xl">Horarius</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-gray-800"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        <Outlet />

        {/* Floating Action Button */}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#4a9d9d] hover:bg-[#3d8585] text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
          <span className="text-2xl">+</span>
        </button>
      </main>
    </div>
  );
}
