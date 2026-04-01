import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { Clock3, Plus, Scissors, Search, Sparkles } from "lucide-react";
import { Toaster, toast } from "sonner";

import { CrudPagination } from "../components/CrudPagination";
import { EmptyStatePanel, MetricCard, PageShell, SectionCard } from "../components/PageShell";
import { ProfessionalListCard } from "../components/professionals/ProfessionalListCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { paginateItems } from "../data/pagination";
import {
  deleteProfessional,
  getActiveWorkDaysCount,
  loadProfessionals,
  type Professional,
} from "../data/professionals";

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
  const configuredScheduleCount = professionals.filter(
    (professional) => getActiveWorkDaysCount(professional) > 0,
  ).length;

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
        description="Cadastre sua equipe, ajuste os dados principais e depois organize a jornada de cada profissional."
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
            label="Com horários"
            value={String(configuredScheduleCount)}
            helper="Profissionais com rotina de trabalho definida."
            icon={<Clock3 className="h-5 w-5" />}
            accent="coral"
          />
        </div>

        <SectionCard
          title="Equipe"
          description="Os dados principais ficam aqui. Os horários de trabalho podem ser ajustados depois, profissional por profissional."
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
                  ? "Cadastre o primeiro profissional para começar a montar sua equipe."
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
                  <ProfessionalListCard
                    key={professional.id}
                    professional={professional}
                    onDelete={handleDelete}
                  />
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
