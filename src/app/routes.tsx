import { createBrowserRouter, Navigate, useLocation } from "react-router";

import { useAuth } from "./auth/AuthContext";
import { Layout } from "./components/Layout";
import { AgendaTimeline } from "./pages/AgendaTimeline";
import { AgendaLista } from "./pages/AgendaLista";
import { Clientes } from "./pages/Clientes";
import { ClienteFormulario } from "./pages/ClienteFormulario";
import { Profissionais } from "./pages/Profissionais";
import { ProfissionalFormulario } from "./pages/ProfissionalFormulario";
import { Servicos } from "./pages/Servicos";
import { ServicoFormulario } from "./pages/ServicoFormulario";
import { PlanosClientes } from "./pages/PlanosClientes";
import { Assinatura } from "./pages/Assinatura";
import { Perfil } from "./pages/Perfil";
import { CadastroUsuario } from "./pages/CadastroUsuario";
import { Login } from "./pages/Login";

function ProtectedLayout() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Layout />;
}

function PublicLoginRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/agenda/timeline" replace />;
  }

  return <Login />;
}

function PublicSignupRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/agenda/timeline" replace />;
  }

  return <CadastroUsuario />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: PublicLoginRoute,
  },
  {
    path: "/cadastro",
    Component: PublicSignupRoute,
  },
  {
    path: "/",
    Component: ProtectedLayout,
    children: [
      { index: true, Component: AgendaTimeline },
      { path: "agenda/timeline", Component: AgendaTimeline },
      { path: "agenda/lista", Component: AgendaLista },
      { path: "clientes", Component: Clientes },
      { path: "clientes/novo", Component: ClienteFormulario },
      { path: "clientes/:clientId/editar", Component: ClienteFormulario },
      { path: "profissionais", Component: Profissionais },
      { path: "profissionais/novo", Component: ProfissionalFormulario },
      { path: "profissionais/:professionalId/editar", Component: ProfissionalFormulario },
      { path: "servicos", Component: Servicos },
      { path: "servicos/novo", Component: ServicoFormulario },
      { path: "servicos/:serviceId/editar", Component: ServicoFormulario },
      { path: "planos-clientes", Component: PlanosClientes },
      { path: "assinatura", Component: Assinatura },
      { path: "perfil", Component: Perfil },
    ],
  },
]);
