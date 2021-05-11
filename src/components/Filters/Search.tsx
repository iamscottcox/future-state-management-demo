import { InputGroup } from '@blueprintjs/core';
import { FC, FormEvent, useState } from 'react';

interface OwnProps {
  initialValue?: string;
  onSubmit: (FormEventHandler: string) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onSubmit, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    onSubmit(value);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <InputGroup
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        leftIcon="search"
      />
    </form>
  );
};

export default Search;
