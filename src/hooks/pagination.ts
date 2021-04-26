export const usePagination = (page: number = 1, maxPages: number = 1, step = 5) => {
  const prevPage = page - 1
  const nextPage = page + 1
  const prevPageEnabled = prevPage > 0
  const nextPageEnabled = nextPage <= maxPages;
  const prev = page - step < 0 ? 0 : page - step;
  const next = page + step > maxPages ? maxPages : page + step;
  const isLess = page - step > 0;
  const isMore = next + step < maxPages;

  return { next, prev, prevPage, nextPage, prevPageEnabled, nextPageEnabled, isMore, isLess };
}

export default usePagination;