import { TextField } from '@material-ui/core';
import { FC, FormEvent, useEffect, useState } from 'react';

interface OwnProps {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onSubmit, initialValue = '' }) => {
  const [value, setValue] = useState('');
  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <form onSubmit={handleOnSubmit}>
      <TextField
        id="search-field"
        label="Search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </form>
  );
};

export default Search;
