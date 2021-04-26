import { useRouter } from "next/dist/client/router";
import { useMemo } from "react";
import styled from "styled-components";

import { Pagination } from "src/components/Pagination";
import Releases from "src/components/Releases";
import { useArtistById } from "src/hooks/artists";
import { useReleases } from "src/hooks/releases";

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

const getPrimaryArtistImage = (state: API.ArtistImage[]) => state.find((image) => image.type === 'primary');

export const ArtistPage = () => {
    const router = useRouter();
    const id = router.query.id as string || '';
    const page = parseInt(router.query.page as string || '1');
    const { data: releasesData, isLoading: releasesIsLoading, error: releasesError } = useReleases({ id, pageNumber: page });
    const { data: artistData, isLoading: artistIsLoading, error: artistError } = useArtistById({ id });
    
    const {name, images, realname } = artistData || artistFallback;

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
                <Releases releases={releasesData?.releases} isLoading={releasesIsLoading} error={releasesError} />
            </div>
        </StyledArtist>
    );
}

export default ArtistPage;