import { NextRouter, useRouter } from "next/dist/client/router";
import { FC, useMemo } from "react";
import styled from "styled-components";

import { Select } from "src/components/Filters/Select";
import { Pagination } from "src/components/Pagination";
import Releases from "src/components/Releases";
import { useArtistById } from "src/hooks/artists";
import { useReleases } from "src/hooks/releases";
import { getPrimaryArtistImage } from 'src/libs/artists';
import { replacePath } from "src/libs/paths";

const StyledArtist = styled.div`
    .jumbotron {
        text-align: center;
    }
    
    .releases {
        min-height: 500px;
        text-align: center;
    }
`

// My one bugbear with React Query and Typescript....
const artistFallback = { name: '', realname: '', images: []}
const artistImageFallback = { uri: '' }

export const ArtistPage: FC = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const page = parseInt(router.query.page as string || '1');
    const sort = router.query.sort as string;
    const sortOrder = router.query.sortOrder as string;

    const handleReplacePath = replacePath(router);

    const { data: releasesData, isLoading: releasesIsLoading, error: releasesError } = useReleases({ id, pageNumber: page, sort, sortOrder });
    const { data: artistData, isLoading: artistIsLoading, error: artistError } = useArtistById({ id });
    
    const { name, images, realname } = artistData || artistFallback;
    const { uri } = useMemo(() => getPrimaryArtistImage(images) || artistImageFallback, [images])
    
    if (artistIsLoading) return <p>Loading...</p>;
    if (artistError) return <p>There was an error: {artistError.message}</p>;

    return (
        <StyledArtist>
            <div className="jumbotron">
                <h1>{name}</h1>
                <img src={uri} />
                <h4>{realname}</h4>
            </div>
            <div className="releases">
                <h2>Releases</h2>
                <Pagination page={page} pages={releasesData?.pagination?.pages} />
                <div className="filters">
                    <Select value={sort} onChange={handleReplacePath('sort')}>
                        <option value='year'>Year</option>
                        <option value='title'>Title</option>
                        <option value='format'>Format</option>
                    </Select>
                    <Select value={sortOrder} onChange={handleReplacePath('sortOrder')}>
                        <option value='desc'>Descending</option>
                        <option value='asc'>Ascending</option>
                    </Select>
                </div>
                <Releases releases={releasesData?.releases} isLoading={releasesIsLoading} error={releasesError} />
            </div>
        </StyledArtist>
    );
}

export default ArtistPage;