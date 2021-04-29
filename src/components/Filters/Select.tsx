import { ChangeEvent, FC } from 'react';

export interface Option {
  value: string;
  text?: string;
}

interface OwnProps {
  value?: string;
  onChange: (value: string) => void;
}

type Props = OwnProps;

export const Select: FC<Props> = ({ value, onChange, children }) => {
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleOnChange}>
      {children}
    </select>
  );
};
