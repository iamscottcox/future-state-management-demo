import Link from 'next/link';
import { FC, useMemo } from 'react';
import styled from 'styled-components';

import { usePagination } from 'src/hooks/pagination';
import { range } from 'src/libs/numbers';
import { createNewPath } from 'src/libs/paths';

interface OwnProps {
  page?: number;
  pages?: number;
}

type Props = OwnProps;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;

  > * {
    margin: 1rem 0.5rem 1rem 0;
  }
`;

export const Pagination: FC<Props> = ({ page = 1, pages = 1 }) => {
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

  const pagesArray = useMemo(() => range(1, pages).slice(prev, next), [
    pages,
    prev,
    next,
  ]);

  return (
    <StyledPagination>
      {prevPageEnabled && (
        <Link
          scroll={false}
          href={createNewPath({ key: 'page', value: prevPage })}
        >
          <a>⬅️</a>
        </Link>
      )}
      {isLess && (
        <p>
          <Link
            key={1}
            scroll={false}
            href={createNewPath({ key: 'page', value: 1 })}
          >
            <a>1 ...</a>
          </Link>
        </p>
      )}
      {pagesArray.map((number) => {
        if (number === page) return <p key={number}>{page}</p>;
        return (
          <Link
            key={number}
            scroll={false}
            href={createNewPath({ key: 'page', value: number })}
          >
            <a>{number}</a>
          </Link>
        );
      })}
      {isMore && (
        <p>
          <Link
            key={1}
            scroll={false}
            href={createNewPath({ key: 'page', value: pages })}
          >
            <a>... {pages}</a>
          </Link>
        </p>
      )}
      {nextPageEnabled && (
        <Link
          scroll={false}
          href={createNewPath({ key: 'page', value: nextPage })}
        >
          <a>➡️</a>
        </Link>
      )}
    </StyledPagination>
  );
};
