import { FC, useEffect, useMemo, useState } from 'react';
import BootstrapPagination from 'react-bootstrap/Pagination';

import { usePagination } from 'src/hooks/pagination';
import { range } from 'src/libs/numbers';
import { createNewPath, replacePath } from 'src/libs/paths';
import { useRouter } from 'next/dist/client/router';
import { Button, ButtonGroup } from '@blueprintjs/core';
import styled from 'styled-components';

interface OwnProps {
  page?: number;
  pages?: number;
}

type Props = OwnProps;

const StyledButtonGroup = styled(ButtonGroup)`
  display: block;
`;

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
    <StyledButtonGroup>
      <Button
        icon="fast-backward"
        disabled={page === 1}
        onClick={() => handleReplacePath({ key: 'page', value: 1 })}
      />
      <Button
        icon="caret-left"
        disabled={!prevPageEnabled}
        onClick={() => handleReplacePath({ key: 'page', value: prevPage })}
      />
      {isLess && <Button disabled>...</Button>}
      {pagesArray.map((number) => {
        return (
          <Button
            key={number}
            disabled={page === number}
            onClick={() => handleReplacePath({ key: 'page', value: number })}
          >
            {number}
          </Button>
        );
      })}
      {isMore && <Button disabled>...</Button>}
      <Button
        icon="caret-right"
        disabled={!nextPageEnabled}
        onClick={() => {
          handleReplacePath({ key: 'page', value: nextPage });
        }}
      />
      <Button
        icon="fast-forward"
        disabled={page === pages}
        onClick={() => {
          handleReplacePath({ key: 'page', value: pages });
        }}
      />
    </StyledButtonGroup>
  );
};

export default Pagination;
