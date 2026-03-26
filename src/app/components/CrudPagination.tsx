import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./ui/button";

type CrudPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  visibleItems: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function CrudPagination({
  currentPage,
  totalPages,
  totalItems,
  visibleItems,
  onPrevious,
  onNext,
}: CrudPaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(74,52,34,0.08)] pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Mostrando {visibleItems} de {totalItems} registros.
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrevious} disabled={currentPage === 1}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="data-pill text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <Button variant="outline" size="icon" onClick={onNext} disabled={currentPage === totalPages}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
