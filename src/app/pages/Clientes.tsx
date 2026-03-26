import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Mail, MessageCircle, PencilLine, Phone, Plus, Search, Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import { CrudPagination } from "../components/CrudPagination";
import { EmptyStatePanel, MetricCard, PageShell, SectionCard } from "../components/PageShell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { deleteClient, formatPhone, loadClients, type Client } from "../data/clients";
import { paginateItems } from "../data/pagination";

const ITEMS_PER_PAGE = 6;

type LocationState = {
  notice?: string;
};

export function Clientes() {
  const location = useLocation();
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setClients(loadClients());
  }, []);

  useEffect(() => {
    if (typeof location.state === "object" && location.state !== null && "notice" in location.state) {
      const state = location.state as LocationState;

      if (state.notice) {
        toast.success(state.notice);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredClients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return clients.filter((client) => {
      if (!normalizedSearch) {
        return true;
      }

      return [client.name, client.email, client.phone, client.notes]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [clients, searchTerm]);

  const { safePage, totalPages, paginatedItems } = paginateItems(
    filteredClients,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const unreadCount = clients.filter((client) => client.unread).length;

  const handleDelete = (clientId: number) => {
    deleteClient(clientId);
    const nextClients = loadClients();

    setClients(nextClients);
    toast.success("Cliente removido com sucesso.");
  };

  return (
    <>
      <PageShell
        eyebrow="Gestão"
        title="Clientes"
        description="Lista paginada dos clientes cadastrados. Para criar ou editar, use as telas separadas do formulário."
        actions={
          <Button asChild>
            <Link to="/clientes/novo">
              <Plus className="h-4 w-4" />
              Novo cliente
            </Link>
          </Button>
        }
      >
        <div className="metric-grid">
          <MetricCard
            label="Total"
            value={String(clients.length)}
            helper="Clientes cadastrados no armazenamento local."
            icon={<MessageCircle className="h-5 w-5" />}
          />
          <MetricCard
            label="Com e-mail"
            value={String(clients.filter((client) => client.email).length)}
            helper="Registros com contato por e-mail preenchido."
            icon={<Mail className="h-5 w-5" />}
            accent="sand"
          />
          <MetricCard
            label="Não lidas"
            value={String(unreadCount)}
            helper="Marcadores locais de retorno pendente."
            icon={<Phone className="h-5 w-5" />}
            accent="coral"
          />
        </div>

        <SectionCard
          title="Listagem"
          description="Use a busca para localizar um cliente e abra o formulário próprio para criar ou editar."
          action={
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome, e-mail ou telefone"
                className="pl-11"
              />
            </div>
          }
        >
          {filteredClients.length === 0 ? (
            <EmptyStatePanel
              icon={<MessageCircle className="h-7 w-7" />}
              title={clients.length === 0 ? "Nenhum cliente cadastrado" : "Nenhum cliente encontrado"}
              description={
                clients.length === 0
                  ? "Cadastre o primeiro cliente para começar o CRUD dessa área."
                  : "Nenhum registro bate com a busca atual."
              }
              action={
                <Button asChild>
                  <Link to="/clientes/novo">
                    <Plus className="h-4 w-4" />
                    Novo cliente
                  </Link>
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-3">
                {paginatedItems.map((client) => (
                  <article
                    key={client.id}
                    className="flex flex-col gap-4 rounded-[1.4rem] border border-white/70 bg-white/60 p-4 shadow-[0_18px_45px_-30px_rgba(73,47,22,0.32)] md:flex-row md:items-start"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-primary text-lg font-semibold text-primary-foreground">
                      {client.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{client.name}</h3>
                        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                          {new Intl.DateTimeFormat("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(client.createdAt))}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-muted-foreground">{client.notes}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="data-pill text-xs">
                          <Mail className="h-3.5 w-3.5" />
                          {client.email}
                        </span>
                        <span className="data-pill text-xs">
                          <Phone className="h-3.5 w-3.5" />
                          {formatPhone(client.phone)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 md:w-auto md:flex-col">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/clientes/${client.id}/editar`}>
                          <PencilLine className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <CrudPagination
                currentPage={safePage}
                totalPages={totalPages}
                totalItems={filteredClients.length}
                visibleItems={paginatedItems.length}
                onPrevious={() => setCurrentPage(Math.max(1, safePage - 1))}
                onNext={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
              />
            </>
          )}
        </SectionCard>
      </PageShell>

      <Toaster position="bottom-left" closeButton richColors />
    </>
  );
}
