import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AgendaTimeline } from "./pages/AgendaTimeline";
import { AgendaLista } from "./pages/AgendaLista";
import { Clientes } from "./pages/Clientes";
import { Profissionais } from "./pages/Profissionais";
import { Servicos } from "./pages/Servicos";
import { PlanosClientes } from "./pages/PlanosClientes";
import { Assinatura } from "./pages/Assinatura";
import { Perfil } from "./pages/Perfil";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: AgendaTimeline },
      { path: "agenda/timeline", Component: AgendaTimeline },
      { path: "agenda/lista", Component: AgendaLista },
      { path: "clientes", Component: Clientes },
      { path: "profissionais", Component: Profissionais },
      { path: "servicos", Component: Servicos },
      { path: "planos-clientes", Component: PlanosClientes },
      { path: "assinatura", Component: Assinatura },
      { path: "perfil", Component: Perfil },
    ],
  },
]);
