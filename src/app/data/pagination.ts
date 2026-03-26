export function paginateItems<T>(items: T[], currentPage: number, itemsPerPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;

  return {
    totalPages,
    safePage,
    paginatedItems: items.slice(startIndex, startIndex + itemsPerPage),
  };
}
