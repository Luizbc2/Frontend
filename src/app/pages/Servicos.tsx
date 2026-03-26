import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Clock3, Edit, Plus, Search, Sparkles, Ticket, Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import { CrudPagination } from "../components/CrudPagination";
import { EmptyStatePanel, MetricCard, PageShell, SectionCard } from "../components/PageShell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { deleteService, formatCurrency, loadServices, type Service } from "../data/services";
import { paginateItems } from "../data/pagination";

const ITEMS_PER_PAGE = 6;

type LocationState = {
  notice?: string;
};

export function Servicos() {
  const location = useLocation();
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setServices(loadServices());
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

  const filteredServices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return services.filter((service) => {
      if (!normalizedSearch) {
        return true;
      }

      return [service.name, service.category, service.description]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [services, searchTerm]);

  const { safePage, totalPages, paginatedItems } = paginateItems(
    filteredServices,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const averageTicket =
    services.length > 0
      ? services.reduce((total, service) => total + service.price, 0) / services.length
      : 0;

  const handleDelete = (serviceId: number) => {
    deleteService(serviceId);
    setServices(loadServices());
    toast.success("Serviço removido com sucesso.");
  };

  return (
    <>
      <PageShell
        eyebrow="Gestão"
        title="Serviços"
        description="Catálogo paginado com criação, edição e exclusão em telas separadas."
        actions={
          <Button asChild>
            <Link to="/servicos/novo">
              <Plus className="h-4 w-4" />
              Novo serviço
            </Link>
          </Button>
        }
      >
        <div className="metric-grid">
          <MetricCard
            label="Ativos"
            value={String(services.length)}
            helper="Serviços disponíveis no catálogo."
            icon={<Sparkles className="h-5 w-5" />}
          />
          <MetricCard
            label="Ticket médio"
            value={formatCurrency(averageTicket)}
            helper="Média simples dos preços cadastrados."
            icon={<Ticket className="h-5 w-5" />}
            accent="sand"
          />
          <MetricCard
            label="Duração média"
            value={`${Math.round(
              services.length > 0
                ? services.reduce((total, service) => total + service.durationMinutes, 0) / services.length
                : 0,
            )} min`}
            helper="Tempo médio dos atendimentos no catálogo."
            icon={<Clock3 className="h-5 w-5" />}
            accent="coral"
          />
        </div>

        <SectionCard
          title="Catálogo"
          description="A listagem fica separada do formulário para atender o fluxo completo do CRUD."
          action={
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome ou categoria"
                className="pl-11"
              />
            </div>
          }
        >
          {filteredServices.length === 0 ? (
            <EmptyStatePanel
              icon={<Plus className="h-7 w-7" />}
              title={services.length === 0 ? "Nenhum serviço cadastrado" : "Nenhum serviço encontrado"}
              description={
                services.length === 0
                  ? "Cadastre o primeiro serviço para montar o catálogo."
                  : "Nenhum serviço bate com a busca atual."
              }
              action={
                <Button asChild>
                  <Link to="/servicos/novo">
                    <Plus className="h-4 w-4" />
                    Novo serviço
                  </Link>
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paginatedItems.map((service) => (
                  <article
                    key={service.id}
                    className="rounded-[1.6rem] border border-white/70 bg-white/64 p-5 shadow-[0_22px_52px_-34px_rgba(73,47,22,0.34)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="soft-badge" data-variant="warm">
                        {service.category}
                      </span>
                      <span className="data-pill text-xs uppercase tracking-[0.18em]">
                        {service.durationMinutes} min
                      </span>
                    </div>

                    <h3 className="mt-5 text-2xl text-foreground">{service.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

                    <div className="mt-5 space-y-3">
                      <div className="data-pill justify-between">
                        <span className="text-muted-foreground">Preço</span>
                        <span className="font-semibold text-foreground">{formatCurrency(service.price)}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-2 border-t border-[rgba(74,52,34,0.08)] pt-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={`/servicos/${service.id}/editar`}>
                          <Edit className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(service.id)}
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
                totalItems={filteredServices.length}
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
