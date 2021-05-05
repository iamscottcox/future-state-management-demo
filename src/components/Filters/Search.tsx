import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
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
    <Form onSubmit={handleOnSubmit}>
      <Form.Group>
        <Form.Label htmlFor="search-input">Search</Form.Label>
        <Form.Control
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;
