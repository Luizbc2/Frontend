import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Clock3, Mail, PencilLine, Phone, Plus, Scissors, Search, Sparkles, Trash2 } from "lucide-react";
import { Toaster, toast } from "sonner";

import { CrudPagination } from "../components/CrudPagination";
import { EmptyStatePanel, MetricCard, PageShell, SectionCard } from "../components/PageShell";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { formatPhone } from "../data/clients";
import { paginateItems } from "../data/pagination";
import { deleteProfessional, loadProfessionals, type Professional } from "../data/professionals";

const ITEMS_PER_PAGE = 6;

type LocationState = {
  notice?: string;
};

export function Profissionais() {
  const location = useLocation();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProfessionals(loadProfessionals());
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

  const filteredProfessionals = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return professionals.filter((professional) => {
      if (!normalizedSearch) {
        return true;
      }

      return [professional.name, professional.specialty, professional.email, professional.status]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [professionals, searchTerm]);

  const { safePage, totalPages, paginatedItems } = paginateItems(
    filteredProfessionals,
    currentPage,
    ITEMS_PER_PAGE,
  );

  const activeCount = professionals.filter((professional) => professional.status === "ativo").length;

  const handleDelete = (professionalId: number) => {
    deleteProfessional(professionalId);
    setProfessionals(loadProfessionals());
    toast.success("Profissional removido com sucesso.");
  };

  return (
    <>
      <PageShell
        eyebrow="Equipe"
        title="Profissionais"
        description="Listagem paginada da equipe com criação, edição e exclusão em tela própria."
        actions={
          <Button asChild>
            <Link to="/profissionais/novo">
              <Plus className="h-4 w-4" />
              Novo profissional
            </Link>
          </Button>
        }
      >
        <div className="metric-grid">
          <MetricCard
            label="Total"
            value={String(professionals.length)}
            helper="Profissionais cadastrados."
            icon={<Scissors className="h-5 w-5" />}
          />
          <MetricCard
            label="Ativos"
            value={String(activeCount)}
            helper="Disponíveis para atendimento."
            icon={<Sparkles className="h-5 w-5" />}
            accent="sand"
          />
          <MetricCard
            label="Turno médio"
            value="9h"
            helper="Jornada média cadastrada por profissional."
            icon={<Clock3 className="h-5 w-5" />}
            accent="coral"
          />
        </div>

        <SectionCard
          title="Equipe"
          description="Abra o formulário próprio para criar ou editar os dados do profissional."
          action={
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nome, especialidade ou status"
                className="pl-11"
              />
            </div>
          }
        >
          {filteredProfessionals.length === 0 ? (
            <EmptyStatePanel
              icon={<Scissors className="h-7 w-7" />}
              title={professionals.length === 0 ? "Nenhum profissional cadastrado" : "Nenhum profissional encontrado"}
              description={
                professionals.length === 0
                  ? "Cadastre o primeiro profissional para fechar o CRUD da equipe."
                  : "Nenhum registro bate com a busca atual."
              }
              action={
                <Button asChild>
                  <Link to="/profissionais/novo">
                    <Plus className="h-4 w-4" />
                    Novo profissional
                  </Link>
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {paginatedItems.map((professional) => (
                  <article
                    key={professional.id}
                    className="rounded-[1.4rem] border border-white/70 bg-white/64 p-5 shadow-[0_20px_45px_-30px_rgba(73,47,22,0.32)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl text-foreground">{professional.name}</h3>
                      <span className="soft-badge" data-variant={professional.status === "ativo" ? "default" : "warm"}>
                        {professional.status === "ativo" ? "Ativo" : "Férias"}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <p>Especialidade: {professional.specialty}</p>
                      <p>
                        Turno: {professional.shiftStart} às {professional.shiftEnd}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="data-pill text-xs">
                        <Mail className="h-3.5 w-3.5" />
                        {professional.email}
                      </span>
                      <span className="data-pill text-xs">
                        <Phone className="h-3.5 w-3.5" />
                        {formatPhone(professional.phone)}
                      </span>
                    </div>

                    <div className="mt-6 flex gap-2 border-t border-[rgba(74,52,34,0.08)] pt-4">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link to={`/profissionais/${professional.id}/editar`}>
                          <PencilLine className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(professional.id)}
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
                totalItems={filteredProfessionals.length}
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
