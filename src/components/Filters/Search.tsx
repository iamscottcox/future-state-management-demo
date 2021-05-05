import {
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { HighlightOff } from '@material-ui/icons';
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

  const handleClear = () => {
    setValue('');
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <form onSubmit={handleOnSubmit}>
      <InputLabel id="search-field-label" htmlFor="search-field">
        Search
      </InputLabel>
      <Input
        id="search-field"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        endAdornment={
          value !== '' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search field"
                onClick={handleClear}
                onMouseDown={handleClear}
              >
                <HighlightOff />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </form>
  );
};

export default Search;
