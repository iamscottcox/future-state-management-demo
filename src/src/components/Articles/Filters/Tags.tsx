import { ChangeEvent, FC } from 'react';
import { useQuery } from "react-query";

import { fetchTags, Tag } from 'src/api/tags';

interface OwnProps {
    selectedTag: Tag['id'];
    onChange: (value: string) => void;
}

type Props = OwnProps;

export const TagSelect: FC<Props> = ({ selectedTag = '', onChange }) => {
    const { data: tags } = useQuery<Tag[]>('tags', fetchTags);

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    }

    return (
        <select onChange={handleOnChange} value={selectedTag}>
            {tags?.map(({ name, id }) => (
                <option key={id} value={id}>{name}</option>
            ))}
        </select>
    );
}

export default TagSelect;