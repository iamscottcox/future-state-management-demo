import Link from "next/link";
import { FC } from "react";
import { usePagination } from 'src/hooks/pagination';
import styled from "styled-components";

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
    const { prevPage, prevPageEnabled, nextPage, nextPageEnabled } = usePagination(page, pages);

    return (
        <StyledPagination>
            {prevPageEnabled && <Link href={`/artists?page=${prevPage}`}><a>{prevPage}</a></Link>}
            <p>{page}</p>
            {nextPageEnabled && <Link href={`/artists?page=${nextPage}`}><a>{nextPage}</a></Link>}
        </StyledPagination>
    )
}