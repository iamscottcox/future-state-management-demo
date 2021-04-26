import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { usePagination } from 'src/hooks/pagination';
import { range } from 'src/libs/numbers';

interface OwnProps {
    page?: number,
    pages?: number,
}

type Props = OwnProps;

const StyledPagination = styled.div`
    display: flex;
    justify-content: center;

    > * {
        margin: 1rem 0.5rem 1rem 0;
    }
`

export const Pagination: FC<Props> = ({ page = 1, pages = 1 }) => {
    const router = useRouter();
    const { asPath } = router;
    const { next, prev, prevPage, prevPageEnabled, nextPage, nextPageEnabled, isLess, isMore } = usePagination(page, pages);

    const basePath = asPath.split('?')[0];
    const pagesArray = range(1, pages).slice(prev, next);

    return (
        <StyledPagination>
            {prevPageEnabled && <Link scroll={false} href={`${basePath}?page=${prevPage}`}><a>⬅️</a></Link>}
            {isLess && <p><Link key={1} scroll={false} href={`${basePath}?page=1`}><a>1 ...</a></Link></p>}
            {pagesArray.map((number) => {
                if (number === page) return <p key={number}>{page}</p>
                return <Link key={number} scroll={false} href={`${basePath}?page=${number}`}><a>{number}</a></Link>
            })}
            {isMore && <p><Link key={1} scroll={false} href={`${basePath}?page=${pages}`}><a>... {pages}</a></Link></p>}
            {nextPageEnabled && <Link scroll={false} href={`${basePath}?page=${nextPage}`}><a>➡️</a></Link>}
        </StyledPagination>
    )
}