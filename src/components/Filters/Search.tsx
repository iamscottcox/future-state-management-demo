import { Input } from 'antd';
import { FC, useState } from 'react';

interface OwnProps {
  initialValue?: string;
  onSubmit: (value: string) => void;
}

type Props = OwnProps;

export const Search: FC<Props> = ({ onSubmit, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  const handleOnSubmit = (value: string) => {
    onSubmit(value);
  };

  return (
    <Input.Search
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder="input search text"
      onSearch={handleOnSubmit}
      enterButton
    />
  );
};

export default Search;
