import { Form, FormProps, InputOnChangeData } from 'semantic-ui-react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';

interface OwnProps {
  initialValue?: string;
  loading?: boolean;
  onSubmit: (value: string) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onSubmit, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('submit 1');
    e.preventDefault();
    e.stopPropagation();
    onSubmit(value);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    { value }: InputOnChangeData
  ) => {
    setValue(value || '');
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Input value={value} icon="search" onChange={handleOnChange} />
    </Form>
  );
};

export default Search;
