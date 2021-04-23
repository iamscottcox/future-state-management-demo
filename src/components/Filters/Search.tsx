import { FC, FormEvent, useState } from "react";

interface OwnProps {
    initialValue?: string,
    onSubmit: (value: string) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onSubmit, initialValue = '' }) => {
    const [search, setSearch] = useState<string>(initialValue);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(search);
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <input type="text" placeholder="Search..." name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;