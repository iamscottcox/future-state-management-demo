import { useRouter } from "next/dist/client/router";
import { Pagination } from "src/components/Pagination";
import { useReleases } from "src/hooks/releases";

export const ArtistPage = () => {
    const router = useRouter();
    const id = router.query.id as string;
    const page = parseInt(router.query.page as string || '1');
    const { data, isLoading, error } = useReleases({ id });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>There was an error: {error.message}</p>;

    console.log('data', data)

    return (
        <div>
            <Pagination page={page} pages={data?.pagination?.pages} />
            Artist Page
        </div>
    );
}

export default ArtistPage;