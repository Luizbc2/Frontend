import { CircleAlert, Clock3, Mail, PencilLine, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { formatPhone } from "../../data/clients";
import { getActiveWorkDaysCount, type Professional } from "../../data/professionals";
import { Button } from "../ui/button";

type ProfessionalListCardProps = {
  professional: Professional;
  onDelete: (professionalId: number) => void;
};

export function ProfessionalListCard({
  professional,
  onDelete,
}: ProfessionalListCardProps) {
  const activeWorkDays = getActiveWorkDaysCount(professional);
  const hasSchedule = activeWorkDays > 0;
  const operationalStatus = hasSchedule ? "Pronto para agenda" : "Aguardando horários";

  return (
    <article className="rounded-[1.8rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,248,242,0.88))] p-6 shadow-[0_28px_60px_-34px_rgba(73,47,22,0.35)]">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-[2rem] font-semibold leading-none text-foreground">{professional.name}</h3>
            <span
              className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
              data-variant={professional.status === "ativo" ? "default" : "warm"}
            >
              {professional.status === "ativo" ? "Ativo" : "Férias"}
            </span>
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                hasSchedule
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-600"
              }`}
            >
              <Clock3 className="mr-1.5 h-3.5 w-3.5" />
              {hasSchedule ? `${activeWorkDays} dia(s) ativos` : "Sem horários"}
            </span>
          </div>

          <p className="mt-4 text-base text-muted-foreground">{professional.specialty}</p>
          <p className="mt-2 text-base text-muted-foreground">Especialidades: {professional.specialty}</p>
        </div>
      </div>

      {!hasSchedule ? (
        <div className="mt-6 rounded-[1.5rem] border border-rose-200 bg-rose-50/80 px-5 py-4 text-rose-600">
          <div className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-base leading-7">
              Este profissional não aparece na disponibilidade pública enquanto não tiver pelo menos um dia e horário
              de trabalho ativo.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 text-base text-muted-foreground md:grid-cols-2">
        <div>
          <p>{professional.phone ? formatPhone(professional.phone) : "Telefone não informado"}</p>
          <p className="mt-4">Dias ativos: {activeWorkDays}</p>
        </div>
        <div>
          <p>Status operacional: {operationalStatus}</p>
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
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-[rgba(74,52,34,0.08)] pt-5">
        <Button variant="outline" className="min-w-[8.5rem] flex-1 md:flex-none" asChild>
          <Link to={`/profissionais/${professional.id}/editar`}>
            <PencilLine className="h-4 w-4" />
            Editar
          </Link>
        </Button>
        <Button variant="outline" className="min-w-[8.5rem] flex-1 md:flex-none" asChild>
          <Link to={`/profissionais/${professional.id}/horarios`}>
            <Clock3 className="h-4 w-4" />
            Horários
          </Link>
        </Button>
        <Button
          variant="outline"
          className="min-w-[8.5rem] flex-1 text-destructive hover:text-destructive md:flex-none"
          onClick={() => onDelete(professional.id)}
        >
          <Trash2 className="h-4 w-4" />
          Remover
        </Button>
      </div>
    </article>
  );
}
