export const usePagination = (page: number = 1, maxPages: number = 1) => {
  const prevPage = page - 1
  const nextPage = page + 1
  const prevPageEnabled = prevPage > 0
  const nextPageEnabled = nextPage <= maxPages;

  return { prevPage, nextPage, prevPageEnabled, nextPageEnabled };
}

export default usePagination;