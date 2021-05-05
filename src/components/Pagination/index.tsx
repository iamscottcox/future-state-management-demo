import { FC, useEffect, useMemo, useState } from 'react';
import BootstrapPagination from 'react-bootstrap/Pagination';

import { usePagination } from 'src/hooks/pagination';
import { range } from 'src/libs/numbers';
import { createNewPath, replacePath } from 'src/libs/paths';
import { useRouter } from 'next/dist/client/router';

interface OwnProps {
  page?: number;
  pages?: number;
}

type Props = OwnProps;

export const Pagination: FC<Props> = ({
  page: initialPage = 1,
  pages: initialPages = 1,
}) => {
  const [page, setPage] = useState(initialPage);
  const [pages, setPages] = useState(initialPages);

  const router = useRouter();
  const {
    next,
    prev,
    prevPage,
    prevPageEnabled,
    nextPage,
    nextPageEnabled,
    isLess,
    isMore,
  } = usePagination(page, pages);

  useEffect(() => {
    if (initialPage > initialPages) {
      return;
    }

    if (initialPage) {
      setPage(initialPage);
    }

    if (initialPages) {
      setPages(initialPages);
    }
  }, [initialPage, initialPages]);

  const pagesArray = useMemo(() => range(1, pages).slice(prev, next), [
    pages,
    prev,
    next,
  ]);

  const handleReplacePath = replacePath(router);

  return (
    <BootstrapPagination>
      <BootstrapPagination.First
        disabled={page === 1}
        onClick={() => handleReplacePath({ key: 'page', value: 1 })}
      />
      <BootstrapPagination.Prev
        disabled={!prevPageEnabled}
        onClick={() => handleReplacePath({ key: 'page', value: prevPage })}
      />
      {isLess && <BootstrapPagination.Ellipsis disabled />}
      {pagesArray.map((number) => {
        return (
          <BootstrapPagination.Item
            key={number}
            disabled={page === number}
            onClick={() => handleReplacePath({ key: 'page', value: number })}
          >
            {number}
          </BootstrapPagination.Item>
        );
      })}
      {isMore && <BootstrapPagination.Ellipsis disabled />}
      <BootstrapPagination.Next
        disabled={!nextPageEnabled}
        onClick={() => {
          handleReplacePath({ key: 'page', value: nextPage });
        }}
      />
      <BootstrapPagination.Last
        disabled={page === pages}
        onClick={() => {
          handleReplacePath({ key: 'page', value: pages });
        }}
      />
    </BootstrapPagination>
  );
};

export default Pagination;
