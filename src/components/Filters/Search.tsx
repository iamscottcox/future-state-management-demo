import { ChangeEvent, FC, FormEvent } from 'react';

interface OwnProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onChange, value }) => {
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Search..."
        name="search"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
