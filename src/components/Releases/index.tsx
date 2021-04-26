import { FC } from "react";
import { UseQueryResult } from "react-query";
import styled from "styled-components";

const StyledReleases = styled.div`
    display: flex;
    flex-flow: column wrap;
`

const StyledRelease = styled.div`
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    img {
        width: 150px;
        margin-right: 1rem;
    }
`

interface OwnProps {
    isLoading?: UseQueryResult['isLoading'];
    error: Error | null;
    releases?: API.Release[];
}

type Props = OwnProps;

export const Releases: FC<Props> = ({ error, releases = [], isLoading = false }) => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <StyledReleases>
            {isLoading ? (
                    <p>Loading....</p>
                ) : (
                    releases.map((release) => {
                        const { id, title, thumb, year, main_release: mainRelease } = release;
                        return (
                            <StyledRelease key={`${mainRelease}-${id}`}>
                            <img
                                className="artists-list-item-image"
                                src={
                                    thumb.includes("spacer.gif")
                                    ? "https://via.placeholder.com/150"
                                    : thumb
                                }
                                alt={title}
                            />
                            <h3>{title} ({year})</h3>
                </StyledRelease>
                        )
                    })
                )}
        </StyledReleases>
    )
}

export default Releases;